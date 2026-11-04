-- Reporte previo a la migración 20261104000000_dates_local_types.
-- Correr ANTES de migrar, sobre la copia de producción (plan 02, Task 7).
SELECT code, name, "birthDate"::text AS birth_date, left("birthDateAsString",10) AS birth_date_as_string
FROM app.member
WHERE "birthDateAsString" IS NOT NULL AND "birthDate"::text <> left("birthDateAsString",10)
ORDER BY name;
SELECT count(*) FILTER (WHERE "birthDateAsString" IS NULL AND "birthDate" IS NOT NULL) AS solo_birthdate,
       count(*) FILTER (WHERE "birthDateAsString" IS NOT NULL) AS con_string,
       count(*) AS total FROM app.member;
SELECT id, "isoTime", to_char((substring("isoTime" from 2 for 8))::time - interval '6 hours', 'HH24:MI') AS local_time
FROM app."gymClassTime" ORDER BY 3;
