# Spec 4: Migración de pantallas al diseño Iron

**Fecha:** 2026-11-03 · **Roadmap:** [00](./2026-11-03-00-roadmap-redesign.md) · **Requiere:** specs 2 y 3 · **Tamaño:** grande (**un plan por pantalla**, en este orden)

## Intención

Reescribir cada pantalla sobre la base de la spec 3: nuevo look & feel, **sheets** para capturar información, funcionamiento en celular, tablet y computadora, y cierre de los bugs pendientes. Al migrar cada pantalla se **borra** su código viejo (`pages/<x>`, los `components/Bs*` que solo usaba ella y los `cacheHelpers` obsoletos). Se reescribe la presentación, no la funcionalidad: **todo lo que la app hace hoy sigue funcionando** (inventario completo en `docs/DISENO.md` §2).

## Reglas comunes a todas las pantallas

- **Patrón de interacción** (`docs/INSPIRACION.md` §2):
  - `AppSheet` para crear o editar cualquier entidad con más de un campo.
  - `ConfirmDialog` solo para confirmaciones destructivas.
  - Popover para filtros.
  - **Nada de edición inline ni `contentEditable`.**
- Cada feature vive en `src/client/features/<feature>/` con `api.ts` (documentos tipados de codegen), sus componentes y sus hooks. Las reglas de datos son las de la spec 3 §6.
- Formularios con react-hook-form + zod. Los mensajes de validación van en español.
- Estados de carga (skeletons) y vacíos (`EmptyState`) en cada lista.
- Toasts de éxito o error tras cada mutación. Los errores de red muestran un mensaje legible, no el error crudo.
- Textos en español con ortografía correcta. **Sin emojis** en la UI administrativa; se permiten solo en `/visit`.
- Tamaños: 390, 768 y 1440px sin scroll horizontal.
- **Terminado por pantalla:** se recorren con Playwright los flujos listados, se guardan capturas en `docs/screenshots/after/` con el mismo número y nombre que su par en `docs/screenshots/`, y `lint`, `build` y `test` pasan.

---

## 4.1 Equipo (`/equipment`), la primera porque es la más simple y valida el patrón
**Hoy:** `docs/screenshots/41`–`49`. **Bug:** B7 (renombrar categoría con `contentEditable` invisible).
- Grid de cards por categoría (1 columna en móvil, 2 en tablet, 3 en computadora). Cada card tiene nombre, total (`metric`) y una lista de equipos (descripción, marca y cantidad). Menú ⋮ con `aria-label` en la categoría y en cada equipo.
- **Sheet "Categoría"** (crear o editar): nombre y lista editable de equipos (agregar o quitar filas con descripción, marca y total). **Renombrar se hace aquí.**
- **Sheet "Equipo"** (crear o editar en una categoría): descripción, marca y total (entero ≥ 0).
- `ConfirmDialog` para eliminar una categoría (avisa que borra sus equipos) o un equipo.
- Estado vacío con la acción "Nueva categoría".

## 4.2 Login, Perfil y Configuración
**Hoy:** `01`, `02`, `50`–`54`, `60`, `67` y `68`. **Bug:** B9 (texto "a la clase" en Configuración).
- **Login:** pantalla centrada con logo, título y formulario. Fondo con la marca (negro y amarillo, o superficie neutra según el modo), **sin la ilustración genérica actual**. El error de credenciales aparece **una sola vez**, encima del botón. El botón está habilitado siempre y la validación explica qué falta.
- **Perfil:** card con nombre, usuario, correo, rol y fecha del último cambio de contraseña (instante formateado en la zona del gimnasio). El botón "Cambiar contraseña" abre una **sheet** con las reglas en vivo actuales (10 caracteres, número, mayúscula, carácter especial y confirmación) y el aviso de que se cerrará la sesión.
- **Configuración:** lista de horarios del gimnasio (`localTime` formateado y ordenado). "Agregar horario" abre un **diálogo** corto con time picker (un solo campo) y el texto corregido: "Agrega un horario disponible para las clases." No se agregan horarios duplicados (el servidor ya tiene `UNIQUE`; mostrar el error legible).

## 4.3 Miembros (`/members`)
**Hoy:** `05`–`13` y `63`. **Bugs:** B4 (avatares) y B5 (`refetchQueries: ['homeQueries']` inexistente).
- **Lista densa** (`DataTable`) con estas columnas: Miembro (avatar con iniciales y nombre), Categoría, Última asistencia (relativa: "Hoy", "Hace 3 días"), Estado y Peso actual. En móvil se ven solo Miembro, Estado y un chevron, y la fila completa es clickeable hacia el detalle.
  - **Estado**: `Activo`, `Inactivo` y `En riesgo`. "En riesgo" significa activo y sin asistencia en más de 14 días (umbral confirmado por el dueño).
  - Si "Última asistencia", "Peso actual" o "En riesgo" no se pueden obtener en una sola query con el schema actual, se agregan los campos calculados necesarios al type `Member` en el servidor (por ejemplo `lastAttendanceDate: LocalDate` y `currentWeight: Float`), resueltos con una query agregada **sin N+1**.
- Barra de filtros: búsqueda (desde 1 carácter, con debounce de 300 ms; sigue usando `getFilteredMembers` o el mismo endpoint de la lista) y Estado (Activos/Inactivos). La categoría es opcional, a criterio del builder.
- Paginación: se conserva "Cargar más" (lotes de 50) o se usa scroll infinito.
- **Sheet "Miembro"** (crear y editar, la misma que usa el detalle) con secciones:
  - **Datos**: nombre*, categoría (A1–A7), género, nacimiento (`LocalDate`) y estatura en m (decimal 0.5–2.5).
  - **Contacto**: teléfono (10 caracteres como máximo, según la DB) y correo (válido).
  - **Plan**: días de la semana como botones toggle, horario preferido (select de `gymClassTime`) y estado activo/inactivo (solo al editar).
  - **Observaciones.**
- Después de crear, refrescar la lista y el conteo del Inicio con el documento tipado. Se elimina el string `'homeQueries'`.

## 4.4 Clases (`/classes`)
**Hoy:** `28`–`40` y `65`.
- Navegación por día: ‹ fecha › más un botón "Hoy" y un selector de fecha (el día es `LocalDate`).
- Cada clase es una card con tipo, duración y descripción (Markdown renderizado, colapsable si es larga). Los horarios van como tabs o segmentos, y cada uno muestra su conteo de asistentes y los asistentes como chips con avatar.
- **Sheet "Pasar lista"** (reemplaza los modos + y −). Se abre por horario y muestra todos los miembros **activos** con checkbox, con búsqueda y el contador "Seleccionados: N".
  - Al abrirla vienen marcados **solo los asistentes ya registrados** en ese horario. **No hay preselección por plan semanal** (decisión del dueño). Opcional: un indicador sutil "plan" junto a los miembros cuyo plan incluye ese día, sin marcarlos.
  - Al guardar se calcula la diferencia: se llama a `addMembersAttendances` con los agregados y a `removeMembersAttendances` con los quitados.
- **Sheet "Nueva clase"** (ancha, 640px): tipo* (con autocompletado de los tipos usados antes), duración en minutos (entero > 0), horarios* (multi-select) y descripción con editor Markdown en **tabs Escribir / Vista previa** (no doble panel). La fecha es el día seleccionado, mostrado en el subtítulo de la sheet.
- "Agregar horario a la clase": un diálogo corto con los horarios que faltan, o deshabilitado con tooltip si ya están todos.
- Estado vacío del día con la acción "Nueva clase".

## 4.5 Detalle de miembro (`/members/:code`), la pantalla más compleja
**Hoy:** `14`–`27` y `64`. **Bugs:** B3 (diferencia "-" al filtrar), B6 (switch de acciones), B10 (años desde 1900) y B2 (ya resuelto por `FormField`).
- **Encabezado:** avatar, nombre, código, categoría y chip de estado. Acciones: Compartir (copia el link `/visit` existente, con toast de confirmación), Editar (abre la sheet "Miembro" de 4.3) y **+ Medición** (primaria).
- **Tabs** (sincronizadas con `?tab=` en la URL para poder enlazarlas):
  1. **Resumen:** 6 `MetricCard` (peso, IMC, grasa, músculo, agua y calorías) con valor, clasificación (`StatusChip`), variación respecto de la medida anterior y sparkline de las últimas 6. Debajo, la asistencia del año como mapa de calor y el total.
  2. **Medidas:** selector de métrica (las mismas cards o un segmento), gráfico (línea o barras), `DataTable` con fecha, valor, Δ e indicador, con acciones **Editar** (sheet "Medición") y **Eliminar** (`ConfirmDialog`) siempre visibles, y filtro de rango en un popover con atajos (Este año, 6 meses y 3 meses) más Desde/Hasta `LocalDate`.
     - Las tablas de referencia (imágenes escaneadas en `public/images`) se siguen pudiendo ver con un botón "Tabla de referencia" que abre un diálogo de imagen con zoom. No se convierten en datos.
  3. **Asistencia:** años **desde el año de la primera asistencia del miembro hasta el actual** (B10), conteo por mes, y al hacer clic en un mes la lista de clases (fecha, hora local, tipo y duración).
  4. **Datos:** la información general en modo lectura. Para editarla, el botón Editar abre la sheet.
- **Sheet "Medición"** (crear y editar): fecha y hora (instante; por defecto, ahora) y los 6 valores numéricos. Cada campo muestra como ayuda **"Anterior: X"** de la medida previa. Validación: números > 0 en rangos razonables (definidos por el builder y documentados en el schema zod).
- **B3 (servidor):** en `getMeasures.ts` y `getLastMeasure.ts`, calcular los `lag()` en un CTE **sin el filtro de fechas** y filtrar afuera, para que la primera fila de un rango tenga su diferencia real. La lógica de diferencias se unifica en una sola función o SQL compartido.
- Se eliminan `MemberContext` (eventos con `setTimeout`), `measuresDiffsDecorator` si queda obsoleto y la copia de `member` en `useState`.

## 4.6 Inicio "Hoy" (`/`)
**Hoy:** `03`, `10` y `61`. Wireframe en `docs/INSPIRACION.md` §5 y bloque "Inicio" de `estilos.html`.
- **KPIs:** miembros activos (con la variación del mes), asistencias de esta semana (con la variación contra la semana anterior) y clases de hoy.
- **Clases de hoy:** cada horario con su hora, tipo, conteo de asistentes y botón **"Pasar lista"**, que abre la misma sheet de 4.4.
- **Recordatorios:** cumpleaños de hoy, miembros "En riesgo" (activos con más de 14 días sin venir) y miembros activos sin medirse hace **más de 90 días** (umbrales confirmados por el dueño; se definen como constantes en un solo lugar). Cada uno enlaza a la lista de Miembros filtrada o al miembro.
- **Asistencia de los últimos 7 días:** gráfico de barras con el día de hoy resaltado.
- Si hacen falta queries agregadas nuevas (asistencias por día, miembros en riesgo o sin medir), se agregan al servidor como queries con `@auth`, eficientes y sin N+1.

## 4.7 Página pública `/visit?code=<base64>`
**Hoy:** `55`–`57` y `56` (móvil). **El mecanismo no cambia** (decisión del dueño): mismo URL, mismo base64, pública y con las mismas queries públicas.
- **Mobile-first.** Es un "reporte de progreso" que el miembro abre desde WhatsApp. Tiene encabezado con el logo y el nombre del gimnasio, y el saludo "Hola, {nombre}" (en lugar de "Howdy"). Aquí se permiten emojis, con mesura.
- 6 `MetricCard` con valor actual, clasificación, variación y sparkline. Al tocar una, se ve su gráfico de progreso. **Se eliminan las 6 tablas seguidas.** Opcional: un enlace "Ver todas las mediciones" con una tabla única.
- Asistencia del año: mapa de calor y total.
- Respeta el modo del sistema del visitante: claro u oscuro según `prefers-color-scheme`, sin selector.
- **Código inválido o sin datos:** mensaje amable con el logo ("No encontramos este perfil. Pídele a tu entrenador un enlace nuevo."), sin el "Howdy ," vacío.

## 4.8 Cierre (último plan)
- Activar `ENABLE_DARK_MODE = true` y verificar **todas** las pantallas en modo oscuro.
- Borrar lo que quede sin uso:
  - `src/client/pages/`, los `components/Bs*` reemplazados, `cacheHelpers/`, `MemberContext`, `utils/helpers.ts` y `memberUtils.ts` (si quedaron vacíos), `labels.ts` (lo no usado) y `theme/customTheme.tsx`;
  - la tabla `user` no usada (migración);
  - `src/client/utils/python` y `delete_later/`, **confirmando con el dueño antes** de borrar estos dos.
- `grep -rnoE "#[0-9a-fA-F]{3,6}\b" src/client --include=*.tsx` no devuelve colores fuera de `app/theme.ts` y de la paleta de avatares.
- Recorrido completo con Playwright en 390, 768 y 1440px, en claro y oscuro, con capturas en `docs/screenshots/after/`.
- Actualizar `CLAUDE.md` (estructura nueva, `npm test` y `npm run codegen`) y `docs/ARQUITECTURA.md`, marcando como cerrados B1–B10 y S1, S4 y S6.

## Fuera de alcance
- La app móvil para miembros, cuentas para miembros, pagos y notificaciones.
- Cambiar la seguridad de `/visit`.
- Convertir las tablas de referencia escaneadas en datos.
- Nuevas funcionalidades no listadas aquí. Las únicas adiciones permitidas son los campos y queries calculados para la lista de Miembros y el Inicio.
