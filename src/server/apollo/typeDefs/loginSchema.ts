const loginSchema = `
type OwnerUser {
    username: String
    role: String
    isBlocked: Boolean
    lastPasswordChangeDate: Date
    email: String
    name: String
}

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

type Query {
    whoAmI: OwnerUser @auth
}

type Mutation {
    ownerSignUp(input: OwnerSignUpInput): Boolean
    ownerSignIn(input: OwnerSignInInput): OwnerSignInResponse
}
`;

export default loginSchema;
