/*
  Warnings:

  - Added the required column `corporalFatResult` to the `memberMeasures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberMeasures" ADD COLUMN     "corporalFatResult" VARCHAR(20) NOT NULL;
