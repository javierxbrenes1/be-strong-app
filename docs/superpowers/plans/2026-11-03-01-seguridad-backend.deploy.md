# Checklist de deploy: requisito de SECRET_KEY

Paso manual para el dueño. Se hace en el servidor de producción antes de desplegar la rama `redesign/01-seguridad`.

1. En el servidor de producción, `awk -F= '/^SECRET_KEY=/{print length($2)}' .env.production` imprime un número **≥ 32**. Si no imprime nada, la variable no existe.
2. Si no cumple, generar una con `openssl rand -base64 48` y ponerla en `.env.production`. Hay que saber que los usuarios deberán iniciar sesión de nuevo.
3. Desplegar con `scripts/start.sh`. Luego `docker logs be_strong --tail 50` debe mostrar `Server listening`.
4. Probar el login en producción.
