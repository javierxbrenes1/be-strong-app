/*
  Warnings:

  - The `classTime` column on the `gymClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `preferredClassTime` column on the `member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "gymClass" DROP COLUMN "classTime",
ADD COLUMN     "classTime" INTEGER;

-- AlterTable
ALTER TABLE "member" DROP COLUMN "preferredClassTime",
ADD COLUMN     "preferredClassTime" INTEGER;

-- CreateTable
CREATE TABLE "gymClassTime" (
    "id" SERIAL NOT NULL,
    "time" VARCHAR(6) NOT NULL,
    "dayPeriod" VARCHAR(2) NOT NULL,

    CONSTRAINT "gymClassTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gymClass" ADD CONSTRAINT "gymClass_classTime_fkey" FOREIGN KEY ("classTime") REFERENCES "gymClassTime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_preferredClassTime_fkey" FOREIGN KEY ("preferredClassTime") REFERENCES "gymClassTime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
