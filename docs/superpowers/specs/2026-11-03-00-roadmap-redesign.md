# Roadmap: rediseño y saneamiento de Be Strong App

**Fecha:** 2026-11-03 · **Estado:** propuesto, pendiente de aprobación

## Intención

Be Strong es la app interna de un gimnasio. El dueño (usuario `thomas`, rol admin, ya existe en producción) la usa en **celular, tablet y computadora** para administrar miembros, medidas corporales, clases y asistencias, y equipo. También comparte con cada miembro un link público (`/visit`) donde este ve su progreso.

Tenemos tres objetivos:

1. **Nuevo look & feel** con la dirección visual **"Iron"**: negro/grafito con amarillo eléctrico, los colores del logo. Incluye **modo claro, oscuro y sistema** y **sheets deslizables** para capturar información.
2. **Cerrar los bugs problemáticos.** El más importante es el de fechas, que aparecen con un día menos.
3. **Sanear el frontend React** ("spaghetti") mientras se migra cada pantalla, sin hacer una reescritura aparte "porque sí".

A futuro habrá una **app móvil para miembros**. No es parte de este trabajo, pero nada de lo que hagamos debe estorbarle: la lógica de negocio vive en la API GraphQL y no en el frontend web.

## Proyectos y orden

| # | Spec | Depende de | Resumen |
|---|---|---|---|
| 1 | [Seguridad del backend](./2026-11-03-01-seguridad-backend-design.md) | — | Cerrar `ownerSignUp`, exigir `SECRET_KEY` y acotar `getFilteredMembers`. |
| 2 | [Fechas de punta a punta](./2026-11-03-02-fechas-design.md) | 1 (recomendado) | Fechas de calendario como `YYYY-MM-DD` y horarios como `HH:mm` locales. Incluye migración de datos de producción con respaldo y ensayo. |
| 3 | [Base del nuevo frontend](./2026-11-03-03-base-frontend-design.md) | 2 | MUI actualizado, tema Iron claro/oscuro, layout responsive, componentes base (sheet, diálogo, avatar, métricas, tabla), tipos GraphQL generados y formularios validados. |
| 4 | [Migración de pantallas](./2026-11-03-04-pantallas-design.md) | 3 | Equipo → Login/Perfil/Config → Miembros → Clases → Detalle de miembro → Inicio "Hoy" → `/visit`. |

Las fechas van antes de las pantallas para no migrar cada pantalla dos veces. El proyecto 1 es independiente y pequeño, así que va primero.

**Decisión del diseñador:** cada plan se trabaja en su propia rama desde `master` (`redesign/<nn>-<tema>`) y se integra con un PR. Cada PR debe poder desplegarse solo; por eso la spec 3 oculta el modo oscuro hasta terminar la spec 4.

Cada spec genera **uno o más planes** en `docs/superpowers/plans/`. El proyecto 4 genera un plan por pantalla.

## Material de referencia (en el repo)

- `docs/ARQUITECTURA.md`: arquitectura actual, causa raíz del bug de fechas (§5), problemas numerados S1–S7 y B1–B10, y arquitectura objetivo (§7).
- `docs/DISENO.md`: inventario de pantallas con capturas y los problemas de UX numerados del 1 al 19.
- `docs/INSPIRACION.md`: investigación web, reglas de sheet / diálogo / página, paleta Iron con contrastes medidos y wireframes.
- `docs/preview/estilos.html`: **implementación de referencia** de tokens, componentes y sheets. Ábrelo en un navegador. Es la fuente de verdad visual.
- `docs/screenshots/`: 68 capturas del estado actual.
- `CLAUDE.md`: comandos, variables de entorno y cómo levantar la BD local.

## Restricciones globales

- **Stack:** se mantiene Fastify + Apollo Server + Prisma + Postgres en el servidor, y React + Vite + MUI + Apollo Client en el cliente. No cambiamos de framework.
- **Base de datos:** el schema `app` es obligatorio (`?schema=app`). `prisma/seed.js` corre en cada arranque de producción y debe ser idempotente.
- **Producción:** se despliega con `scripts/start.sh` (Docker Compose). El contenedor corre migraciones y seed al arrancar, así que **una migración entra a producción en el siguiente deploy**.
- **No modificar `docker-compose.yml`** (es el de producción).
- **Commits:** sin trailers `Co-Authored-By` ni atribución a IA.
- **Idioma de la UI:** español (Costa Rica), con ortografía correcta: "Categoría", "Cargar más", etc.
- **Zona horaria del gimnasio:** `America/Costa_Rica` (UTC-6, sin horario de verano).
- **Sin suite de tests hoy.** Cada spec indica qué tests mínimos agrega.

## Fuera de alcance (todo el roadmap)

- Cambiar el mecanismo del link `/visit`: sigue siendo `?code=<base64(código)>` y público.
- La app móvil para miembros, cuentas para miembros, roles adicionales y pagos.
- Migrar a React 19, Apollo Client 4, Vite 5+ o Node > 18, salvo que una dependencia lo exija. Si pasa, se documenta en el plan.
- Internacionalización.

## Cómo se ve "terminado" (todo el roadmap)

- Todas las pantallas usan el tema Iron. El selector Claro / Oscuro / Sistema funciona en toda la app y no queda ningún color hex fuera del tema.
- Las fechas de nacimiento, de clase y los horarios se muestran correctamente sin parches (`birthDateAsString` eliminado).
- Los bugs B1–B10 de `docs/ARQUITECTURA.md` están cerrados.
- Cada pantalla funciona en 390px, 768px y 1440px sin scroll horizontal.
- Nuevas capturas con Playwright en `docs/screenshots/after/` con los mismos nombres que las de "antes".
