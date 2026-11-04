const loginSchema = `
type OwnerUser {
    username: String
    role: String
    isBlocked: Boolean
    lastPasswordChangeDate: Date
    email: String
    name: String
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
    ownerSignIn(input: OwnerSignInInput): OwnerSignInResponse
    updatePwd(pwd: String!): Boolean @auth
}
`;

export default loginSchema;
