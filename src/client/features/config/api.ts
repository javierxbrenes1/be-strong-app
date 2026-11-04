import { graphql } from '../../gql';

export const GymClassTimesDocument = graphql(`
  query gymClassTimes {
    allGymClassTimes {
      id
      localTime
    }
  }
`);

export const AddGymClassTimeDocument = graphql(`
  mutation addGymClassTimeConfig($localTime: LocalTime!) {
    addGymClassTime(localTime: $localTime) {
      id
      localTime
    }
  }
`);
