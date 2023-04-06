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
		getAllMembers(offset: Int, limit: Int, ignore: [String]): GetAllMembersResponse
		getMember(code: String): Member
		getMembersCount: Int
		getBirthdateMembers(date: Date): [Member]
	}

	input AddMemberInput {
		name: String!
		genre: String!
		birthDate: Date!
		height: Float!
		observations: String
		avatar: String
	}

	type Mutation {
		addMember(member: AddMemberInput): Member
	}
`;

export default memberSchema;
