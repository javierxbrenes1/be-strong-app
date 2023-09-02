export default `
type GymClassTime {
    id: Int!
    isoTime: String!
  }
  
  type Query {
    gymClassTime(id: Int!): GymClassTime
    allGymClassTimes: [GymClassTime]
  }

  type Mutation {
    addGymClassTime(isoTime: String!): GymClassTime
  }
`;
