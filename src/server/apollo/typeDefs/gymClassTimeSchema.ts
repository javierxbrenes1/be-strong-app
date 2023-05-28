export default `
type GymClassTime {
    id: Int!
    time: String!
    dayPeriod: String!
  }
  
  type Query {
    gymClassTime(id: Int!): GymClassTime
    allGymClassTimes: [GymClassTime]
  }

  type Mutation {
    addGymClassTime(time: String!, dayPeriod: String!): GymClassTime
  }
`;
