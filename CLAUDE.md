# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Gym management app (members, attendance, classes, body measures, equipment). Single repo holding a Fastify + Apollo GraphQL server, a React (Vite) client, and code shared between them.

## Commands

```bash
npm run dev-server     # nodemon + ts-node on src/server (port 8080), NODE_ENV=development
npm run dev-client     # Vite dev server; proxies /graphql to localhost:8080
npm run lint           # eslint (config: wesbos/typescript); lint:fix to autofix
npm run build          # tsc server -> build/, tsc + vite client -> dist/
npm run prisma         # prisma generate + migrate deploy + db seed
npm test               # vitest
```

Env vars: `DATABASE_URL`, `SECRET_KEY`, `NODE_ENV`, plus `POSTGRES_USER`/`POSTGRES_PASSWORD` for docker-compose. Nothing loads `.env` at runtime (no dotenv): Prisma CLI and docker-compose read it themselves, but for `dev-server` export it first (`set -a; source .env; set +a`). `SECRET_KEY` is required (≥ 32 chars after trim); the server refuses to start otherwise.

`DATABASE_URL` must use `?schema=app`: migration `20240228070527_add_equipment_tables` hardcodes `CREATE EXTENSION ... SCHEMA app`, and fails on any other schema.

Local DB only (docker-compose.yml is the production file; don't modify it — `postgres:latest` (18+) breaks its `/var/lib/postgresql/data` mount locally):
```bash
docker run -d --name be-strong-db --env-file .env -p 5432:5432 \
  -v be-strong-db-local:/var/lib/postgresql/data postgres:17
```

Production deploy: `scripts/start.sh` (`docker compose --env-file .env.production up --build -d --force-recreate app`). The container runs `start:prod`, which runs migrations + seed on every start.

## Architecture

- `src/server/index.ts` — Fastify app. Registers Apollo at `/graphql`, the JWT plugin (`plugins/auth.ts`, HS512, 2-day expiry, decorates `server.authenticate`), and in production serves `dist/` plus `index.html` for every route in `PATHS` (`src/common/enums.ts`). **A new client route must be added to `PATHS` or it 404s on refresh in production.**
- `src/server/apollo/` — schema built with `makeExecutableSchema` from `typeDefs/*Schema.ts` (SDL strings, one per domain) and `resolvers/<domain>/` (one file per operation, merged in each `index.ts`, then `mergeResolvers` in `resolvers/index.ts`). Auth is the `@auth` SDL directive, implemented in `directives/auth.ts` (wraps the resolver with `server.authenticate`).
- Resolver context (`apollo/context.ts`): `{ prisma, server, request, saltRounds }`. One shared `PrismaClient`; in dev it logs every query.
- `src/server/logic/measuresCalculator.ts` + `measuresTables/` — derived body-measure results (BMI, fat, water, muscle, calories), used by `addMeasure`/`updateMeasure` resolvers.
- `src/common/` — enums, models and utils imported by both server and client (`tsconfig.server.json` compiles `src/common` + `src/server`; client imports via `../common`).
- `src/client/` — React 18 + MUI + Apollo Client. GraphQL documents live in `queries/`, `mutations/`, `fragments/`; Apollo cache updates after mutations in `cacheHelpers/`. `GraphqlClient.tsx` attaches `authorization: bearer <jwt>` from the zustand `state/authState.ts` store (persisted). Pages under `pages/<route>/`, routes in `AppRoutes.tsx` keyed by `PATHS`.
- `prisma/schema.prisma` — Postgres models; `prisma/seed.js` runs on every prod start, so it must stay idempotent: it upserts the default owner user (`thomas`, role `admin`) and base `gymClassTime` rows, and backfills `birthDateAsString`.
