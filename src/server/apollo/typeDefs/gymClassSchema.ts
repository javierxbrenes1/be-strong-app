const gymClassSchema = `
 type GymClass {
   id: Int
   classDate: Date
   classTime: String
   classType: String
   classDescription: String
 }

 type Query {
    getGymClassesCount(year: Int): Int
    getGymClasses(gte: Date!, lte: Date ): [GymClass]
 }
 `;

export default gymClassSchema;
