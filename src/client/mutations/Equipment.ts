import { gql } from '@apollo/client';
import {
  EQUIPMENT_CATEGORY_ALL,
  EQUIPMENT_ALL,
} from '../fragments/equipmentCategoryFragment';

export const ADD_EQUIPMENT_CATEGORY = gql`
  mutation addEquipmentCategory(
    $name: String!
    $equipment: [UpsertEquipmentInput]
  ) {
    addEquipmentCategory(name: $name, equipment: $equipment) {
      ...equipmentCategoryAllFields
    }
  }
  ${EQUIPMENT_CATEGORY_ALL}
`;

export const ADD_EQUIPMENT = gql`
  mutation upsertEquipment($input: UpsertEquipmentInput!) {
    upsertEquipment(input: $input) {
      ...equipmentAllFields
      category {
        uuid
        name
      }
    }
  }
  ${EQUIPMENT_ALL}
`;

export const DELETE_EQUIPMENT_CATEGORY = gql`
  mutation deleteEquipmentCategory($categoryUuid: UUID!) {
    deleteEquipmentCategory(categoryUuid: $categoryUuid) {
      uuid
      name
    }
  }
`;

export const DELETE_EQUIPMENT = gql`
  mutation deleteEquipment($equipmentUuid: UUID!) {
    deleteEquipment(equipmentUuid: $equipmentUuid) {
      uuid
    }
  }
`;

export const UPDATE_EQUIPMENT_CATEGORY_NAME = gql`
  mutation updateEquipmentCategoryName($uuid: UUID!, $name: String!) {
    updateEquipmentCategoryName(uuid: $uuid, name: $name) {
      uuid
      name
    }
  }
`;
