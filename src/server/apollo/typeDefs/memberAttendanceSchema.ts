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

    input MembersAttendancesInput {
        memberCodes: [String]!
        gymClassId: Int!
        gymClassTimeId: Int!
    }

    type Query {
        getMemberAttendance(memberCode: String!): MemberAttendance @auth
    }

    type Mutation {
        addMembersAttendances(input: MembersAttendancesInput!): GymClass @auth
        removeMembersAttendances(input: MembersAttendancesInput!): GymClass @auth
    }
`;

export default memberAttendanceSchema;
