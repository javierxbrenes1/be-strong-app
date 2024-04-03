import upsertEquipment from './upsertEquipment';
import addEquipmentCategory from './addEquipmentCategory';
import deleteEquipment from './deleteEquipment';
import deleteEquipmentCategory from './deleteEquipmentCategory';
import getEquipmentCategories from './getEquipmentCategories';
import getEquipmentByCategory from './getEquipmentByCategory';
import updateEquipmentCategoryName from './updateEquipmentCategoryName';

const equipmentResolvers = {
  Query: {
    getEquipmentCategories,
    getEquipmentByCategory,
  },
  Mutation: {
    upsertEquipment,
    addEquipmentCategory,
    deleteEquipment,
    deleteEquipmentCategory,
    updateEquipmentCategoryName,
  },
};

export default equipmentResolvers;
