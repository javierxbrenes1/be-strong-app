import { graphql } from '../../gql';

export const LoginDocument = graphql(`
  mutation login($input: OwnerSignInInput) {
    ownerSignIn(input: $input) {
      jwt
    }
  }
`);

export const UpdatePwdDocument = graphql(`
  mutation updatePwd($currentPwd: String!, $pwd: String!) {
    updatePwd(currentPwd: $currentPwd, pwd: $pwd)
  }
`);

export const WhoAmIDocument = graphql(`
  query whoAmIProfile {
    whoAmI {
      username
      name
      email
      role
      lastPasswordChangeDate
    }
  }
`);
