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

    type Query {
        getMemberAttendance(memberCode: String!): MemberAttendance
    }
`

export default memberAttendanceSchema;