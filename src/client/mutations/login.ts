import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: OwnerSignInInput) {
    ownerSignIn(input: $input) {
      jwt
    }
  }
`;

export const UPDATE_PWD = gql`
  mutation updatePwd($pwd: String!) {
    updatePwd(pwd: $pwd)
  }
`;
