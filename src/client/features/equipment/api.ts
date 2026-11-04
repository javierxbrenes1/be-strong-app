import { graphql } from '../../gql';

export const EquipmentCategoriesDocument = graphql(`
  query EquipmentCategories {
    getEquipmentCategories {
      uuid
      name
      equipment {
        uuid
        description
        brand
        total
      }
    }
  }
`);

export const AddEquipmentCategoryDocument = graphql(`
  mutation AddEquipmentCategory(
    $name: String!
    $equipment: [UpsertEquipmentInput]
  ) {
    addEquipmentCategory(name: $name, equipment: $equipment) {
      uuid
      name
    }
  }
`);

export const UpdateEquipmentCategoryNameDocument = graphql(`
  mutation UpdateEquipmentCategoryName($uuid: UUID!, $name: String!) {
    updateEquipmentCategoryName(uuid: $uuid, name: $name) {
      uuid
      name
    }
  }
`);

export const UpsertEquipmentDocument = graphql(`
  mutation UpsertEquipment($input: UpsertEquipmentInput!) {
    upsertEquipment(input: $input) {
      uuid
      description
      brand
      total
    }
  }
`);

export const DeleteEquipmentDocument = graphql(`
  mutation DeleteEquipment($equipmentUuid: UUID!) {
    deleteEquipment(equipmentUuid: $equipmentUuid) {
      uuid
    }
  }
`);

export const DeleteEquipmentCategoryDocument = graphql(`
  mutation DeleteEquipmentCategory($categoryUuid: UUID!) {
    deleteEquipmentCategory(categoryUuid: $categoryUuid) {
      uuid
      name
    }
  }
`);

export type Equipment = {
  uuid: string;
  description: string;
  brand: string;
  total: number;
};

export type Category = { uuid: string; name: string; equipment: Equipment[] };
