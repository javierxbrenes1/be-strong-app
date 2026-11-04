export default `
type GymClassTime {
    id: Int!
    localTime: LocalTime!
  }
  
  type Query {
    gymClassTime(id: Int!): GymClassTime
    allGymClassTimes: [GymClassTime]
  }

  type Mutation {
    addGymClassTime(localTime: LocalTime!): GymClassTime
  }
`;
