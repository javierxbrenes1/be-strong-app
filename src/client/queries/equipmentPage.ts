import { gql } from '@apollo/client';
import { EQUIPMENT_CATEGORY_ALL } from '../fragments/equipmentCategoryFragment';

export const EQUIPMENT_QUERY = gql`
  query equipmentCategories {
    getEquipmentCategories {
      ...equipmentCategoryAllFields
    }
  }
  ${EQUIPMENT_CATEGORY_ALL}
`;
