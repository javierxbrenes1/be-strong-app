# Login, Perfil y Configuración: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar `/login`, `/profile` y `/config` con el tema Iron y corregir sus problemas de UX: error duplicado, botón deshabilitado sin explicación y texto copiado en Configuración (B9).

**Architecture:** Dos features nuevas: `features/auth/` (login, perfil y cambio de contraseña) y `features/config/` (horarios). Se reusan `AppSheet`, el diálogo de MUI y los campos de formulario del plan 3. Al final se borran `pages/login`, `pages/profile` y `pages/config`.

**Tech Stack:** React 18, MUI (tema Iron), Apollo Client 3 + codegen, react-hook-form + zod, zustand (`authState` existente), Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-03-04-pantallas-design.md` §4.2 · referencia visual del login: sección "Login" de `docs/preview/estilos.html` y `docs/preview/preview-login-iron-*.png`.

## Global Constraints

- Rama `redesign/04-2-login-perfil-config` desde `master` con el plan 4.1 integrado.
- Commits sin `Co-Authored-By` ni atribución a IA.
- Componentes y reglas de datos del plan 3. Sin colores hex ni emojis. Textos en español correcto.
- Login: logo `/images/logo.jpeg` en círculo con borde `primary`, franja superior negra con rayas diagonales amarillas sutiles (como en el preview) y card centrada de 380px como máximo. **Sin la ilustración actual** (`public/images/login.json` u otra).
- Reglas de contraseña (las de la UI actual, sin cambios): al menos 10 caracteres, al menos un número, al menos una mayúscula, al menos un carácter especial de `.!@#$%^&*`, y confirmación igual.
- Horarios: `LocalTime` `HH:mm` (plan 2), mostrados con `formatLocalTime`.
- 390, 768 y 1440px sin scroll horizontal.

## Review Focus

- Login con usuario o contraseña vacíos: el botón está habilitado y al enviar muestra "Requerido" en el campo vacío, sin llamar al servidor. Test en Task 1.
- Credenciales incorrectas: **un solo** mensaje "Usuario o contraseña incorrectos.", encima del botón; desaparece al editar un campo. Verificación en Task 1.
- Servidor caído durante el login: el mensaje es "No se pudo conectar. Intenta de nuevo.", no el error crudo. Verificación en Task 1.
- Horario duplicado en Configuración: el error se ve legible ("Ese horario ya existe."), y el diálogo sigue abierto. Verificación en Task 3.
- Contraseña con espacios al inicio o al final: se valida tal cual, sin `trim`, igual que hoy. Test en Task 2.

---

### Task 1: Login

**Files:**
- Create: `src/client/features/auth/api.ts` (`LoginDocument` = la mutation `ownerSignIn` actual de `mutations/login.ts`; `UpdatePwdDocument`; `WhoAmIDocument` con `username name email role lastPasswordChangeDate`)
- Create: `src/client/features/auth/schemas.ts` y `schemas.test.ts`
- Create: `src/client/features/auth/LoginPage.tsx`

**Interfaces:**
- Produces:
  - `loginSchema = z.object({ username: <requerido, trim>, pwd: <requerido, sin trim> })`.
  - `<LoginPage />`: al tener éxito, `useAuthStore.getState().setAuth(jwt)` y navegación a `PATHS.HOME`, igual que hoy.
- Errores: si el servidor responde sin `jwt` o con un error de credenciales → "Usuario o contraseña incorrectos."; si es un error de red → "No se pudo conectar. Intenta de nuevo.". Se muestran en un `Alert severity="error"` encima del botón y se limpian al cambiar un campo.

- [ ] **Step 1: Escribir el test que falla** (`schemas.test.ts`):
```ts
expect(loginSchema.safeParse({ username: '', pwd: 'x' }).error!.issues[0]).toMatchObject({ path: ['username'], message: 'Requerido' });
expect(loginSchema.safeParse({ username: 'thomas', pwd: '' }).error!.issues[0]).toMatchObject({ path: ['pwd'], message: 'Requerido' });
expect(loginSchema.parse({ username: ' thomas ', pwd: ' a ' })).toEqual({ username: 'thomas', pwd: ' a ' });
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- auth`. Expected: FAIL.
- [ ] **Step 3: Implementar el login.** La ruta `PATHS.LOGIN` apunta a la nueva página y queda **fuera** de `AppLayout` (sin rail ni barra inferior).
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright:
  1. El botón "Ingresar" está habilitado con los campos vacíos; al hacer clic aparece "Requerido" en ambos y no hay request `/graphql`.
  2. `thomas` / `mala` → un solo `role=alert` con el texto exacto.
  3. `thomas` / `BeStrongApp` → navega a `/`.
  4. Con el servidor detenido → "No se pudo conectar. Intenta de nuevo."
  5. Capturas `after/01-login-vacio.png`, `after/02-login-credenciales-invalidas.png` y `after/60-movil-login.png`, en claro. Forzando el modo oscuro en dev, también `after/01-login-vacio-dark.png`.
- [ ] **Step 5: Commit** con `git commit -m "feat(auth): redesigned login page"`.

### Task 2: Perfil y sheet de cambio de contraseña

**Files:**
- Create: `src/client/features/auth/passwordRules.ts` y `passwordRules.test.ts`
- Create: `src/client/features/auth/ProfilePage.tsx`
- Create: `src/client/features/auth/ChangePasswordSheet.tsx`

**Interfaces:**
- Produces:
  - `passwordRules(pwd: string, confirm: string): { id: 'length' | 'number' | 'upper' | 'special' | 'match'; label: string; ok: boolean }[]`, con estos labels exactos: "Al menos 10 caracteres.", "Tiene al menos un número.", "Tiene al menos una mayúscula.", "Tiene al menos un carácter especial (.!@#$%^&*).", "Contraseña confirmada.".
  - `<ProfilePage />`: card con Nombre, Usuario, Correo ("No definido" si no hay), Rol y "Último cambio de contraseña" (`formatInstant` o "Nunca"). Botón "Cambiar contraseña".
  - `<ChangePasswordSheet open onClose />`: campos Contraseña y Confirmar (con mostrar/ocultar), la lista de reglas con ícono check/cerrar según `ok` y la nota "Al actualizar la contraseña se cerrará la sesión." El botón Guardar se habilita solo si todas las reglas están en `ok`. Al tener éxito: toast, `reset()` de `authState` y navegación a `/login`, como hoy.

- [ ] **Step 1: Escribir el test que falla**:
```ts
const ok = (p: string, c: string) => Object.fromEntries(passwordRules(p, c).map(r => [r.id, r.ok]));
expect(ok('Abcdefghi1!', 'Abcdefghi1!')).toEqual({ length: true, number: true, upper: true, special: true, match: true });
expect(ok('abc', 'abd')).toEqual({ length: false, number: false, upper: false, special: false, match: false });
expect(ok(' Abcdefgh1!', 'Abcdefgh1!').match).toBe(false);
expect(passwordRules('', '')[0].label).toBe('Al menos 10 caracteres.');
```
- [ ] **Step 2: Correr y ver que falla.** Run: `npm test -- passwordRules`. Expected: FAIL.
- [ ] **Step 3: Implementar.** La lógica de reglas se toma de `pages/profile/UpdatePwd.tsx` y se convierte en `passwordRules`. La ruta `PATHS.PROFILE` apunta a la nueva página.
- [ ] **Step 4: Verificar.** Run: `npm test`. Expected: PASS. Con Playwright:
  1. `/profile` muestra los datos de `thomas`.
  2. "Cambiar contraseña" abre la sheet; al escribir, las reglas cambian a verde una por una.
  3. Escape con texto escrito pide confirmar el descarte.
  4. **No** guardar una contraseña real en local salvo que se restaure después.
  5. Capturas `after/53-perfil-usuario.png`, `after/54-perfil-actualizar-contrasena.png` y `after/68-movil-perfil.png`.
- [ ] **Step 5: Commit** con `git commit -m "feat(auth): profile page and change-password sheet"`.

### Task 3: Configuración (horarios)

**Files:**
- Create: `src/client/features/config/api.ts` (`GymClassTimesDocument` = `allGymClassTimes { id localTime }`; `AddGymClassTimeDocument(localTime)`)
- Create: `src/client/features/config/ConfigPage.tsx`
- Create: `src/client/features/config/AddTimeDialog.tsx`
- Modify: `src/client/state/catalogState.ts`. Si queda sin usos tras la spec 4, se borra en el plan 4.8. Aquí, la página nueva lee de la query tipada, no del store.

**Interfaces:**
- Produces:
  - `<ConfigPage />`: `PageHeader` "Configuración", card "Horarios de clase" con la descripción "Los horarios disponibles para asignar a las clases.", una lista ordenada con `compareLocalTime` y mostrada con `formatLocalTime`, y la acción "Agregar horario".
  - `<AddTimeDialog open onClose />`: `Dialog` corto, título "Agregar horario", texto "Agrega un horario disponible para las clases.", un `FormTimePicker` y los botones Cancelar / Agregar. Al tener éxito, `refetchQueries: [GymClassTimesDocument]`. Ante un error de unicidad de Prisma (`P2002`) o un mensaje que contenga "Unique", el error del campo es "Ese horario ya existe." y el diálogo sigue abierto.

- [ ] **Step 1: Implementar** y apuntar la ruta `PATHS.CONFIGURATIONS` a la página nueva.
- [ ] **Step 2: Verificar con Playwright.**
  1. Agregar 6:15 PM → aparece entre 5:30 PM y 7:00 PM.
  2. Agregarlo de nuevo → "Ese horario ya existe." y el diálogo sigue abierto.
  3. Escape cierra el diálogo.
  4. Capturas `after/50-configuracion-horarios-de-clase.png`, `after/52-configuracion-dialogo-nuevo-horario.png` y `after/67-movil-configuracion.png`.
- [ ] **Step 3: Borrar lo viejo y hacer los checks.** Delete: `src/client/pages/{login,profile,config}/`, y `mutations/login.ts` y `mutations/addGymClassTime.ts` si quedan sin usos (`grep`). Run: `npm test && npm run lint && npm run build`. Expected: código 0.
- [ ] **Step 4: Commit y PR** con `git commit -m "feat(config): redesigned gym times configuration"` y el PR `redesign/04-2-login-perfil-config` → `master`.
