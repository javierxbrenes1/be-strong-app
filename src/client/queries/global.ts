import { gql } from '@apollo/client';

export const WHO_AM_I = gql`
  query whoAmI {
    whoAmI {
      username
      role
      email
      isBlocked
      lastPasswordChangeDate
      name
    }
  }
`;
