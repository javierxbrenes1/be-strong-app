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

    type Query {
        getMemberAttendance(memberCode: String!): MemberAttendance @auth
    }
`;

export default memberAttendanceSchema;
