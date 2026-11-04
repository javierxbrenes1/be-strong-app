# Checklist de deploy: requisito de SECRET_KEY

Paso manual para el dueño. Se hace en el servidor de producción antes de desplegar la rama `redesign/01-seguridad`.

1. En el servidor de producción, este comando mide el valor tal como lo verá el servidor (sin las comillas que envuelven el valor y sin espacios al inicio o al final) e imprime un número **≥ 32**. Si no imprime nada, la variable no existe.

   ```sh
   awk '/^SECRET_KEY=/{v=$0; sub(/^SECRET_KEY=/,"",v); gsub(/^[ \t\r]+|[ \t\r]+$/,"",v); if (v ~ /^".*"$/ || v ~ /^\047.*\047$/) v=substr(v,2,length(v)-2); gsub(/^[ \t\r]+|[ \t\r]+$/,"",v); print length(v)}' .env.production
   ```
2. Si no cumple, generar una con `openssl rand -base64 48` y ponerla en `.env.production`. Hay que saber que los usuarios deberán iniciar sesión de nuevo.
3. Desplegar con `scripts/start.sh`. Luego `docker logs be_strong --tail 50` debe mostrar `Server listening`.
4. Probar el login en producción.
