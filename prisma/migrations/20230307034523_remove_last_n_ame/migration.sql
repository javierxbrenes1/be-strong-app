/*
  Warnings:

  - You are about to drop the column `lastName` on the `member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "member" DROP COLUMN "lastName",
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);
