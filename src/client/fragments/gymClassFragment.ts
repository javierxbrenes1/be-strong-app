import { gql } from '@apollo/client';

export const GYM_CLASS_ALL_FIELDS = gql`
  fragment getGymClassAllFields on GymClass {
    id
    classDate
    classDescription
    classDurationInMinutes
    classType
    gymClassOnTimes {
      gymClassTime {
        id
        localTime
      }
    }
    attendanceList {
      gymClassTimeId
      members {
        avatar
        code
        name
      }
    }
  }
`;
