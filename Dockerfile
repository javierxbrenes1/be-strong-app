FROM node:18-bullseye-slim as build

WORDIR /app

ARG VITE_GRAPHQL_URL
