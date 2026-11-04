# Spec 3: Base del nuevo frontend

**Fecha:** 2026-11-03 · **Roadmap:** [00](./2026-11-03-00-roadmap-redesign.md) · **Requiere:** spec 2 terminada · **Tamaño:** mediano (1 plan)

## Intención

Crear los cimientos para que cada pantalla se migre (spec 4) **sin reinventar nada**: tema Iron con modo claro, oscuro y sistema, layout responsive, componentes base, tipos GraphQL generados y un patrón único de formularios. Esta spec **no rediseña pantallas**, salvo el layout común (menú y barra superior).

Hoy el frontend tiene 63 `eslint-disable`, 144 `sx` en línea, 62 `styled()`, 104 colores hex sueltos, 28 `useEffect`, estado del servidor copiado a `useState` con `fetchPolicy: 'no-cache'`, "eventos" hechos con booleanos y `setTimeout(100)`, y 6 diálogos de formulario casi iguales (ver `docs/ARQUITECTURA.md` §6, "Deuda técnica en el frontend").

## Referencia visual obligatoria

`docs/preview/estilos.html` es la **fuente de verdad** de tokens, tipografía, radios, componentes, sheet/diálogo y comportamiento móvil. Hay capturas en `docs/preview/*.png`. Se implementa la **opción A "Iron"**; Ember queda descartada.

## Requisitos

### 1. Dependencias
- `@mui/material`, `@mui/icons-material` y `@mui/system` en la **última 9.x**, y `@mui/x-date-pickers` en la última compatible. Todas aceptan React 18. **React se queda en 18.**
- Seguir las guías de migración v5→v6→v7→v9 de MUI. Lo que se rompa en pantallas viejas se arregla **lo mínimo** para que compilen y funcionen; se rediseñan en la spec 4.
- Agregar `react-hook-form`, `zod`, `@hookform/resolvers` y `@graphql-codegen/cli` + `@graphql-codegen/client-preset`.
- Fuentes: **Barlow Condensed** (600/700) para titulares y números, e **Inter** (400/500/600) para el cuerpo. Se reemplaza el `<link>` actual de Google Fonts en `index.html` (Bebas Neue, Cabin Condensed y Sriracha). Hay que verificar si Sriracha o Bebas se usan en algún lado antes de quitarlas.
- **A criterio del builder:** si el salto a MUI 9 rompe algo que no se resuelve en un tiempo razonable (por ejemplo, x-date-pickers), se puede quedar en **MUI 7.3.x**, que también tiene `colorSchemes`, `cssVariables` y `useColorScheme`. Se documenta en el PR.
- Logo: solo existe `public/images/logo.jpeg`, un raster con fondo negro circular. Se usa tal cual (recortado en círculo). Un logo vectorial queda fuera de alcance.
- Íconos: **`@mui/icons-material`**, variante *Outlined* o *Rounded*, una sola en toda la app. No se agrega otra librería de íconos.

### 2. Tema (`src/client/app/theme.ts`)
- `createTheme({ cssVariables: { colorSchemeSelector: 'class' }, colorSchemes: { light, dark }, ... })` con **exactamente** los tokens de `estilos.html` para `[data-dir="iron"]`, en claro y oscuro:
  - mapeo a la paleta MUI: `background.default/paper`, `text.primary/secondary`, `divider`, `primary` (`main #FACC15`, `contrastText #18181B`), `success`, `warning`, `error` e `info`;
  - extensiones tipadas con module augmentation: `surface2`, `primaryInk`, `primarySoft`, `nav`, `navText`, `navActive`, y `soft` para cada color de estado.
- Tipografía: `fontFamily` Inter. `h1`–`h4` y la nueva variante `metric` (cifras grandes) con Barlow Condensed y `fontVariantNumeric: 'tabular-nums'`.
- `shape.borderRadius = 8`, con radios de 12 en Card y 16 en Sheet y Dialog definidos en `components` overrides. Botones sin `textTransform`.
- **Regla de contraste:** el amarillo `primary` **nunca** es color de texto sobre superficies claras. Para enlaces y acentos de texto se usa `primaryInk` (`#854D0E` en claro y `#FDE047` en oscuro).
- `ThemeProvider defaultMode="system"`. El modo se guarda en `localStorage`, que es el storage manager por defecto de MUI.
- Chart.js: hook `useChartColors()` que lee la paleta del modo activo y la entrega a los gráficos. El editor Markdown (`@uiw/react-md-editor`) recibe `data-color-mode` según el modo. Los toasts (react-toastify) usan `theme="colored"` o un estilo derivado de los tokens, y se ven bien en ambos modos.

### 3. Selector de modo
- Componente `ThemeModeToggle` con tres opciones (Claro, Oscuro y Sistema) en el menú del avatar (barra superior). Usa `useColorScheme()` y maneja que `mode` llegue como `undefined` en el primer render.
- **Decisión del diseñador:** mientras queden pantallas sin migrar, el selector se oculta con la constante `ENABLE_DARK_MODE = false` en `src/client/app/flags.ts` y la app fuerza el modo claro. Así se puede desplegar a producción después de cada pantalla migrada sin que las pantallas viejas (con colores hex fijos) se vean rotas en oscuro. La spec 4 lo activa al final.

### 4. Layout responsive (`src/client/app/layout/`)
- **≥ 900px (md):** rail lateral de 76px con logo, ítems Hoy, Miembros, Clases y Equipo, y Configuración abajo. Colores `nav*`. El ítem activo usa fondo `navActive` con texto `navActiveText`.
- **< 900px:** barra inferior fija con los mismos 4 ítems (Configuración se mueve al menú del avatar). El contenido tiene padding inferior para no quedar tapado. El drawer actual con ☰ desaparece.
- Barra superior: título de la página a la izquierda y avatar del usuario a la derecha, con un menú (Mi perfil, Modo, Salir).
- `PageHeader` reutilizable: título, subtítulo opcional y slot de acciones a la derecha. En móvil, las acciones bajan debajo del título.
- Se prueba en 390, 768 y 1440px, **sin scroll horizontal**.

### 5. Componentes base (`src/client/design-system/`)
Cada uno con la API mínima que necesitan las pantallas de la spec 4:

| Componente | Comportamiento |
|---|---|
| `AppSheet` | Sheet lateral derecha (480px; `size="wide"` 640px) en md+, y **bottom sheet al 92% de alto** con asa en < md. Encabezado fijo (título, subtítulo y ✕), cuerpo con scroll y pie fijo (Cancelar + acción primaria a la derecha). Se cierra con **Escape, ✕, Cancelar y clic en el scrim**. Si el form tiene cambios (`isDirty`), pide confirmación antes de cerrar. Al cerrar, el foco vuelve al botón que la abrió. `role="dialog"`, `aria-labelledby`. Se puede construir sobre MUI `Drawer` (`anchor` según el breakpoint). |
| `ConfirmDialog` | Diálogo corto para confirmaciones destructivas: título, texto, Cancelar y botón `color="error"`. Se cierra con Escape. |
| `FormField` + helpers RHF | Envoltorios de `TextField`, `Select`, `DatePicker` y `TimePicker` conectados a react-hook-form (`Controller`). Muestran el error de zod debajo del campo. **Los campos numéricos guardan el texto tal cual y la conversión se hace en el schema zod (`z.coerce.number()`)**, lo que cierra el bug B2 del `0` que no se puede borrar. |
| `MemberAvatar` | Iniciales (2 letras) sobre un color derivado del hash del nombre, de una paleta de 8 colores con contraste AA contra texto blanco. **No** usa `member.avatar` (robohash está caído; bug B4). El campo se conserva en la DB para la futura app móvil. |
| `MetricCard` | Etiqueta, valor grande (`metric`), unidad, chip de clasificación opcional, variación con flecha y color (bueno o malo según la métrica) y sparkline opcional. Seleccionable (`aria-selected`). |
| `StatusChip` | Variantes `success`, `warning`, `danger`, `info` y `neutral`. **Siempre texto + ícono**, nunca solo color. |
| `DataTable` | Una sola tabla (reemplaza a `BsTable` y `SimpleTable`): columnas tipadas, alineación numérica con `tabular-nums`, paginación opcional, estado vacío, y `overflow-x:auto` dentro de su card en móvil. Las acciones por fila son **siempre visibles** (ícono con `aria-label` y tooltip). Se elimina el switch "Mostrar acciones". |
| `EmptyState` | Ícono, texto y acción opcional. |
| `KpiCard` | Etiqueta, número grande y variación opcional. |

Cada ícono-botón lleva `aria-label`. El foco es visible (`:focus-visible` con `primaryInk`).

### 6. Datos y GraphQL
- `codegen.ts` con `client-preset` sobre el schema que expone el servidor (introspección a `http://localhost:8080/graphql` o los SDL de `src/server/apollo/typeDefs`) y los documentos en `src/client/**`. Agregar el script `npm run codegen`. El código generado va a `src/client/gql/` y se commitea.
- **Reglas para el código nuevo** (lo existente se migra en la spec 4):
  - Usar `graphql()` del preset, sin `gql` sin tipar ni `as unknown as`.
  - **No** usar `fetchPolicy: 'no-cache'` + `useState` para datos del servidor: el cache de Apollo es la fuente de verdad.
  - **No** usar los callbacks `onCompleted`/`onError` de `useQuery`/`useLazyQuery` (están deprecados): usar `data`, `error` y `loading` derivados. En `useMutation` se permiten.
  - Después de una mutación, usar `refetchQueries` con el **documento** tipado, no un string, o un helper de cache por entidad.
  - Nada de "eventos" con booleanos y `setTimeout`.
- Se mantiene `GraphqlClient.tsx` (links de auth, retry y logout), tipándolo y quitando sus `eslint-disable`.

### 7. Estructura de carpetas
```
src/client/
  app/            # providers, theme.ts, flags.ts, layout/, routes
  design-system/  # componentes base de la sección 5
  features/       # se llena en la spec 4 (members, measures, classes, equipment, auth, config, home, visit)
  gql/            # generado por codegen
  lib/            # utilidades de cliente (las fechas viven en src/common/dates.ts)
```
Las páginas actuales (`pages/`, `components/Bs*`) **siguen funcionando** hasta que la spec 4 las reemplace. `PATHS` en `src/common/enums.ts` sigue siendo la fuente de rutas; si cambia una ruta, hay que actualizarla también ahí para que no dé 404 en producción.

### 8. Página de muestra
Una ruta **solo de desarrollo**, `/_design` (registrada únicamente si `import.meta.env.DEV`), que muestra todos los componentes base en ambos modos, como `estilos.html` pero con los componentes reales. Sirve para la verificación visual. No va en `PATHS`.

## Fuera de alcance
- Rediseño de cualquier pantalla (spec 4).
- React 19, Apollo Client 4, Vite 5+ y Node > 18.
- Tests de componentes. Basta con la verificación visual con Playwright y los tests de la spec 2.

## Verificación ("terminado")
- `npm run lint`, `npm run build`, `npm test` y `npm run codegen` pasan. El código nuevo no tiene `eslint-disable`.
- `/_design` en 390, 768 y 1440px, en claro y oscuro (forzando el flag en dev), se ve igual que `docs/preview/estilos.html` en tokens, tipografía, radios, chips, botones y formulario. Guardar capturas en `docs/screenshots/after/_design-*.png`.
- `AppSheet` probado con Playwright: abre y cierra con Escape, ✕, Cancelar y scrim. Con cambios sin guardar pide confirmación. El foco vuelve al disparador. En 390px es bottom sheet y el pie no queda tapado por la barra inferior.
- Un `FormField` numérico permite vaciar el campo y escribir `75`, y el valor queda `75` (no `075`).
- Todas las pantallas existentes siguen funcionando: recorrer el flujo de `docs/DISENO.md` §2 con Playwright y verificar que no hay regresiones funcionales. Los detalles visuales de las pantallas viejas no cuentan.
- El layout nuevo (rail y barra inferior) está activo en todas las pantallas.
