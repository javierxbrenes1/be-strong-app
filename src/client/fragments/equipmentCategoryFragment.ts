import { gql } from '@apollo/client';

export const EQUIPMENT_ALL = gql`
  fragment equipmentAllFields on Equipment {
    uuid
    description
    total
    brand
  }
`;

export const EQUIPMENT_CATEGORY_ALL = gql`
  fragment equipmentCategoryAllFields on EquipmentCategory {
    uuid
    name
    equipment {
      ...equipmentAllFields
    }
  }
  ${EQUIPMENT_ALL}
`;
