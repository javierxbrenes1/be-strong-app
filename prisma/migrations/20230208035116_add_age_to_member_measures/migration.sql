/*
  Warnings:

  - Added the required column `age` to the `memberMeasures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberMeasures" ADD COLUMN     "age" INTEGER NOT NULL;
