import Equipment, { EquipmentInput } from './Equipment';

export interface EquipmentCategoryInput {
  name: string;
  equipment?: EquipmentInput[];
}

interface EquipmentCategory {
  uuid: string;
  name: string;
  equipmentTotals: number;
  equipment: Equipment[];
}

export default EquipmentCategory;
