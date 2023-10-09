/*
  Warnings:

  - A unique constraint covering the columns `[memberCode,gymClassId,gymClassTimeId]` on the table `memberAttendanceLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "memberAttendanceLog_memberCode_gymClassId_gymClassTimeId_key" ON "memberAttendanceLog"("memberCode", "gymClassId", "gymClassTimeId");
