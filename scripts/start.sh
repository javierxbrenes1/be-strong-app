#!/bin/bash

docker compose --env-file .env.production up --build -d --force-recreate app
