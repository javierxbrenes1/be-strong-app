import { gql } from '@apollo/client';

const ADD_GYM_CLASS_TIME = gql`
  mutation addGymClassTime($isoTime: String!) {
    addGymClassTime(isoTime: $isoTime) {
      id
      isoTime
    }
  }
`;

export default ADD_GYM_CLASS_TIME;
