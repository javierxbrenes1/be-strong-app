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

input AddEquipmentInput {
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
    addEquipmentCategory(name: String!): EquipmentCategory @auth
    addEquipment(input: AddEquipmentInput!): Equipment @auth
    updateEquipment(input: UpdateEquipmentInput!): Equipment @auth 
    deleteEquipment(equipmentUuid: UUID!): Boolean @auth
    deleteEquipmentCategory(categoryUuid: UUID!): Boolean @auth
}

type Query {
    getEquipmentCategories: [EquipmentCategory] @auth
    getEquipmentByCategory(categoryUuid: UUID!): [Equipment] @auth
}

`;

export default EquipmentSchema;
