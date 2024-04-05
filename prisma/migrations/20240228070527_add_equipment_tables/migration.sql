-- CreateTable
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA app;

CREATE TABLE "equipmentCategory" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "equipmentCategory_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "equipment" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "brand" VARCHAR(25),
    "equipmentCategoryUuid" UUID NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_equipmentCategoryUuid_fkey" FOREIGN KEY ("equipmentCategoryUuid") REFERENCES "equipmentCategory"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
