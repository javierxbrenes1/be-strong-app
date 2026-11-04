# Base del nuevo frontend: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar listos el tema Iron (claro/oscuro/sistema), el layout responsive, los componentes base, los formularios validados y los tipos GraphQL generados, para que cada pantalla se migre después sin reinventar nada.

**Architecture:** MUI actualizado con `cssVariables` + `colorSchemes`. Carpetas nuevas `app/` (providers, tema, layout), `design-system/` (componentes base) y `gql/` (codegen) conviven con las `pages/` viejas, que siguen funcionando hasta la spec 4. La ruta `/_design`, solo de desarrollo, sirve de banco de pruebas visual.

**Tech Stack:** React 18, Vite 4, MUI 9.x (o 7.3.x como respaldo), `@mui/x-date-pickers` + dayjs, react-hook-form + zod, Apollo Client 3 + `@graphql-codegen/client-preset`, Vitest, Playwright para la verificación visual.

**Spec:** `docs/superpowers/specs/2026-11-03-03-base-frontend-design.md` · Referencia visual: `docs/preview/estilos.html` (opción A "Iron") y `docs/preview/*.png`.

## Global Constraints

- Rama `redesign/03-base-frontend` desde `master` con los planes 1 y 2 integrados.
- Commits sin `Co-Authored-By` ni atribución a IA.
- **React se queda en 18.** No se suben Apollo Client 4, Vite 5+ ni Node > 18.
- Tokens **exactos** de `estilos.html` (`[data-dir="iron"]`):
  - Claro: bg `#F6F6F4` · surface `#FFFFFF` · surface-2 `#EFEFEC` · text `#18181B` · muted `#5B5B63` · border `#E2E2DE` · primary `#FACC15` · on-primary `#18181B` · primary-ink `#854D0E` · primary-soft `#FEF9C3` · success `#15803D` / soft `#DCFCE7` · warning `#B45309` / `#FEF3C7` · danger `#B91C1C` / `#FEE2E2` · info `#1D4ED8` / `#DBEAFE` · nav `#18181B` · nav-text `#A1A1AA` · nav-active `#FACC15` · nav-active-text `#18181B`.
  - Oscuro: bg `#0F0F10` · surface `#18181B` · surface-2 `#222226` · text `#F4F4F5` · muted `#A1A1AA` · border `#2E2E33` · primary `#FACC15` · on-primary `#18181B` · primary-ink `#FDE047` · primary-soft `#3a3210` · success `#4ADE80` / `#12301d` · warning `#FBBF24` / `#3a2a0a` · danger `#F87171` / `#3b1515` · info `#60A5FA` / `#132640` · nav `#0B0B0C` · nav-text `#8B8B94` · nav-active `#FACC15` · nav-active-text `#18181B`.
- El amarillo `primary` **nunca** es color de texto sobre superficies claras. Los textos de acento usan `primaryInk`.
- Fuentes: Barlow Condensed 600/700 (titulares y cifras, con `tabular-nums`) e Inter 400/500/600 (cuerpo).
- Radios: base 8, Card 12, Sheet/Dialog 16. Botones sin `textTransform`.
- Breakpoint del layout: **md = 900px** (rail lateral en md o más, barra inferior por debajo).
- Íconos: solo `@mui/icons-material`, variante **Rounded**.
- Textos en español con ortografía correcta.
- `ENABLE_DARK_MODE = false` en `src/client/app/flags.ts` hasta el plan 4.8.
- El código nuevo no usa `eslint-disable`, `as unknown as`, `fetchPolicy: 'no-cache'` + `useState` para datos del servidor, ni `onCompleted`/`onError` en `useQuery`/`useLazyQuery`.
- Cada ícono-botón lleva `aria-label`.
- Las pantallas viejas deben **seguir funcionando**. Sus detalles visuales no cuentan.

## Review Focus

- Campo numérico vaciado y reescrito (`82` → vaciar → `75`): el valor queda `75`, nunca `075` ni `0`. Test en Task 5.
- Sheet con cambios sin guardar cerrada por Escape o por clic en el scrim: pide confirmar; si se cancela la confirmación, la sheet sigue abierta con los datos. Verificación en Task 4.
- En 390px, el pie de la bottom sheet no queda tapado por la barra inferior ni por el teclado. Verificación en Task 4.
- `useColorScheme().mode` es `undefined` en el primer render: el toggle no rompe ni parpadea. Verificación en Task 2.
- Nombre de miembro de una sola palabra, con tildes o vacío: `initials` y `avatarColor` no fallan. Test en Task 6.

---

### Task 1: Actualizar MUI, date pickers y fuentes

**Files:**
- Modify: `package.json` / `package-lock.json`
- Modify: `index.html` (fuentes)
- Modify: los archivos de `src/client/**` que rompa la migración (lo mínimo)

**Interfaces:**
- Produces: `@mui/material`, `@mui/icons-material`, `@mui/system` y `@mui/x-date-pickers` actualizados. `npm run dev-client` y `npm run build` funcionan con las pantallas viejas.

- [ ] **Step 1: Medir el punto de partida.** Run: `npm run build`. Anotar si ya pasaba. Run: `grep -rn "Sriracha\|Bebas" src index.html` para saber si esas fuentes se usan.
- [ ] **Step 2: Actualizar.** Run: `npm i @mui/material@^9 @mui/icons-material@^9 @mui/system@^9 @mui/x-date-pickers@latest`. Aplicar los codemods de MUI en orden (`npx @mui/codemod@latest v6.0.0/preset-safe src/client`, luego `v7.0.0/preset-safe`, y los de v9 si existen) y las guías de migración de `@mui/x-date-pickers`. `Grid` con `item`/`xs` pasa a la API nueva (`size`) o a `GridLegacy` si el codemod lo deja así.
  - Si en 2 h de trabajo no compila por incompatibilidades de terceros, usar `@^7.3` en las cuatro dependencias y anotar el motivo en el PR (la spec lo permite).
- [ ] **Step 3: Fuentes.** En `index.html`, reemplazar el `<link>` de Google Fonts por `family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600&display=swap`. Si Sriracha o Bebas Neue aparecieron en el Step 1, conservarlas en el mismo link hasta la spec 4.
- [ ] **Step 4: Verificar.** Run: `npx tsc --noEmit && npm run build`. Expected: código 0. Con Playwright, login y visita de `/`, `/members`, `/members/<code>`, `/classes`, `/equipment`, `/config` y `/profile`: cada una renderiza sin error en consola (`pageerror`).
- [ ] **Step 5: Commit** con `git commit -m "chore(client): upgrade MUI and date pickers"`.

### Task 2: Tema Iron, providers y selector de modo

**Files:**
- Create: `src/client/app/theme.ts`
- Create: `src/client/app/theme.test.ts`
- Create: `src/client/app/flags.ts`
- Create: `src/client/app/AppProviders.tsx`
- Create: `src/client/app/ThemeModeToggle.tsx`
- Create: `src/client/app/useChartColors.ts`
- Modify: `src/client/main.tsx` (usar `AppProviders`) y `src/client/App.tsx` (`ToastContainer` con tema)
- Modify: `vitest.config.ts` (incluir `src/**/*.test.{ts,tsx}`)

**Interfaces:**
- Produces:
  - `theme` (export default de `app/theme.ts`).
  - Augmentation de `Palette` con `surface2: string`, `primaryInk: string`, `primarySoft: string`, `nav: { bg, text, activeBg, activeText }` y `soft: { success, warning, error, info }`. Variante de tipografía `metric`.
  - `ENABLE_DARK_MODE: boolean`.
  - `<AppProviders>{children}</AppProviders>`, que envuelve `GraphqlClient` + `ThemeProvider defaultMode={ENABLE_DARK_MODE ? 'system' : 'light'}` + `CssBaseline` + `LocalizationProvider(AdapterDayjs, 'es')`.
  - `<ThemeModeToggle />`, que muestra Claro, Oscuro y Sistema en un `ToggleButtonGroup` y no renderiza nada si `!ENABLE_DARK_MODE`.
  - `useChartColors(): { primary: string; primaryInk: string; grid: string; text: string; muted: string }`.
  - Los colores viejos `white`, `bsYellow` y `bsBrown` **se conservan** en el tema nuevo, marcados `@deprecated` en la augmentation, para que las pantallas viejas compilen.

- [ ] **Step 1: Escribir el test que falla** (`theme.test.ts`), que fija los tokens:

```ts
import theme from './theme';
const light = theme.colorSchemes.light!.palette;
const dark = theme.colorSchemes.dark!.palette;
expect(light.background.default).toBe('#F6F6F4');
expect(light.background.paper).toBe('#FFFFFF');
expect(light.primary.main).toBe('#FACC15');
expect(light.primary.contrastText).toBe('#18181B');
expect(light.primaryInk).toBe('#854D0E');
expect(light.text.secondary).toBe('#5B5B63');
expect(dark.background.default).toBe('#0F0F10');
expect(dark.primaryInk).toBe('#FDE047');
expect(dark.error.main).toBe('#F87171');
expect(theme.shape.borderRadius).toBe(8);
expect(theme.typography.fontFamily).toMatch(/^"?Inter/);
```

- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- theme`. Expected: FAIL.
- [ ] **Step 3: Implementar `theme.ts`** con `createTheme({ cssVariables: { colorSchemeSelector: 'class' }, colorSchemes: { light: {palette}, dark: {palette} }, shape, typography, components })` y todos los tokens de Global Constraints. En `components`: `MuiCard` (radio 12, borde `divider`, sin sombra en oscuro), `MuiDialog` y `MuiDrawer` paper (radio 16), `MuiButton` (`textTransform: 'none'`, `fontWeight: 600`, `disableElevation`), `MuiOutlinedInput` (foco con borde `primaryInk` y anillo `primarySoft`) y `MuiChip` (`fontWeight: 600`). `h1`–`h4` y `metric` en Barlow Condensed con `fontVariantNumeric: 'tabular-nums'`.
- [ ] **Step 4: Implementar los providers, el toggle, `useChartColors` y los toasts** (`ToastContainer theme` según `useColorScheme().mode`, con `'light'` como fallback mientras sea `undefined`). En `main.tsx`, `<AppProviders><App/></AppProviders>`.
- [ ] **Step 5: Verificar.** Run: `npm test` y `npx tsc --noEmit`. Expected: PASS. Con Playwright: `/` en claro con fondo `rgb(246, 246, 244)`. Poner temporalmente `ENABLE_DARK_MODE = true`, elegir "Oscuro" y comprobar que `<html>` tiene la clase `dark` y el fondo `rgb(15, 15, 16)`. Recargar: se conserva. Elegir "Sistema" con `page.emulateMedia({ colorScheme: 'dark' })`: oscuro. Volver el flag a `false`.
- [ ] **Step 6: Commit** con `git commit -m "feat(client): Iron theme with color schemes and mode toggle"`.

### Task 3: Layout responsive

**Files:**
- Create: `src/client/app/layout/AppLayout.tsx` (reemplaza a `components/MainLayout.tsx`)
- Create: `src/client/app/layout/NavRail.tsx`
- Create: `src/client/app/layout/BottomNav.tsx`
- Create: `src/client/app/layout/TopBar.tsx`
- Create: `src/client/app/layout/navItems.ts`
- Create: `src/client/design-system/PageHeader.tsx`
- Modify: `src/client/AppRoutes.tsx` (usar `AppLayout`)
- Delete: `src/client/components/{MainLayout,Navbar,TopBar}.tsx`. `PageContainer`/`PageTitle` solo se borran si nada los usa; si no, quedan hasta la spec 4.

**Interfaces:**
- Produces:
  - `navItems: { label: 'Hoy' | 'Miembros' | 'Clases' | 'Equipo'; path: string; icon: SvgIconComponent }[]`, con las rutas de `PATHS`. "Configuración" va aparte: abajo del rail en md o más, y en el menú del avatar por debajo de md.
  - `<PageHeader title: string; subtitle?: ReactNode; actions?: ReactNode; leading?: ReactNode />`. En xs, `actions` baja debajo del título.
  - El menú del avatar del `TopBar` tiene: "Mi perfil" (`PATHS.PROFILE`), "Configuración" (solo por debajo de md), `<ThemeModeToggle/>` y "Salir" (el reset de `authState` y la navegación a `/login` que ya existen).

- [ ] **Step 1: Implementar.**
  - Rail de 76px, fijo, con el logo `/images/logo.jpeg` en círculo de 44px, ítems apilados (ícono + label 11px), activo con `nav.activeBg`/`nav.activeText` y radio 12.
  - `BottomNav` con `position: fixed; bottom: 0`, alto ≥ 64px, `env(safe-area-inset-bottom)`. El contenido tiene `pb` igual a su alto.
  - El `TopBar` muestra el título de la página (se puede derivar de la ruta) y el avatar del usuario (`MemberAvatar` de la Task 6; mientras tanto, un `Avatar` de MUI con la inicial).
  - El ítem activo coincide también en subrutas (`/members/BS-xxx` activa "Miembros").
- [ ] **Step 2: Verificar con Playwright** en 1440×900, 768×1024 y 390×844:
  - 1440: hay `nav[aria-label="Principal"]` vertical y no hay barra inferior.
  - 390: barra inferior visible y sin rail.
  - En cada tamaño, `document.documentElement.scrollWidth <= innerWidth`.
  - Clic en cada ítem navega y lo marca como activo (`aria-current="page"`).
  - En `/members/<code>`, "Miembros" está activo.
  - Capturas en `docs/screenshots/after/layout-{1440,768,390}.png`.
- [ ] **Step 3: Commit** con `git commit -m "feat(client): responsive app layout with rail and bottom navigation"`.

### Task 4: `AppSheet` y `ConfirmDialog`

**Files:**
- Create: `src/client/design-system/AppSheet.tsx`
- Create: `src/client/design-system/ConfirmDialog.tsx`

**Interfaces:**
- Produces:
```ts
type AppSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: ReactNode;
  size?: 'default' | 'wide';          // 480px | 640px en md o más
  dirty?: boolean;                     // si es true, pedir confirmación al cerrar
  primaryAction?: { label: string; onClick?: () => void; type?: 'button' | 'submit'; form?: string; loading?: boolean; disabled?: boolean };
  cancelLabel?: string;                // por defecto 'Cancelar'
  children: ReactNode;
};
type ConfirmDialogProps = {
  open: boolean; title: string; description?: ReactNode;
  confirmLabel?: string;               // por defecto 'Eliminar'
  cancelLabel?: string;                // por defecto 'Cancelar'
  destructive?: boolean;               // por defecto true (botón color error)
  loading?: boolean;
  onConfirm: () => void; onCancel: () => void;
};
```
- Comportamiento de `AppSheet`:
  - Usa MUI `Drawer` con `anchor="right"` en md o más y `anchor="bottom"` por debajo (altura 92dvh, asa de 40×4px, radio superior 16).
  - Encabezado fijo con `title` (h2), `subtitle` y un `IconButton aria-label="Cerrar"`. Cuerpo con scroll. Pie fijo con Cancelar (outlined) + la acción primaria (contained, a la derecha).
  - Escape, scrim, ✕ y Cancelar llaman a `requestClose`: si `dirty`, abre un `ConfirmDialog` ("¿Descartar cambios?", confirmLabel "Descartar"); si no, llama a `onClose`.
  - El foco vuelve al disparador (comportamiento por defecto de Modal; no desactivarlo).
  - `aria-labelledby` apunta al título.
  - El `Drawer` se monta por encima de la `BottomNav` (z-index de modal).

- [ ] **Step 1: Implementar ambos.**
- [ ] **Step 2: Verificar con Playwright** en `/_design` (Task 8). Si la Task 8 todavía no existe, montar temporalmente un demo en esa ruta:
  1. Abrir la sheet → `role=dialog` con nombre accesible igual al título.
  2. Escape la cierra y `document.activeElement` es el botón que la abrió.
  3. Repetir con clic en el scrim, en ✕ y en Cancelar.
  4. Escribir en un campo (dirty) y presionar Escape → aparece "¿Descartar cambios?". Cancelar → la sheet sigue abierta con el texto. Descartar → se cierra.
  5. En 390×844, la sheet ocupa de abajo hacia arriba y el botón primario es visible y clickeable (`elementFromPoint` en su centro es el propio botón).
- [ ] **Step 3: Commit** con `git commit -m "feat(design-system): AppSheet and ConfirmDialog"`.

### Task 5: Campos de formulario (react-hook-form + zod)

**Files:**
- Modify: `package.json` (`react-hook-form`, `zod`, `@hookform/resolvers`)
- Create: `src/client/design-system/form/zodHelpers.ts`
- Create: `src/client/design-system/form/zodHelpers.test.ts`
- Create: `src/client/design-system/form/FormTextField.tsx`, `FormNumberField.tsx`, `FormSelect.tsx`, `FormDatePicker.tsx`, `FormTimePicker.tsx` y `index.ts`

**Interfaces:**
- Produces:
  - `zNumber(opts: { min?: number; max?: number; int?: boolean; required?: boolean }): z.ZodType<number | undefined>`: recibe el string del input (`''` → `undefined`, que da `'Requerido'` si `required`, con `required` en true por defecto) y lo convierte a número (acepta `,` como decimal). Mensajes: `'Debe ser un número'`, `'Mínimo {min}'`, `'Máximo {max}'`, `'Debe ser un número entero'`.
  - `zLocalDate(opts?: { required?: boolean })`: string `YYYY-MM-DD` validado con `isLocalDate`; mensaje `'Fecha inválida'`.
  - `zLocalTime()`: con `isLocalTime`.
  - Cada `Form*` recibe `{ control: Control<T>; name: Path<T>; label: string; helperText?: ReactNode }` más las props de su control MUI, y muestra `fieldState.error.message`.
  - `FormNumberField` usa `inputMode="decimal"` (o `"numeric"` si `int`) y **guarda el texto crudo** en el form.
  - `FormDatePicker` mapea `LocalDate` ↔ `Dayjs` con `dayjs(v)` y `d.format('YYYY-MM-DD')`. `FormTimePicker` hace lo mismo con `'HH:mm'`.
  - `FormSelect` recibe `options: { value: string; label: string }[]`.

- [ ] **Step 1: Escribir el test que falla** (`zodHelpers.test.ts`):
```ts
const n = zNumber({ min: 0, max: 300 });
expect(n.safeParse('').success).toBe(false);
expect(n.safeParse('').error!.issues[0].message).toBe('Requerido');
expect(n.parse('75')).toBe(75);
expect(n.parse('78,5')).toBe(78.5);
expect(n.parse('075')).toBe(75);
expect(n.safeParse('abc').error!.issues[0].message).toBe('Debe ser un número');
expect(n.safeParse('301').error!.issues[0].message).toBe('Máximo 300');
expect(zNumber({ int: true }).safeParse('1.5').error!.issues[0].message).toBe('Debe ser un número entero');
expect(zNumber({ required: false }).parse('')).toBeUndefined();
expect(zLocalDate().safeParse('2026-02-30').success).toBe(false);
expect(zLocalDate().parse('2026-11-03')).toBe('2026-11-03');
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- zodHelpers`. Expected: FAIL.
- [ ] **Step 3: Instalar las dependencias e implementar los helpers y los campos.**
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright en `/_design` (formulario de demo): en un `FormNumberField` con valor `82`, `fill('')` deja el input vacío (no `0`); luego `type('75')` deja exactamente `75`. Enviar vacío muestra "Requerido" debajo del campo.
- [ ] **Step 5: Commit** con `git commit -m "feat(design-system): react-hook-form fields with zod helpers"`.

### Task 6: Componentes de presentación

**Files:**
- Create: `src/client/design-system/avatar.ts` y `avatar.test.ts`
- Create: `src/client/design-system/MemberAvatar.tsx`, `StatusChip.tsx`, `MetricCard.tsx`, `Sparkline.tsx`, `KpiCard.tsx`, `EmptyState.tsx`, `DataTable.tsx` y `index.ts`

**Interfaces:**
- Produces:
  - `initials(name: string): string`: primera letra de las dos primeras palabras, en mayúscula; una sola palabra da una letra; vacío da `'?'`.
  - `avatarColor(name: string): string`: `AVATAR_COLORS[sum(charCodes) % 8]` con `AVATAR_COLORS = ['#7C3AED','#0E7490','#B45309','#BE185D','#15803D','#1D4ED8','#9333EA','#C2410C']` (todos ≥ 5:1 contra blanco).
  - `<MemberAvatar name: string; size?: number /* 34 por defecto */ />`, con `aria-hidden` (el nombre va como texto al lado).
  - `type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral'`.
  - `<StatusChip variant: StatusVariant; label: string />`: ícono por variante (CheckRounded, CircleRounded pequeño, ChangeHistoryRounded, InfoRounded, nada) + texto, colores `soft.*` / `*.main`.
  - `<Sparkline points: number[]; height?: number /* 34 */ />`: SVG con `polyline` en `primaryInk`. Con menos de 2 puntos no renderiza nada.
  - `<MetricCard label: string; value: string; unit?: string; status?: { variant: StatusVariant; label: string }; delta?: { value: number; good: boolean }; spark?: number[]; selected?: boolean; onSelect?: () => void />`. La flecha ↑/↓ depende del signo de `delta.value` y el color de `good` (`success.main`/`error.main`). Muestra `Math.abs(value)`. Con `onSelect` es un `button` con `aria-pressed={selected}`.
  - `<KpiCard label: string; value: string | number; delta?: { text: string; good: boolean }; hint?: string />`.
  - `<EmptyState icon?: ReactNode; title: string; description?: string; action?: ReactNode />`.
  - `type Column<T> = { id: string; header: string; render: (row: T) => ReactNode; align?: 'left' | 'right'; hideBelow?: 'sm' | 'md' }`.
  - `<DataTable<T> columns: Column<T>[]; rows: T[]; getRowId: (r: T) => string | number; loading?: boolean; empty?: ReactNode; onRowClick?: (r: T) => void; pagination?: { page: number; pageSize: number; total: number; onPageChange: (p: number) => void } />`. Va dentro de un contenedor con `overflowX: 'auto'`. `loading` muestra 5 filas skeleton. Con `onRowClick`, cada fila es enfocable y Enter la activa. Las columnas `align: 'right'` usan `tabular-nums`.

- [ ] **Step 1: Escribir el test que falla** (`avatar.test.ts`):
```ts
expect(initials('Carlos Jiménez Mora')).toBe('CJ');
expect(initials('ana')).toBe('A');
expect(initials('  ')).toBe('?');
expect(initials('Ángela Núñez')).toBe('ÁN');
expect(AVATAR_COLORS).toContain(avatarColor('Carlos Jiménez Mora'));
expect(avatarColor('Carlos Jiménez Mora')).toBe(avatarColor('Carlos Jiménez Mora'));
expect(avatarColor('')).toBe(AVATAR_COLORS[0]);
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- avatar`. Expected: FAIL.
- [ ] **Step 3: Implementar `avatar.ts` y los componentes.**
- [ ] **Step 4: Verificar.** Run: `npm test && npx tsc --noEmit`. Expected: PASS. La verificación visual se hace en la Task 8.
- [ ] **Step 5: Commit** con `git commit -m "feat(design-system): avatar, chips, metric/kpi cards, sparkline, data table, empty state"`.

### Task 7: GraphQL codegen y cliente tipado

**Files:**
- Modify: `package.json` (devDeps `@graphql-codegen/cli`, `@graphql-codegen/client-preset`; script `"codegen": "graphql-codegen"`)
- Create: `codegen.ts`
- Create: `src/client/gql/` (generado y commiteado)
- Create: `src/client/features/.gitkeep`
- Modify: `src/client/GraphqlClient.tsx` (tipar y quitar sus `eslint-disable`)
- Modify: `CLAUDE.md` (comando `npm run codegen` y la regla de que el servidor debe estar arriba)

**Interfaces:**
- Produces: `graphql()` desde `src/client/gql` para documentos tipados.
  - `codegen.ts`: `schema: 'http://localhost:8080/graphql'`, `documents: ['src/client/features/**/*.{ts,tsx}', 'src/client/design-system/**/*.{ts,tsx}']` (solo las carpetas nuevas, para no chocar con los `gql` viejos), `generates: { 'src/client/gql/': { preset: 'client', config: { scalars: { Date: 'number', LocalDate: 'string', LocalTime: 'string', UUID: 'string' } } } }`.
  - `ignoreNoDocuments: true`.

- [ ] **Step 1: Instalar y configurar.** Agregar un documento de humo en `src/client/features/_smoke/api.ts`: `graphql(\`query WhoAmISmoke { whoAmI { username name } }\`)`.
- [ ] **Step 2: Generar.** Con `npm run dev-server` corriendo, Run: `npm run codegen`. Expected: crea `src/client/gql/graphql.ts` con el tipo `WhoAmISmokeQuery`.
- [ ] **Step 3: Tipar `GraphqlClient.tsx`** sin `eslint-disable` ni `as unknown as`, manteniendo el comportamiento (auth link, retry y logout ante `UNAUTHORIZED_USER`).
- [ ] **Step 4: Verificar.** Run: `npx tsc --noEmit && npm run lint`. Expected: sin errores nuevos. Con Playwright, el login y el logout siguen funcionando, y un token inválido en `localStorage.auth` redirige a `/login`.
- [ ] **Step 5: Borrar `features/_smoke`, regenerar y commitear** con `git commit -m "chore(client): graphql codegen with typed documents"`.

### Task 8: Página `/_design` y verificación final

**Files:**
- Create: `src/client/app/DesignPage.tsx`
- Modify: `src/client/AppRoutes.tsx` (ruta `/_design` solo `if (import.meta.env.DEV)`, dentro de `AppLayout`, sin auth; no se agrega a `PATHS`)

**Interfaces:**
- Consumes: todo lo de las Tasks 2 a 6.
- Produces: una página que replica las secciones de `estilos.html` con componentes reales:
  - Login (estático), KPIs, "Clases de hoy", "Recordatorios", lista de miembros en `DataTable` y detalle con 6 `MetricCard` + tabs (sin datos reales).
  - Botones y `StatusChip`s, tipografía, y un formulario de demo con `FormNumberField`, `FormDatePicker` y un correo inválido.
  - Botones que abren tres `AppSheet` de demo (Medición, Miembro y Pasar lista) y un `ConfirmDialog`.
  - Un `ThemeModeToggle` siempre visible **en esta página**, aunque el flag esté apagado.

- [ ] **Step 1: Implementar la página.**
- [ ] **Step 2: Verificación visual con Playwright.** `/_design` en 1440, 768 y 390, en claro y oscuro. Comparar contra `docs/preview/preview-iron-light.png` y `preview-iron-dark.png`: mismos colores de fondo, superficie, borde, botón primario, chips y tipografía. Guardar en `docs/screenshots/after/_design-{1440,768,390}-{light,dark}.png`. Sin scroll horizontal en ningún tamaño.
- [ ] **Step 3: Regresión de pantallas viejas.** Recorrer con Playwright el flujo de `docs/DISENO.md` §2 (login, crear miembro, ver detalle, agregar y editar medida, abrir Clases y pasar asistencia, Equipo, Configuración y Perfil). Todo funciona y no hay `pageerror`.
- [ ] **Step 4: Checks finales.** Run: `npm test && npm run lint && npm run build`. Expected: código 0. Run: `grep -rn "eslint-disable" src/client/app src/client/design-system`. Expected: sin resultados.
- [ ] **Step 5: Commit y PR** con `git commit -m "feat(client): /_design showcase page"`, y abrir el PR `redesign/03-base-frontend` → `master` con las capturas.
