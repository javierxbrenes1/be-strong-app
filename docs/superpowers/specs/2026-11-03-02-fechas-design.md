# Spec 2: Fechas de punta a punta

**Fecha:** 2026-11-03 · **Roadmap:** [00](./2026-11-03-00-roadmap-redesign.md) · **Tamaño:** mediano (1 plan, con una compuerta manual antes de producción)

## Intención

Eliminar de raíz el bug de "un día menos", que obligó a escribir parches en el backend, el frontend y el seed. El dueño nunca logró arreglarlo y es su mayor dolor en este código. Al terminar, **cada tipo de dato temporal tendrá una sola representación de punta a punta** y no quedará ningún parche.

## Causa raíz (resumen de `docs/ARQUITECTURA.md` §5)

Columnas `date` de Postgres (`member.birthDate`, `gymClass.classDate`) viajan por GraphQL con un scalar `Date` serializado como **epoch en ms**, que representa un instante. El cliente envía la medianoche **local** (UTC-6). Postgres guarda solo el día y lo devuelve como `00:00Z`, y el navegador lo muestra como el día anterior. Reproducido: se guarda `1990-04-12` y se ve `11/04/1990` (`docs/screenshots/14-miembro-detalle-completo.png`).

Parches existentes que se eliminan:

| Parche | Dónde |
|---|---|
| Columna `member.birthDateAsString` (`'1990-04-12T00:00:00.000Z'`) | `prisma/schema.prisma`, `memberSchema.ts` (3 tipos), `addMember.ts`, `UpdateMember.ts`, `MemberPage.tsx`, `AddMember.tsx`, `getBirthdateMembers.ts` |
| `updateBirthDate()` en el seed (resta un día) | `prisma/seed.js` |
| Horarios guardados como texto UTC (`gymClassTime.isoTime = 'T23:30:00.000Z'`, que en CR son las 5:30 PM) | schema, `addGymClassTime`, `TimePickerDialog.tsx`, `memberUtils.ts` (`parseIsoTimeToDate`, `formatIsoTime`, `sortIsoTimes`, `getGymClassTimeForUI`), `catalogState.ts`, `getMemberAttendanceClasses.ts`, `getMemberAttendanceLogsDetails.ts`, fragments y queries |
| `isoFormatDate(date, withTime)` agrega `T00:00:00.000Z` a mano | `src/client/utils/helpers.ts` |
| `getIsoTime()`, que usa `new Date(str).toISOString()` | `src/server/utils/dateshelper.ts` |
| `getDateAndTimeWithLimit()`, que usa `setHours` en la zona del **servidor** | `dateshelper.ts`, `getMeasures.ts` |

## Modelo objetivo

| Concepto | Ejemplos | Postgres | GraphQL | Cliente |
|---|---|---|---|---|
| **Fecha de calendario** | nacimiento, fecha de clase, rango de filtros | `date` | nuevo scalar **`LocalDate`**: string `"YYYY-MM-DD"` validado | string. Se formatea para mostrar; **nunca** pasa por `new Date(str)`. |
| **Hora del gimnasio** | horario 5:30 PM | nueva columna `gymClassTime.localTime varchar(5)` `"HH:mm"` en 24 h | nuevo scalar **`LocalTime`**: `"HH:mm"` validado | string. Se formatea a `5:30 PM` para mostrar. |
| **Instante** | fecha/hora de una medición, `lastPasswordChangeDate`, `createAt` | sin cambios | se mantiene el scalar `Date` (epoch ms) | `Date`/dayjs, mostrado en la zona del gimnasio |

- **Zona del gimnasio**: constante única `GYM_TIMEZONE = 'America/Costa_Rica'` en `src/common/`. Se usa solo para (a) mostrar instantes y (b) calcular "hoy" o los límites de un día.
- **Un solo módulo de fechas** `src/common/dates.ts`, compartido por servidor y cliente (`src/common` ya se comparte). Usa dayjs con los plugins `utc` y `timezone`. dayjs ya está instalado. Expone, como mínimo:
  - `todayLocalDate(): LocalDate`
  - `addDays(d, n)`
  - `formatLocalDate(d, 'DD/MM/YYYY')`
  - `ageOn(birth: LocalDate, today: LocalDate): number`
  - `formatLocalTime('17:30') → '5:30 PM'`
  - `compareLocalTime`
  - `dayBoundsUtc(from: LocalDate, to: LocalDate) → { gte: Date, lt: Date }` (de las 00:00 CR de `from` a las 00:00 CR de `to + 1`)
  - `formatInstant(date, fmt)` en la zona del gimnasio
  - Tipos de marca `LocalDate` / `LocalTime` (alias de string) para documentar la intención.
- `calculateAge` en `src/common/utils.ts` se reemplaza por `ageOn` en sus 3 usos (`addMeasure`, `updateMeasure`, `MemberInfo`).
- **Decisión del diseñador:** `memberMeasures.date` **se mantiene como instante**. No mostró el bug y cambiarlo amplía demasiado el alcance. Lo que sí cambia es que el filtro `from`/`to` pasa a ser `LocalDate` y el servidor lo convierte con `dayBoundsUtc`.

## Cambios por capa

### Base de datos (una migración Prisma)

1. Agregar `gymClassTime.localTime varchar(5)` y llenarla a partir de `isoTime`: la hora UTC menos 6 h, con vuelta de 24 h. Ejemplos: `'T23:30:00.000Z'` → `'17:30'` y `'T01:00:00.000Z'` → `'19:00'`. Después marcarla `NOT NULL UNIQUE` y **eliminar `isoTime`**.
2. Corregir `member.birthDate` con esta regla: **si `birthDateAsString` no es null, `birthDate := birthDateAsString::date`**. Es la columna que hoy usa el cálculo de cumpleaños y la que el dueño ha validado en la práctica. Si es null, `birthDate` se deja igual.
3. **Eliminar `member.birthDateAsString`.**
4. Actualizar `prisma/seed.js`: quitar `updateBirthDate()` y cambiar los upserts de `gymClassTime` para que usen `localTime: '17:30'` y `'19:00'`. El seed debe seguir siendo idempotente.

### Servidor

- Nuevos scalars `LocalDate` y `LocalTime` en `typeDefs/index.ts` y `resolvers/dateScalar.ts` (o un archivo hermano), con validación por regex y fecha real. Los inválidos responden `BAD_USER_INPUT`.
- `Member.birthDate: LocalDate`, `AddMemberInput.birthDate: LocalDate`, `UpdateMemberInput.birthDate: LocalDate`. Se elimina `birthDateAsString` de los 3 tipos.
- `GymClass.classDate: LocalDate`, `AddClassInput.classDate: LocalDate`, `getGymClasses(gte: LocalDate!, lt: LocalDate)` y los `classDate` de `memberAttendanceSchema`.
- `GymClassTime { id, localTime: LocalTime! }` reemplaza a `isoTime`. Lo mismo `addGymClassTime(localTime: LocalTime!)` y el `isoTime` de `MemberAttendanceLogsDetails`.
- Filtros de medidas: `from`/`to: LocalDate`, y `getMeasures.ts` usa `dayBoundsUtc`.
- `getBirthdateMembers(date: LocalDate)` compara `to_char("birthDate", 'MM-DD')` con el MM-DD de `date`. Si no recibe `date`, usa `todayLocalDate()`.
- Prisma devuelve las columnas `date` como `Date` a las 00:00Z. El scalar `LocalDate` serializa un `Date` con `toISOString().slice(0,10)`, que es correcto porque `date` llega a medianoche UTC. Para escribir, convierte `"YYYY-MM-DD"` a `new Date("YYYY-MM-DDT00:00:00Z")`.
- Se eliminan `getIsoTime` y `getDateAndTimeWithLimit`.

### Cliente (cambio mínimo; la UI se rediseña después en la spec 4)

- Actualizar fragments, queries y mutations a los nuevos campos.
- Reemplazar `isoFormatDate`, `parseIsoTimeToDate`, `formatIsoTime`, `sortIsoTimes`, `getGymClassTimeForUI` y el `formatDate` aplicado a fechas de calendario por funciones de `src/common/dates.ts`.
- Pickers de fecha (MUI `DateField`/`DatePicker` con dayjs): convertir el valor elegido con `dayjs(v).format('YYYY-MM-DD')` y, para mostrar el valor guardado, `dayjs(localDate)`, que dayjs interpreta como fecha local sin desplazamiento. **Nunca** usar `.getTime()` ni `toISOString()` sobre una fecha de calendario.
- Time picker de configuración: `dayjs(v).format('HH:mm')`.
- Clases: el día seleccionado se maneja como `LocalDate`, y "hoy" es `todayLocalDate()`.

### Tests (primera suite del repo)

- Agregar **Vitest** (`npm test`) con tests de `src/common/dates.ts`:
  - `ageOn` en el día del cumpleaños, un día antes y en años bisiestos.
  - `dayBoundsUtc('2026-11-03','2026-11-03')`, que debe dar `2026-11-03T06:00Z` y `2026-11-04T06:00Z`.
  - `formatLocalTime('19:00')`, que debe dar `7:00 PM`.
  - La conversión `isoTime` → `localTime` de la migración (extraer la fórmula a una función pura y testearla también en SQL, con un `SELECT` de verificación en el plan).
- Tests de los scalars: `LocalDate.parseValue('2026-02-30')` debe fallar.

## Despliegue y migración de producción (compuerta manual)

**Decisión del diseñador:** el dueño no indicó cómo respaldar, así que el plan **debe** incluir estos pasos y no debe hacer deploy sin completarlos:

1. **Respaldo** en el host de producción:
   ```bash
   docker exec postgres pg_dump -U <POSTGRES_USER> -d <db> -Fc > be-strong-$(date +%F).dump
   ```
   El nombre de la BD sale del `DATABASE_URL` de `.env.production`. Copiar el archivo fuera del servidor.
2. **Ensayo local**: crear una BD vacía en el Postgres local (`be-strong-db`, puerto 5432) y restaurar ahí el dump con `pg_restore --no-owner`. Luego correr `npx prisma migrate deploy` contra esa copia (`DATABASE_URL=...?schema=app`).
3. **Reporte de diferencias**, generado *antes* de migrar sobre la copia: una lista de miembros donde `birthDate::text <> left(birthDateAsString,10)`, más los `gymClassTime` con su `isoTime` y el `localTime` calculado. El dueño revisa el reporte y **confirma con 3 miembros que conoce** que la fecha resultante es la correcta, y que los horarios resultantes coinciden con los reales (5:30 PM y 7:00 PM).
   - Si el reporte muestra que `birthDateAsString` es la columna incorrecta en muchas filas, **se detiene** y se vuelve a la spec.
4. Levantar la app contra la copia y verificar con Playwright: el detalle de un miembro muestra la fecha correcta, el cumpleaños de hoy aparece en el Inicio, y los horarios de Clases y Configuración se ven bien.
5. Solo entonces se hace el deploy normal (`scripts/start.sh`). La migración corre sola al arrancar el contenedor.
6. **Rollback**: `pg_restore --clean` del dump y redeploy del commit anterior.

## Fuera de alcance

- Rediseño visual de cualquier pantalla (spec 4).
- Convertir `memberMeasures.date` en fecha de calendario.
- Cumpleaños del 29 de febrero en años no bisiestos: queda como se comporta hoy (no aparece).

## Verificación ("terminado")

- `grep -rn "birthDateAsString\|isoTime\|isoFormatDate\|getIsoTime\|getDateAndTimeWithLimit\|parseIsoTimeToDate" src prisma/seed.js` no devuelve nada (las migraciones viejas no cuentan).
- `npm test` pasa. `npm run lint` y `npm run build` pasan.
- En local, con datos de prueba:
  - Crear un miembro con nacimiento `1990-04-12` muestra `12/04/1990` en el detalle y en el formulario de edición.
  - La edad es correcta.
  - Un miembro con cumpleaños hoy aparece en el Inicio.
  - Crear una clase "hoy" desde la UI la muestra en el día correcto en Clases, en Inicio y en el detalle de asistencias.
  - Agregar un horario 6:15 PM en Configuración lo muestra como 6:15 PM y lo ordena bien.
  - El filtro de medidas "Últimos 3 meses" incluye una medida tomada hoy.
- Los resultados del ensayo con la copia de producción (paso 3) se adjuntan al PR.
