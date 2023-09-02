const gymClassSchema = `
 type GymClass {
   id: Int
   classDate: Date
   classDurationInMinutes: Int
   classType: String
   classDescription: String
   classTimes: [GymClassTime]
 }

 input AddClassInput {
    classDate: Date
    classTimeIds: [Int]
    classDurationInMinutes: Int
    classType: String
    classDescription: String
 }

 type Mutation {
    addGymClass(input: AddClassInput): GymClass
 }

 type Query {
    getGymClassesCount(year: Int): Int @auth
    getGymClasses(gte: Date!, lte: Date ): [GymClass] @auth
 }
 `;

export default gymClassSchema;
