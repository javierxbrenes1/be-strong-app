const gymClassSchema = `
 type GymClassOnTimes {
   gymClassTime: GymClassTime
 }

 type GymClass {
   id: Int
   classDate: Date
   classDurationInMinutes: Int
   classType: String
   classDescription: String
   gymClassOnTimes: [GymClassOnTimes]
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
    getGymClasses(gte: String!, lt: String): [GymClass] @auth
 }
 `;

export default gymClassSchema;
