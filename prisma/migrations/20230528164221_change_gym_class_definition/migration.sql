-- DropForeignKey
ALTER TABLE "gymClass" DROP CONSTRAINT "gymClass_classTime_fkey";

-- CreateTable
CREATE TABLE "gymClassOnTimes" (
    "gymClassTimeId" INTEGER NOT NULL,
    "gymClassId" INTEGER NOT NULL,

    CONSTRAINT "gymClassOnTimes_pkey" PRIMARY KEY ("gymClassTimeId","gymClassId")
);

-- AddForeignKey
ALTER TABLE "gymClassOnTimes" ADD CONSTRAINT "gymClassOnTimes_gymClassTimeId_fkey" FOREIGN KEY ("gymClassTimeId") REFERENCES "gymClassTime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gymClassOnTimes" ADD CONSTRAINT "gymClassOnTimes_gymClassId_fkey" FOREIGN KEY ("gymClassId") REFERENCES "gymClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
