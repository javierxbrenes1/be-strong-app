/*
  Warnings:

  - You are about to drop the column `dayPeriod` on the `gymClassTime` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `gymClassTime` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `gymClassTime` table. All the data in the column will be lost.
  - Added the required column `isoTime` to the `gymClassTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gymClassTime" DROP COLUMN "dayPeriod",
DROP COLUMN "time",
DROP COLUMN "value",
ADD COLUMN     "isoTime" VARCHAR(6) NOT NULL;
