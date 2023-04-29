const gymClassSchema = `
 type GymClass {
   id: Int
   classDate: Date
   classTime: String
   classType: String
   classDescription: String
 }

 type Query {
    getGymClassesCount(year: Int): Int @auth
    getGymClasses(gte: Date!, lte: Date ): [GymClass] @auth
 }
 `;

export default gymClassSchema;
