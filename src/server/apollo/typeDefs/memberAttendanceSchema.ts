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

    type MemberAttendanceLogByYear {
        year: Int
        month: Int
        total: Int
    }

    type MemberAttendanceLogsDetails {
        classDate: String
        classDurationInMinutes: Int
        classType: String
        isoTime: String
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
        getMemberAttendanceLogByYear(year: Int!, memberCode: String!): [MemberAttendanceLogByYear]
        getMemberAttendanceLogsDetails(year: Int!, month: Int!, memberCode: String!): [MemberAttendanceLogsDetails]
    }

    type Mutation {
        addMembersAttendances(input: MembersAttendancesInput!): GymClass @auth
        removeMembersAttendances(input: MembersAttendancesInput!): GymClass @auth
    }
`;

export default memberAttendanceSchema;
