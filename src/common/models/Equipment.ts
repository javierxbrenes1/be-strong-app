export interface EquipmentInput {
  description: string;
  total?: number;
  brand: string;
}
interface Equipment extends EquipmentInput {
  uuid: string;
}

export default Equipment;
