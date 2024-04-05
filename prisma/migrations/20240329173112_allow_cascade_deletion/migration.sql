-- DropForeignKey
ALTER TABLE "equipment" DROP CONSTRAINT "equipment_equipmentCategoryUuid_fkey";

-- AddForeignKey
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_equipmentCategoryUuid_fkey" FOREIGN KEY ("equipmentCategoryUuid") REFERENCES "equipmentCategory"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
