import { gql } from '@apollo/client';

export const CATALOGS_QUERY = gql`
  query catalogs {
    allGymClassTimes {
      id
      isoTime
    }
  }
`;
