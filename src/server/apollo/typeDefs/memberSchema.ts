const memberSchema = `
    type Member {
		code: String!
		name: String
		genre: String
		birthDate: Date
		height: Float
		isActive: Boolean
		phone: String
		email: String
		avatar: String
		observations: String
		preferredClassTime: String
		memberAttendance: MemberAttendance
		memberMeasures(take: Int): [MemberMeasure]
	}

	type GetAllMembersResponse {
		members: [Member]
		pagination: Pagination
	}


	type Query {
		getAllMembers(offset: Int, limit: Int): GetAllMembersResponse
		getMember(code: String): Member
	}

	input AddMemberInput {
		name: String!
		genre: String!
		birthDate: Date!
		height: Float!
		observations: String
	}

	type Mutation {
		addMember(member: AddMemberInput): Member
	}
`;

export default memberSchema;
