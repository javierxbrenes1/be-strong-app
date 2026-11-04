FROM node:18-bullseye-slim as build

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV NODE_ENV "production"

COPY . .

# El cliente de Prisma necesita prisma/schema.prisma, que aún no existía durante npm install.
RUN npx prisma generate

RUN npm run build

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

