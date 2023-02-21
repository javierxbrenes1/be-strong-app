const memberSchema = `
    type Member {
		id: ID!
		code: String!
		name: String
		lastName: String
		genre: String
		birthDate: Date
		size: Float
		isActive: Boolean
		phone: String
		email: String
		avatar: String
		observations: String
		preferredClassTime: String
		memberAttendance: MemberAttendance
		memberMeasures(last: Int): [MemberMeasure]
	}

	type GetAllMembersResponse {
		members: [Member]
		pagination: Pagination
	}


	type Query {
		getAllMembers(offset: Int, limit: Int): GetAllMembersResponse
		getMember(code: String): Member
	}
`;

export default memberSchema;