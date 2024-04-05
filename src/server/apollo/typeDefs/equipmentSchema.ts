const EquipmentSchema = `
type Equipment {
    uuid: UUID
    description: String
    total: Float
    brand: String
    category: EquipmentCategory
}

type EquipmentCategory {
    uuid: UUID
    name: String
    equipment: [Equipment]
}

input UpsertEquipmentInput {
    uuid: UUID
    description: String
    total: Float
    brand: String
    equipmentCategoryUuid: UUID
}

input UpdateEquipmentInput {
    equipmentUuid: UUID
    description: String
    total: Float
    brand: String
}

type Mutation {
    addEquipmentCategory(name: String!, equipment: [UpsertEquipmentInput]): EquipmentCategory @auth
    updateEquipmentCategoryName(uuid: UUID!, name: String!): EquipmentCategory @auth
    upsertEquipment(input: UpsertEquipmentInput!): Equipment @auth
    updateEquipment(input: UpdateEquipmentInput!): Equipment @auth 
    deleteEquipment(equipmentUuid: UUID!): Equipment @auth
    deleteEquipmentCategory(categoryUuid: UUID!): EquipmentCategory @auth
}

type Query {
    getEquipmentCategories: [EquipmentCategory] @auth
    getEquipmentByCategory(categoryUuid: UUID!): [Equipment] @auth
}

`;

export default EquipmentSchema;
