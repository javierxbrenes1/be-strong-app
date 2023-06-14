import { gql } from '@apollo/client';

export const GYM_CLASS_TIME_ALL_FIELDS = gql`
  fragment gymClassTimeAllFields on GymClassTime {
    dayPeriod
    id
    time
  }
`;
