const memberSchema = `

	input MemberMeasuresOrderBy {
		date: String
	}

	type VisitMember {
		code: String!
		name: String
		avatar: String
		memberMeasures(take: Int, orderBy: MemberMeasuresOrderBy): [MemberMeasure]
	}

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
		preferredClassTime: Int
		category: String
		memberAttendance: MemberAttendance
		memberMeasures(take: Int, orderBy: MemberMeasuresOrderBy): [MemberMeasure]
		gymClassTime: GymClassTime
	}

	type GetAllMembersResponse {
		members: [Member]
		pagination: Pagination
	}


	type Query {
		getAllMembers(offset: Int, limit: Int, ignore: [String]): GetAllMembersResponse @auth
		getMember(code: String): Member @auth
		getVisitMember(code: String): VisitMember
		getMembersCount: Int @auth
		getBirthdateMembers(date: String): [Member] @auth
		getFilteredMembers(column: String, comparator: String, filter: String): [Member] @auth
	}

	input AddMemberInput {
		name: String!
		genre: String
		birthDate: Date
		height: Float
		observations: String
		avatar: String
		category: String
	}

	input UpdateMemberInput {
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
		category: String
		memberAttendance: MemberAttendanceInput
		preferredClassTime: Int
	}

	type Mutation {
		addMember(member: AddMemberInput): Member @auth
		updateMember(member: UpdateMemberInput): Member @auth
	}
`;

export default memberSchema;
