-- gymClassTime: horario UTC 'T23:30:00.000Z' -> hora local del gimnasio 'HH:mm' (CR = UTC-6, sin horario de verano).
-- La resta sobre `time` da vuelta en 24 h: 01:00 - 6h = 19:00. Misma fórmula que isoTimeToLocalTime (src/common/dates.ts).
ALTER TABLE "gymClassTime" ADD COLUMN "localTime" VARCHAR(5);
UPDATE "gymClassTime"
  SET "localTime" = to_char((substring("isoTime" from 2 for 8))::time - interval '6 hours', 'HH24:MI');
ALTER TABLE "gymClassTime" ALTER COLUMN "localTime" SET NOT NULL;
CREATE UNIQUE INDEX "gymClassTime_localTime_key" ON "gymClassTime"("localTime");
DROP INDEX IF EXISTS "gymClassTime_isoTime_key";
ALTER TABLE "gymClassTime" DROP COLUMN "isoTime";

-- member: birthDateAsString es la fecha validada en la práctica; birthDate pasa a ser la única columna.
UPDATE "member"
  SET "birthDate" = left("birthDateAsString", 10)::date
  WHERE "birthDateAsString" IS NOT NULL;
ALTER TABLE "member" DROP COLUMN "birthDateAsString";
