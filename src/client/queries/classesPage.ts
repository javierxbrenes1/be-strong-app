import { gql } from '@apollo/client';

export const GET_CLASSES_BY_DATE = gql`
  query getGymClasses($gte: Date!) {
    getGymClasses(gte: $gte) {
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
