# Spec 1: Seguridad del backend

**Fecha:** 2026-11-03 · **Roadmap:** [00](./2026-11-03-00-roadmap-redesign.md) · **Tamaño:** pequeño (un plan)

## Intención

Cerrar los agujeros que permiten a un tercero **crear un usuario admin** o **firmar tokens válidos**. El único usuario real (`thomas`) ya existe en producción, así que cerrar el registro no afecta a nadie.

## Hallazgos que resuelve (de `docs/ARQUITECTURA.md` §6)

| Id | Problema | Archivo |
|---|---|---|
| S1 | La mutation `ownerSignUp` es **pública**: cualquiera puede crear un admin con un POST a `/graphql`. Se verificó en local. | `src/server/apollo/typeDefs/loginSchema.ts`, `src/server/apollo/resolvers/login/ownerSignUp.ts` |
| S4 | Si falta `SECRET_KEY`, los JWT se firman con `'supersecret'`. | `src/server/plugins/auth.ts` |
| S6 | `getFilteredMembers(column, comparator, filter)` arma un `where` de Prisma con **columna y operador arbitrarios** enviados por el cliente. | `src/server/apollo/resolvers/member/getFilteredMembers.ts` |

## Requisitos

1. **`ownerSignUp`**: se elimina la mutation del SDL y del resolver map, y se borra el archivo del resolver. Ningún código cliente la usa (verificar con `grep -rn ownerSignUp src/client`). Si en el futuro hace falta crear usuarios, se hará con un script o el seed, no por la API pública.
2. **`SECRET_KEY`**: el servidor **no arranca** si `SECRET_KEY` no está definido o mide menos de 32 caracteres. En ese caso lanza un error claro en el arranque (`index.ts`/`auth.ts`) y elimina el fallback `'supersecret'`. Hay que actualizar `.env` local (el valor actual `change-me-to-a-long-random-string` tiene 33 caracteres y es válido) y documentar el requisito en `CLAUDE.md`.
   - ⚠️ **Antes de desplegar, verificar que `.env.production` tiene `SECRET_KEY` con 32 caracteres o más.** Si no los tiene, el contenedor no arrancará. El plan debe incluir este chequeo como paso manual explícito para el dueño.
   - Si `SECRET_KEY` cambia, los tokens vigentes quedan inválidos y el usuario tendrá que iniciar sesión de nuevo. Es aceptable.
3. **`getFilteredMembers`**: el resolver acepta solo `column ∈ {name}` y `comparator ∈ {startsWith, contains}`. Cualquier otro valor devuelve un error GraphQL `BAD_USER_INPUT`. Se mantiene la firma del SDL para no romper el cliente actual, que usa `column: 'name', comparator: 'startsWith'`.
4. **Código muerto de auth**: se elimina `src/server/apollo/middlewares/authUser.ts` (no se usa; `grep` para confirmarlo).

## Fuera de alcance

- `/visit` y los resolvers públicos que usa (`getVisitMember`, `getMemberAttendanceLogByYear` y `getMemberAttendanceLogsDetails`). **Siguen públicos por decisión del dueño.**
- Mover el JWT de `localStorage` a cookies, agregar refresh tokens o rate limiting.
- La contraseña del seed que no cumple las reglas de la UI (S7). No se toca: el seed solo crea a `thomas` si no existe.

## Verificación ("terminado")

- `curl -X POST localhost:8080/graphql -H 'content-type: application/json' -d '{"query":"mutation{ownerSignUp(input:{username:\"x\",pwd:\"x\",role:\"admin\"})}"}'` responde con un error de validación GraphQL (la mutation no existe).
- `SECRET_KEY= npm run dev-server` falla al arrancar con un mensaje que menciona `SECRET_KEY`.
- `getFilteredMembers(column:"pwd", comparator:"equals", filter:"x")` (con un token válido) devuelve `BAD_USER_INPUT`, y `getFilteredMembers(column:"name", comparator:"startsWith", filter:"Car")` sigue funcionando.
- Con Playwright: login con `thomas` y la búsqueda de miembros funcionan igual que antes.
- `npm run lint` y `npm run build` pasan.

## Nota de limpieza local (no es parte del código)

Durante la inspección se creó el usuario `demo` en la BD **local** con `ownerSignUp`. El dueño lo borra manualmente; no hay que hacer nada en producción.
