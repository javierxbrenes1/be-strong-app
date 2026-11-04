# Detalle de miembro: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescribir `/members/:code` con encabezado, tabs (Resumen, Medidas, Asistencia, Datos), la sheet "Medición" y la corrección de B3 (diferencias al filtrar) y B10 (años desde 1900).

**Architecture:** `features/member-detail/` y `features/measures/`. Las métricas se definen una sola vez (`MEASURE_METRICS`) con su dirección "buena" y el mapeo de clasificación a chip; las reutiliza `/visit` (plan 4.7). En el servidor, el cálculo de diferencias pasa a un CTE sin filtro de fechas.

**Tech Stack:** React 18 + MUI (Iron), Apollo Client + codegen, react-hook-form + zod, chart.js + react-chartjs-2 (ya instalados), Prisma `$queryRaw`, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-03-04-pantallas-design.md` §4.5.

## Global Constraints

- Rama `redesign/04-5-detalle-miembro` desde `master` con el plan 4.4 integrado.
- Commits sin `Co-Authored-By` ni atribución a IA.
- Dirección "buena" de cada métrica (la que usa la app hoy en `measuresDiffsDecorator.tsx`): bajar es bueno en peso, IMC, grasa corporal y calorías; subir es bueno en músculo y % de agua.
- Mapeo de clasificación (strings de `src/common/enums.ts`) a `StatusVariant`, igual que los grupos actuales de `utils/measureColorPicker.ts`:
  - `success`: Excelente, Peso normal, Bien, Mucho.
  - `info`: Bueno, Normal.
  - `warning`: Regular, Falta de peso, Poco.
  - `danger`: Malo, Sobre peso, Necesita mejorar.
  - `neutral`: Indefinido y cualquier otro valor.
- Unidades: peso `kg`, grasa `%`, músculo `%`, agua `%`, calorías `kcal`, IMC sin unidad.
- Tabs sincronizadas con `?tab=resumen|medidas|asistencia|datos` (por defecto `resumen`).
- Medición: la fecha es un **instante** (scalar `Date`, epoch ms), por defecto "ahora", y se muestra con `formatInstant`. Los filtros de rango son `LocalDate` (plan 2).
- Componentes y reglas de datos del plan 3. **Se elimina el switch "Mostrar acciones"**: las acciones de la tabla siempre están visibles.
- Sin colores hex ni emojis.

## Review Focus

- Filtro "Últimos 3 meses" con medidas anteriores al rango: la primera fila del rango muestra su Δ real respecto de la medida previa, no "-". Verificación en Task 1.
- Miembro sin medidas: Resumen muestra un `EmptyState` con "+ Medición", no tarjetas en 0. Verificación en Task 2.
- Miembro sin asistencias: Asistencia muestra solo el año actual con ceros, no desde 1900. Test en Task 5.
- Medición con un valor vacío o negativo: error en el campo y no se envía. Test en Task 4.
- Borrar la única medida: Resumen vuelve al estado vacío sin recargar. Verificación en Task 4.

---

### Task 1: Servidor: diferencias correctas al filtrar (B3)

**Files:**
- Create: `src/server/apollo/resolvers/memberMeasures/measuresWithDiffsSql.ts`
- Modify: `src/server/apollo/resolvers/memberMeasures/getMeasures.ts`
- Modify: `src/server/apollo/resolvers/memberMeasures/getLastMeasure.ts`

**Interfaces:**
- Produces: `measuresWithDiffsCte(): Prisma.Sql` (o un string con placeholders), un CTE `WITH m AS (SELECT …, ROUND(cast(x - COALESCE(lag(x) OVER (PARTITION BY "memberCode" ORDER BY "date"), x) AS numeric), 2) AS "xDiff" … FROM app."memberMeasures" WHERE "memberCode" = $1)` **sin filtro de fechas**. `getMeasures` hace `SELECT * FROM m WHERE date >= $gte AND date < $lt ORDER BY date ASC LIMIT … OFFSET …` (con `dayBoundsUtc`), y `getLastMeasure` hace `SELECT * FROM m ORDER BY date DESC LIMIT 1`. Las columnas resultantes son las mismas que hoy (las del `rawSql` actual de `getMeasures.ts`).

- [ ] **Step 1: Implementar** el CTE compartido y usarlo en ambos resolvers, con parámetros (sin interpolar valores de usuario). El `count` de paginación usa el mismo rango.
- [ ] **Step 2: Verificar con GraphQL.** Para Carlos (6 medidas mensuales, datos de prueba), `getMeasures(input:{memberCode, offset:0, limit:10, filters:{from:<hace 3 meses>, to:<hoy>}})` devuelve la primera fila con `weightDiff` ≠ 0 (por ejemplo `-0.8`). Sin filtros, la primera medida histórica tiene `weightDiff == 0`. `lastMeasure` no cambia respecto de antes.
- [ ] **Step 3: Commit** con `git commit -m "fix(measures): compute diffs before date filtering (B3)"`.

### Task 2: Métricas, encabezado y tab Resumen

**Files:**
- Create: `src/client/features/measures/metrics.ts` y `metrics.test.ts`
- Create: `src/client/features/member-detail/api.ts` (`MemberDetailDocument(code)` con los datos del miembro, `memberMeasures(take: 6, orderBy: {date: desc})` y `lastMeasure` con diffs y resultados; `MemberMeasuresDocument(input)`; `AttendanceByYearDocument(year, memberCode)`; `AttendanceMonthDetailsDocument(year, month, memberCode)`; `FirstAttendanceDocument(memberCode)` = `getMemberAttendanceClasses(memberCode, order:"asc", take:1)`; `AddMeasureDocument`, `UpdateMeasureDocument` y `DeleteMeasureDocument`)
- Create: `src/client/features/member-detail/MemberDetailPage.tsx`
- Create: `src/client/features/member-detail/SummaryTab.tsx`
- Create: `src/client/features/member-detail/ShareLinkButton.tsx`

**Interfaces:**
- Produces (`metrics.ts`):
  - `type MetricKey = 'weight' | 'bodyMassIndex' | 'corporalFat' | 'muscle' | 'corporalWaterPct' | 'calories'`
  - `MEASURE_METRICS: { key: MetricKey; label: string; unit: string; goodWhen: 'down' | 'up'; resultKey?: string; diffKey: string }[]`, en el orden: Peso, IMC, Grasa corporal, Músculo, Agua, Calorías.
  - `resultVariant(result: string | null | undefined): StatusVariant`
  - `isGoodDelta(metric: MetricKey, delta: number): boolean`
- Produces:
  - `<MemberDetailPage />` con un `Breadcrumbs` del design-system (`Miembros` → enlace a `PATHS.MEMBERS` › nombre del miembro) sobre el encabezado (`MemberAvatar` de 56px, nombre como h1, "código · categoría", `StatusChip` según `memberStatus`), las acciones `ShareLinkButton` (copia `${origin}/visit?code=${base64(code)}` con `js-base64` `encode` y muestra el toast "Enlace copiado"), "Editar" (abre `MemberSheet` del plan 4.3 con el miembro) y "+ Medición" (primaria, abre `MeasureSheet`, Task 4), y luego las tabs.
  - `<SummaryTab />`: 6 `MetricCard` (valor, chip con `resultVariant`, delta con `isGoodDelta` y `spark` con las 6 últimas en orden cronológico), y debajo el resumen de asistencia del año actual (total y un mapa de calor de 12 meses con intensidad por conteo).

- [ ] **Step 1: Escribir el test que falla** (`metrics.test.ts`):
```ts
expect(resultVariant('Peso normal')).toBe('success');
expect(resultVariant('Bueno')).toBe('info');
expect(resultVariant('Regular')).toBe('warning');
expect(resultVariant('Sobre peso')).toBe('danger');
expect(resultVariant('Indefinido')).toBe('neutral');
expect(resultVariant(undefined)).toBe('neutral');
expect(isGoodDelta('weight', -0.8)).toBe(true);
expect(isGoodDelta('calories', 15)).toBe(false);
expect(isGoodDelta('muscle', 0.4)).toBe(true);
expect(MEASURE_METRICS.map(m => m.key)).toEqual(['weight','bodyMassIndex','corporalFat','muscle','corporalWaterPct','calories']);
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- metrics`. Expected: FAIL.
- [ ] **Step 3: Implementar** con la ruta temporal `/members-new/:code`.
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright, en Carlos: las 6 tarjetas coinciden con `docs/screenshots/14-miembro-detalle-completo.png` en valores y clasificaciones. Compartir copia el link (leer `navigator.clipboard` o ver el toast). En un miembro sin medidas se ve el `EmptyState` con "+ Medición". Capturas `after/15-miembro-detalle-primer-pliegue.png` y `after/64-movil-miembro-detalle.png`.
- [ ] **Step 5: Commit** con `git commit -m "feat(member-detail): header, metrics config and summary tab"`.

### Task 3: Tab Medidas

**Files:**
- Create: `src/client/features/measures/MeasureChart.tsx`
- Create: `src/client/features/measures/RangeFilter.tsx` y `rangePresets.ts` + `rangePresets.test.ts`
- Create: `src/client/features/member-detail/MeasuresTab.tsx`
- Create: `src/client/features/measures/ReferenceTableDialog.tsx`

**Interfaces:**
- Produces:
  - `rangePresets(today: LocalDate): { id: 'year' | '6m' | '3m'; label: string; from: LocalDate; to: LocalDate }[]`: "Este año" (`YYYY-01-01` hasta hoy), "Últimos 6 meses" y "Últimos 3 meses" (desde el día 1 del mes de hace 5 o 2 meses hasta hoy, igual que la UI actual: el 3/11 da `2026-06-01` y `2026-09-01`).
  - `<RangeFilter value: { from; to }; onChange />`: un botón con el texto del rango ("01/09/2026 – 03/11/2026") que abre un `Popover` con los chips de presets y dos `DatePicker` (Desde/Hasta) con el botón "Aplicar".
  - `<MeasureChart points: { date: number; value: number }[]; kind: 'line' | 'bar'; label: string />`, con colores de `useChartColors()`.
  - `<MeasuresTab code />`: selector de métrica (las mismas `MetricCard` compactas o un `ToggleButtonGroup`), `RangeFilter` (por defecto "Últimos 3 meses"), un toggle Línea/Barras (`aria-label`s), `MeasureChart` y un `DataTable` con las columnas Fecha (`formatInstant`, `'DD/MM/YYYY'`), Valor, Δ (flecha + color con `isGoodDelta`, o "—" si es 0), Indicador (`StatusChip`, si la métrica tiene resultado) y Acciones (Editar y Eliminar, siempre visibles, con `aria-label` "Editar medición del {fecha}" y "Eliminar medición del {fecha}"). Lleva un botón "Tabla de referencia" que abre `ReferenceTableDialog` con la imagen de la métrica (`/images/body-mass-index.jpeg`, `/images/corporal-fat.jpeg` o `/images/muscle.jpeg`; deshabilitado si no hay imagen) y zoom +/−.
  - Eliminar usa `ConfirmDialog` ("¿Eliminar medición?", "Se eliminarán todos los valores del {fecha}.") y luego `refetchQueries` de `MemberDetailDocument` y `MemberMeasuresDocument`.

- [ ] **Step 1: Escribir el test que falla**:
```ts
const p = Object.fromEntries(rangePresets('2026-11-03').map(r => [r.id, [r.from, r.to]]));
expect(p.year).toEqual(['2026-01-01', '2026-11-03']);
expect(p['6m']).toEqual(['2026-06-01', '2026-11-03']);
expect(p['3m']).toEqual(['2026-09-01', '2026-11-03']);
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- rangePresets`. Expected: FAIL.
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright, en Carlos y la tab Medidas:
  1. Con "Últimos 3 meses", la primera fila tiene Δ real (no "—"), lo que confirma B3.
  2. Cambiar a IMC muestra la columna Indicador.
  3. El toggle de barras cambia el gráfico.
  4. Eliminar → confirmar → la fila desaparece.
  5. "Tabla de referencia" abre la imagen de IMC.
  6. Capturas `after/16-miembro-medida-seleccionada-imc.png`, `after/17-miembro-grafico-barras.png`, `after/18-miembro-tabla-medidas-con-acciones.png`, `after/23-miembro-filtro-rango-fechas-medidas.png` y `after/25-miembro-info-tabla-referencia-imc.png`.
- [ ] **Step 5: Commit** con `git commit -m "feat(member-detail): measures tab with chart, range filter and actions"`.

### Task 4: Sheet "Medición"

**Files:**
- Create: `src/client/features/measures/measureSchema.ts` y `measureSchema.test.ts`
- Create: `src/client/features/measures/MeasureSheet.tsx`

**Interfaces:**
- Produces:
  - `measureSchema`: `date` (instante como `number` epoch ms, requerido) y los 6 valores con `zNumber` en estos rangos: peso 20–300, IMC 5–80, grasa 1–80, músculo 1–80, agua 10–90 y calorías 500–6000. (Rangos decididos por el planificador como límites razonables; ajustables.)
  - `<MeasureSheet open; memberCode: string; memberName: string; measure?: Measure; previous?: Measure; onClose />`:
    - Título "Nueva medición" o "Editar medición".
    - Subtítulo: "{nombre} · última: {fecha previa}".
    - Campos: Fecha y hora (`DateTimePicker`, por defecto ahora) y la grilla de 2 columnas con los 6 valores. Cada campo lleva el helper "Anterior: {valor previo}" si existe.
    - Envía `addMeasure` o `updateMeasure` con números (salida del schema) y la fecha en epoch ms.
    - Luego, `refetchQueries` de `MemberDetailDocument` y `MemberMeasuresDocument`, y el toast "Medición guardada".

- [ ] **Step 1: Escribir el test que falla**:
```ts
const base = { date: Date.now(), weight: '78', bodyMassIndex: '24.7', corporalFat: '21', muscle: '36', corporalWaterPct: '53.5', calories: '1875' };
expect(measureSchema.parse(base).weight).toBe(78);
expect(measureSchema.safeParse({ ...base, weight: '' }).error!.issues[0].message).toBe('Requerido');
expect(measureSchema.safeParse({ ...base, weight: '-1' }).success).toBe(false);
expect(measureSchema.parse({ ...base, corporalWaterPct: '53,5' }).corporalWaterPct).toBe(53.5);
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- measureSchema`. Expected: FAIL.
- [ ] **Step 3: Implementar** y conectarla a "+ Medición" (encabezado y EmptyState) y a "Editar" de la tabla.
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright:
  1. Nueva medición en Carlos con peso 77.5 → Resumen muestra 77.5 y Δ ↓0.5 en verde.
  2. Editar esa medición, vaciar peso y escribir 77 → queda `77` (no `077`).
  3. Borrar la única medida de un miembro de prueba → Resumen vuelve al estado vacío.
  4. Capturas `after/20-miembro-dialogo-agregar-medida.png` y `after/21-miembro-dialogo-editar-medida.png`.
- [ ] **Step 5: Commit** con `git commit -m "feat(measures): measurement sheet with previous-value hints"`.

### Task 5: Tab Asistencia (B10) y tab Datos

**Files:**
- Create: `src/client/features/member-detail/attendanceYears.ts` y `attendanceYears.test.ts`
- Create: `src/client/features/member-detail/AttendanceTab.tsx`
- Create: `src/client/features/member-detail/DataTab.tsx`

**Interfaces:**
- Produces:
  - `attendanceYears(firstClassDate: LocalDate | null, today: LocalDate): number[]`: desde el año de la primera clase hasta el actual, en orden descendente; si no hay primera clase, `[año actual]`.
  - `<AttendanceTab code />`: un `Select` de año (`attendanceYears`), el total del año, una grilla de 12 meses (en móvil, 3 columnas; cada mes es un botón con su conteo) y, al hacer clic, una lista de clases del mes (fecha `formatLocalDate`, hora `formatLocalTime`, tipo y duración) en un panel o diálogo.
  - `<DataTab member />`: la información general en solo lectura, con la misma información que `docs/screenshots/14` (nombre, categoría, correo, teléfono, estado, altura, género, nacimiento `formatLocalDate`, edad `ageOn`, horario preferido, días del plan y observaciones), y el botón "Editar" que abre `MemberSheet`.

- [ ] **Step 1: Escribir el test que falla**:
```ts
expect(attendanceYears(null, '2026-11-03')).toEqual([2026]);
expect(attendanceYears('2024-03-10', '2026-11-03')).toEqual([2026, 2025, 2024]);
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- attendanceYears`. Expected: FAIL.
- [ ] **Step 3: Implementar.**
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright, en Carlos: el selector de año solo ofrece 2026. Octubre muestra 3 clases con la hora correcta. La tab Datos muestra el nacimiento correcto y la edad. Capturas `after/26-miembro-asistencias-detalle-mes-octubre.png` y `after/27-miembro-asistencias-selector-anio.png`.
- [ ] **Step 5: Commit** con `git commit -m "feat(member-detail): attendance tab (B10) and data tab"`.

### Task 6: Cambio de ruta y limpieza

**Files:**
- Modify: `src/client/AppRoutes.tsx` (`${PATHS.MEMBERS}/:code` → `MemberDetailPage`; quitar la ruta temporal)
- Delete: `src/client/pages/member/`, `src/client/pages/members/{AddMeasure,EditMeasure}.tsx` (y la carpeta si queda vacía), `src/client/hooks/useUpdateMeasure.ts`, `src/client/components/{BsMeasure,BsChart,BsTable,SimpleTable,BsTablePagination,BsYearPopover,BsMonthCount,BsImageShower,BsDataViewSelector}.tsx`, `src/client/cacheHelpers/updateMembersCacheAfterModifyMember.ts`, `src/client/mutations/Measures.ts` y `src/client/queries/memberPage.ts`, todo **solo lo que `grep` confirme sin usos** (`/visit` todavía usa algunos hasta el plan 4.7: dejar esos).

- [ ] **Step 1: Cambiar la ruta y borrar lo viejo.**
- [ ] **Step 2: Checks.** Run: `npm test && npm run lint && npm run build`. Expected: código 0. Captura `after/14-miembro-detalle-completo.png` (página completa). Sin scroll horizontal en 390, 768 y 1440 en las 4 tabs.
- [ ] **Step 3: Commit y PR** con `git commit -m "feat(member-detail): switch member route to redesigned page"` y el PR `redesign/04-5-detalle-miembro` → `master`.
