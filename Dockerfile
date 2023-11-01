FROM node:18-bullseye-slim as build

WORKDIR /app

ENV DATABASE_URL "postgresql://postgres:admin@172.18.0.2:5432/be-strong?schema=app"
ENV SECRET_KEY "bestrong_app_cipreses_oreamuno"

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-client

RUN npm run build-server

FROM node:18-bullseye-slim

ENV NODE_ENV "production"

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=build /app/build ./build
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 8080

CMD ["npm", "run", "start:prod"]

