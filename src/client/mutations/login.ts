import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: OwnerSignInInput) {
    ownerSignIn(input: $input) {
      jwt
    }
  }
`;
