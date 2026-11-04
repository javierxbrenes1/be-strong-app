# Seguridad del backend: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cerrar el registro público de admins, exigir un `SECRET_KEY` real y acotar `getFilteredMembers` a una columna y operadores permitidos.

**Architecture:** Cambios pequeños en el servidor Fastify + Apollo. La validación de `SECRET_KEY` y la del filtro se extraen a funciones puras con tests de Vitest. Este plan instala Vitest, que es la primera suite del repo y que el plan 2 reutiliza.

**Tech Stack:** Node 18, TypeScript, Fastify 4, Apollo Server 4, `@fastify/jwt`, Prisma 5, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-03-01-seguridad-backend-design.md` (y el roadmap `…-00-roadmap-redesign.md`).

## Global Constraints

- Rama `redesign/01-seguridad` desde `master`. Un PR al final.
- Commits sin trailer `Co-Authored-By` ni atribución a IA.
- No modificar `docker-compose.yml`.
- `SECRET_KEY` debe medir **≥ 32 caracteres**. Si no, el servidor **no arranca**.
- `getFilteredMembers`: solo `column ∈ {name}` y `comparator ∈ {startsWith, contains}`. Cualquier otro valor da error GraphQL con `extensions.code = 'BAD_USER_INPUT'`.
- No tocar `/visit` ni sus resolvers públicos (`getVisitMember`, `getMemberAttendanceLogByYear` y `getMemberAttendanceLogsDetails`).
- Para levantar el servidor local: `set -a; source .env; set +a; npm run dev-server` (puerto 8080). BD local según `CLAUDE.md`.

## Review Focus

- `SECRET_KEY` con espacios alrededor (`"  abc…  "`): se valida la longitud **después** de `trim()` y se usa el valor recortado. Test en Task 1.
- `SECRET_KEY` definido pero vacío (`""`): debe fallar igual que si no existiera. Test en Task 1.
- `getFilteredMembers` con `column` o `comparator` omitidos (`null`/`undefined`): `BAD_USER_INPUT`, no un crash de Prisma. Test en Task 3.
- `getFilteredMembers` con `filter` vacío: se mantiene el comportamiento actual (el cliente solo busca con ≥ 3 caracteres). No se agrega lógica.
- Un deploy con `.env.production` sin `SECRET_KEY` válido dejaría producción caída: Task 4 tiene el chequeo manual previo.

---

### Task 1: Vitest y `SECRET_KEY` obligatorio

**Files:**
- Modify: `package.json` (devDependency `vitest`; script `"test": "vitest run"`)
- Create: `vitest.config.ts`
- Modify: `tsconfig.server.json` (agregar `"exclude": ["src/client", "**/*.test.ts"]`)
- Create: `src/server/plugins/secretKey.ts`
- Create: `src/server/plugins/secretKey.test.ts`
- Modify: `src/server/plugins/auth.ts`
- Modify: `CLAUDE.md` (sección Env vars)

**Interfaces:**
- Produces: `getSecretKey(env?: NodeJS.ProcessEnv): string`, que lanza `Error` cuyo mensaje contiene `SECRET_KEY`. Produces: `npm test` (Vitest, `src/**/*.test.ts`, entorno `node`), que reutilizan los planes siguientes.

- [ ] **Step 1: Instalar Vitest y configurarlo**

`npm i -D vitest`. Si su instalación choca con `vite@4`, usar `vitest@0.34`. `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
export default defineConfig({ test: { include: ['src/**/*.test.ts'], environment: 'node' } });
```
Agregar `"test": "vitest run"` a `scripts` y excluir `**/*.test.ts` en `tsconfig.server.json`.

- [ ] **Step 2: Escribir el test que falla** (`src/server/plugins/secretKey.test.ts`)

```ts
import { describe, it, expect } from 'vitest';
import { getSecretKey } from './secretKey';

const k32 = 'x'.repeat(32);
describe('getSecretKey', () => {
  it('devuelve la clave cuando mide 32 o más', () => expect(getSecretKey({ SECRET_KEY: k32 })).toBe(k32));
  it('recorta espacios', () => expect(getSecretKey({ SECRET_KEY: `  ${k32}  ` })).toBe(k32));
  it('falla si falta', () => expect(() => getSecretKey({})).toThrow(/SECRET_KEY/));
  it('falla si está vacía', () => expect(() => getSecretKey({ SECRET_KEY: '' })).toThrow(/SECRET_KEY/));
  it('falla con 31 caracteres', () => expect(() => getSecretKey({ SECRET_KEY: 'x'.repeat(31) })).toThrow(/SECRET_KEY/));
  it('falla con 31 caracteres más espacios', () => expect(() => getSecretKey({ SECRET_KEY: ` ${'x'.repeat(31)} ` })).toThrow(/SECRET_KEY/));
});
```

- [ ] **Step 3: Correr y ver que falla**

Run: `npm test`
Expected: FAIL (`Cannot find module './secretKey'` o similar).

- [ ] **Step 4: Implementar `getSecretKey(env = process.env): string` en `src/server/plugins/secretKey.ts`**

Hace `trim()`. Si mide menos de 32, lanza `new Error('SECRET_KEY is missing or shorter than 32 characters')`.

- [ ] **Step 5: Usarla en `auth.ts`**

En `registerAuth`, reemplazar `process.env.SECRET_KEY || 'supersecret'` por `getSecretKey()`. Debe quedar **sin** el fallback `'supersecret'` y sin el `eslint-disable` de esa línea.

- [ ] **Step 6: Correr tests y verificar el arranque**

Run: `npm test`. Expected: 6 tests PASS.
Run: `SECRET_KEY= npx ts-node src/server/index.ts` (con `DATABASE_URL` exportado). Expected: el proceso termina con código 1 y el log contiene `SECRET_KEY`.
Run: `set -a; source .env; set +a; npm run dev-server`. Expected: `Server listening at http://0.0.0.0:8080`.

- [ ] **Step 7: Documentar en `CLAUDE.md`**

En la línea de Env vars, reemplazar "Without `SECRET_KEY`, JWTs are signed with the fallback `'supersecret'`" por "`SECRET_KEY` is required (≥ 32 chars after trim); the server refuses to start otherwise." Agregar `npm test  # vitest` al bloque de comandos y quitar "There is no test suite."

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts tsconfig.server.json src/server/plugins CLAUDE.md
git commit -m "feat(server): require SECRET_KEY >= 32 chars and add vitest"
```

### Task 2: Eliminar `ownerSignUp` y el middleware muerto

**Files:**
- Modify: `src/server/apollo/typeDefs/loginSchema.ts` (quitar `input OwnerSignUpInput` y la mutation `ownerSignUp`)
- Modify: `src/server/apollo/resolvers/login/index.ts` (quitar import y entrada)
- Delete: `src/server/apollo/resolvers/login/ownerSignUp.ts`
- Delete: `src/server/apollo/middlewares/authUser.ts` (y la carpeta si queda vacía)

**Interfaces:**
- Consumes: nada. Produces: el schema GraphQL ya no tiene `ownerSignUp`.

- [ ] **Step 1: Confirmar que no hay usos**

Run: `grep -rn "ownerSignUp\|OwnerSignUpInput\|authUser" src`
Expected: solo aparecen los 4 archivos listados arriba.

- [ ] **Step 2: Borrar y editar los archivos listados**

- [ ] **Step 3: Verificar**

Run: `npx tsc -p tsconfig.server.json --noEmit`. Expected: sin errores.
Con el servidor levantado:
```bash
curl -s -X POST localhost:8080/graphql -H 'content-type: application/json' \
  -d '{"query":"mutation{ownerSignUp(input:{username:\"x\",pwd:\"x\",role:\"admin\"})}"}'
```
Expected: JSON con `errors[0].message` que contiene `Cannot query field "ownerSignUp"` y `extensions.code` = `GRAPHQL_VALIDATION_FAILED`.
Run: `curl … '{"query":"mutation{ownerSignIn(input:{username:\"thomas\",pwd:\"BeStrongApp\"}){jwt}}"}'`. Expected: devuelve un `jwt` (el login sigue funcionando).

- [ ] **Step 4: Commit**

```bash
git add -A src/server/apollo
git commit -m "fix(server): remove public ownerSignUp mutation and dead auth middleware"
```

### Task 3: Acotar `getFilteredMembers`

**Files:**
- Create: `src/server/apollo/resolvers/member/memberFilter.ts`
- Create: `src/server/apollo/resolvers/member/memberFilter.test.ts`
- Modify: `src/server/apollo/resolvers/member/getFilteredMembers.ts`

**Interfaces:**
- Produces: `parseMemberFilter(column: unknown, comparator: unknown): { column: 'name'; comparator: 'startsWith' | 'contains' }`, que lanza `GraphQLError` (de `graphql`) con `extensions: { code: 'BAD_USER_INPUT' }`.

- [ ] **Step 1: Escribir el test que falla**

```ts
import { describe, it, expect } from 'vitest';
import { GraphQLError } from 'graphql';
import { parseMemberFilter } from './memberFilter';

describe('parseMemberFilter', () => {
  it('acepta name/startsWith', () => expect(parseMemberFilter('name', 'startsWith')).toEqual({ column: 'name', comparator: 'startsWith' }));
  it('acepta name/contains', () => expect(parseMemberFilter('name', 'contains')).toEqual({ column: 'name', comparator: 'contains' }));
  for (const [col, cmp] of [['pwd', 'equals'], ['code', 'startsWith'], ['name', 'equals'], [undefined, 'startsWith'], ['name', null]]) {
    it(`rechaza ${String(col)}/${String(cmp)}`, () => {
      try { parseMemberFilter(col, cmp); throw new Error('no lanzó'); }
      catch (e) { expect(e).toBeInstanceOf(GraphQLError); expect((e as GraphQLError).extensions.code).toBe('BAD_USER_INPUT'); }
    });
  }
});
```

- [ ] **Step 2: Correr y ver que falla**

Run: `npm test -- memberFilter`. Expected: FAIL (módulo inexistente).

- [ ] **Step 3: Implementar `parseMemberFilter` y usarlo en `getFilteredMembers.ts`**

El resolver llama a `parseMemberFilter(args.column, args.comparator)` antes de armar el `where` y usa el resultado (no los args crudos). Se mantiene `isActive: true` y `mode: 'insensitive'`. La firma del SDL **no cambia**.

- [ ] **Step 4: Correr tests y verificar en vivo**

Run: `npm test`. Expected: todos PASS.
Con un token (`TOKEN=$(curl … ownerSignIn … | jq -r .data.ownerSignIn.jwt)`):
- `{"query":"{getFilteredMembers(column:\"pwd\",comparator:\"equals\",filter:\"x\"){code}}"}` con `authorization: bearer $TOKEN` → `errors[0].extensions.code == "BAD_USER_INPUT"`.
- `{"query":"{getFilteredMembers(column:\"name\",comparator:\"startsWith\",filter:\"Car\"){name}}"}` → `data.getFilteredMembers` es un arreglo, sin `errors`.

- [ ] **Step 5: Commit**

```bash
git add src/server/apollo/resolvers/member
git commit -m "fix(server): whitelist getFilteredMembers column and comparator"
```

### Task 4: Verificación integral y checklist de deploy

**Files:**
- Create: `docs/superpowers/plans/2026-11-03-01-seguridad-backend.deploy.md` (checklist de deploy)

- [ ] **Step 1: Lint y build**

Run: `npm run lint && npm run build`. Expected: ambos terminan con código 0. Si el lint ya fallaba en `master` por archivos que este plan no tocó, se anota en el PR y no se arregla aquí.

- [ ] **Step 2: Regresión en la UI con Playwright**

Con `npm run dev-server` y `npm run dev-client`: login `thomas` / `BeStrongApp` en `http://localhost:5173/login` → se llega a `/`. En `/members`, escribir "Car" en "Buscar Miembro" → aparece al menos un resultado (si hay datos locales) o la lista vacía, sin error en la consola.

- [ ] **Step 3: Escribir el checklist de deploy** (para el dueño, paso manual)

Contenido:
1. En el servidor de producción, `awk -F= '/^SECRET_KEY=/{print length($2)}' .env.production` imprime un número **≥ 32** (si no imprime nada, la variable no existe).
2. Si no: generar con `openssl rand -base64 48`, ponerlo en `.env.production` y saber que los usuarios deberán iniciar sesión de nuevo.
3. Desplegar con `scripts/start.sh`. Luego `docker logs be_strong --tail 50` debe mostrar `Server listening`.
4. Probar el login en producción.

- [ ] **Step 4: Commit y PR**

```bash
git add docs/superpowers/plans/2026-11-03-01-seguridad-backend.deploy.md
git commit -m "docs: deploy checklist for SECRET_KEY requirement"
```
Abrir un PR `redesign/01-seguridad` → `master` con el resumen y el checklist enlazado.
