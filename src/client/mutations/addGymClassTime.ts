import { gql } from '@apollo/client';

const ADD_GYM_CLASS_TIME = gql`
  mutation addGymClassTime($localTime: LocalTime!) {
    addGymClassTime(localTime: $localTime) {
      id
      localTime
    }
  }
`;

export default ADD_GYM_CLASS_TIME;
