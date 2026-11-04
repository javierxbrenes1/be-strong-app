import { graphql } from '../../gql';

export const LoginDocument = graphql(`
  mutation login($input: OwnerSignInInput) {
    ownerSignIn(input: $input) {
      jwt
    }
  }
`);

export const UpdatePwdDocument = graphql(`
  mutation updatePwd($pwd: String!) {
    updatePwd(pwd: $pwd)
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
