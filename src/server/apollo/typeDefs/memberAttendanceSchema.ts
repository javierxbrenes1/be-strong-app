const memberAttendanceSchema = `
    type MemberAttendance {
        memberCode: String!
        monday: Boolean
        tuesday: Boolean
        wednesday: Boolean
        thursday: Boolean
        friday: Boolean
        saturday: Boolean
        sunday: Boolean
        member: Member
    }

    input MemberAttendanceInput {
        monday: Boolean
        tuesday: Boolean
        wednesday: Boolean
        thursday: Boolean
        friday: Boolean
        saturday: Boolean
        sunday: Boolean
    }

    input AddMembersAttendancesInput {
        memberCodes: [String]!
        gymClassId: ID!
        gymClassTimeId: ID!
    }

    type Query {
        getMemberAttendance(memberCode: String!): MemberAttendance @auth
    }

    type Mutation {
        addMembersAttendances(input: AddMembersAttendancesInput!): Boolean @auth
    }
`;

export default memberAttendanceSchema;
