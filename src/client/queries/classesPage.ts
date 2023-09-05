import { gql } from '@apollo/client';

export const GET_CLASSES_BY_DATE = gql`
  query getGymClasses($gte: String!, $lt: String!) {
    getGymClasses(gte: $gte, lt: $lt) {
      id
      classDate
      classDescription
      classDurationInMinutes
      classType
      gymClassOnTimes {
        gymClassTime {
          id
          isoTime
        }
      }
    }
  }
`;
