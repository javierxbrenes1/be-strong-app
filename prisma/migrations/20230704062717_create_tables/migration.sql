-- CreateTable
CREATE TABLE "gymClassTime" (
    "id" SERIAL NOT NULL,
    "time" VARCHAR(6) NOT NULL,
    "dayPeriod" VARCHAR(2) NOT NULL,

    CONSTRAINT "gymClassTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gymClass" (
    "id" SERIAL NOT NULL,
    "classDate" DATE,
    "classTime" INTEGER,
    "classType" VARCHAR(50),
    "classDescription" TEXT,

    CONSTRAINT "gymClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gymClassOnTimes" (
    "gymClassTimeId" INTEGER NOT NULL,
    "gymClassId" INTEGER NOT NULL,

    CONSTRAINT "gymClassOnTimes_pkey" PRIMARY KEY ("gymClassTimeId","gymClassId")
);

-- CreateTable
CREATE TABLE "member" (
    "code" VARCHAR(16) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "birthDate" DATE NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "genre" VARCHAR(10) NOT NULL,
    "phone" VARCHAR(10),
    "email" VARCHAR(150),
    "avatar" VARCHAR(150),
    "isActive" BOOLEAN,
    "observations" TEXT,
    "preferredClassTime" INTEGER,
    "createAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "modifyAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "memberAttendance" (
    "memberCode" VARCHAR(16) NOT NULL,
    "monday" BOOLEAN,
    "tuesday" BOOLEAN,
    "wednesday" BOOLEAN,
    "thursday" BOOLEAN,
    "friday" BOOLEAN,
    "saturday" BOOLEAN,
    "sunday" BOOLEAN,

    CONSTRAINT "memberAttendance_pkey" PRIMARY KEY ("memberCode")
);

-- CreateTable
CREATE TABLE "memberAttendanceLog" (
    "id" SERIAL NOT NULL,
    "memberCode" VARCHAR(16) NOT NULL,
    "gymClassId" SERIAL NOT NULL,

    CONSTRAINT "memberAttendanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberMeasures" (
    "id" SERIAL NOT NULL,
    "memberCode" VARCHAR(16) NOT NULL,
    "date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "corporalFat" DOUBLE PRECISION NOT NULL,
    "muscle" DOUBLE PRECISION NOT NULL,
    "bodyMassIndex" DOUBLE PRECISION NOT NULL,
    "corporalWaterPct" DOUBLE PRECISION NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "muscleResult" VARCHAR(20) NOT NULL,
    "corporalFatResult" VARCHAR(20) NOT NULL,
    "bodyMassIndexResult" VARCHAR(20) NOT NULL,
    "corporalWaterPctResult" VARCHAR(20) NOT NULL,
    "caloriesResult" VARCHAR(20) NOT NULL,

    CONSTRAINT "memberMeasures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "memberCode" VARCHAR(16) NOT NULL,
    "pwd" TEXT NOT NULL,
    "role" VARCHAR(16) NOT NULL,
    "lastLoginDate" TIMESTAMP(6),
    "lastPasswordChangeDate" TIMESTAMP(6),
    "isBlocked" BOOLEAN,

    CONSTRAINT "user_pkey" PRIMARY KEY ("memberCode")
);

-- CreateTable
CREATE TABLE "ownerUser" (
    "username" VARCHAR(25) NOT NULL,
    "name" VARCHAR(100) NOT NULL DEFAULT '',
    "email" VARCHAR(100) NOT NULL DEFAULT '',
    "pwd" TEXT NOT NULL,
    "role" VARCHAR(16) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginDate" TIMESTAMP(3),
    "lastPasswordChangeDate" TIMESTAMP(3),
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ownerUser_pkey" PRIMARY KEY ("username")
);

-- AddForeignKey
ALTER TABLE "gymClassOnTimes" ADD CONSTRAINT "gymClassOnTimes_gymClassTimeId_fkey" FOREIGN KEY ("gymClassTimeId") REFERENCES "gymClassTime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gymClassOnTimes" ADD CONSTRAINT "gymClassOnTimes_gymClassId_fkey" FOREIGN KEY ("gymClassId") REFERENCES "gymClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_preferredClassTime_fkey" FOREIGN KEY ("preferredClassTime") REFERENCES "gymClassTime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memberAttendance" ADD CONSTRAINT "memberAttendance_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "member"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memberAttendanceLog" ADD CONSTRAINT "memberAttendanceLog_gymClassId_fkey" FOREIGN KEY ("gymClassId") REFERENCES "gymClass"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memberAttendanceLog" ADD CONSTRAINT "memberAttendanceLog_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "member"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "memberMeasures" ADD CONSTRAINT "memberMeasures_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "member"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "member"("code") ON DELETE NO ACTION ON UPDATE NO ACTION;
