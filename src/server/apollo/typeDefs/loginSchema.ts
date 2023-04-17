const loginSchema = `
input OwnerSignUpInput {
    username: String!
    pwd: String!
    role: String!
}

input OwnerSignInInput {
    username: String!
    pwd: String!
}

type OwnerSignInResponse {
    jwt: String
}

type Mutation {
    ownerSignUp(input: OwnerSignUpInput): Boolean
    ownerSignIn(input: OwnerSignInInput): OwnerSignInResponse
}
`;

export default loginSchema;
