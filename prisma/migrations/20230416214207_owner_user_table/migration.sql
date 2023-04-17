-- CreateTable
CREATE TABLE "ownerUser" (
    "username" VARCHAR(25) NOT NULL,
    "pwd" TEXT NOT NULL,
    "role" VARCHAR(16) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginDate" TIMESTAMP(3),
    "lastPasswordChangeDate" TIMESTAMP(3),
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ownerUser_pkey" PRIMARY KEY ("username")
);
