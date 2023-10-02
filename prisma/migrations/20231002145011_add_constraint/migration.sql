/*
  Warnings:

  - A unique constraint covering the columns `[isoTime]` on the table `gymClassTime` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gymClassTime_isoTime_key" ON "gymClassTime"("isoTime");
