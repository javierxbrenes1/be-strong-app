import Equipment from './Equipment';

interface EquipmentCategory {
  uuid: string;
  name: string;
  equipmentTotals: number;
  equipment: Equipment[];
}

export default EquipmentCategory;
