/*
  Warnings:

  - Added the required column `gymClassTimeId` to the `memberAttendanceLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memberAttendanceLog" ADD COLUMN     "gymClassTimeId" INTEGER NOT NULL,
ALTER COLUMN "gymClassId" DROP DEFAULT;
DROP SEQUENCE "memberAttendanceLog_gymClassId_seq";

-- AddForeignKey
ALTER TABLE "memberAttendanceLog" ADD CONSTRAINT "memberAttendanceLog_gymClassTimeId_fkey" FOREIGN KEY ("gymClassTimeId") REFERENCES "gymClassTime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
