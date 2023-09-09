const gymClassSchema = `
 type GymClassOnTimes {
   gymClassTime: GymClassTime
 }

 type AttendanceList {
   gymClassTimeId: Int
   members: [Member]
 }

 type GymClass {
   id: Int
   classDate: String
   classDurationInMinutes: Int
   classType: String
   classDescription: String
   gymClassOnTimes: [GymClassOnTimes]
   attendanceList: [AttendanceList]
 }

 input AddClassInput {
    classDate: String
    classTimeIds: [Int]
    classDurationInMinutes: Int
    classType: String
    classDescription: String
 }

 type Mutation {
    addGymClass(input: AddClassInput): GymClass @auth
 }

 type Query {
    getGymClassesCount(year: Int): Int @auth
    getGymClasses(gte: String!, lt: String): [GymClass] @auth
 }
 `;

export default gymClassSchema;
