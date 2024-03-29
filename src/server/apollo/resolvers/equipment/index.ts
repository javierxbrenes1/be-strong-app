import addEquipment from './addEquipment';
import addEquipmentCategory from './addEquipmentCategory';
import deleteEquipment from './deleteEquipment';
import deleteEquipmentCategory from './deleteEquipmentCategory';
import getEquipmentCategories from './getEquipmentCategories';
import getEquipmentByCategory from './getEquipmentByCategory';

const equipmentResolvers = {
  Query: {
    getEquipmentCategories,
    getEquipmentByCategory,
  },
  Mutation: {
    addEquipment,
    addEquipmentCategory,
    deleteEquipment,
    deleteEquipmentCategory,
  },
};

export default equipmentResolvers;
