const memberMeasuresSchema = `
    type MemberMeasure {
        id: ID!
        memberCode: String!
        date: Date
        weight: Float
        corporalFat: Float
        muscle: Float
        bodyMassIndex: Float
        corporalWaterPct: Float
        calories: Float
        muscleResult: String
        bodyMassIndexResult: String
        corporalFatResult: String
        corporalWaterPctResult: String
        caloriesResult: String
        member: Member
    }

    type GetMeasuresResponse {
        measures: MemberMeasure[]
        pagination: Pagination
    }

    type AddMeasureInput {
        memberCode: String!
        weight: Float
        corporalFat: Float
        muscle: Float
        bodyMassIndex: Float
        corporalWaterPct: Float
        calories: Float
    }

    type Query {
        getMeasures(memberCode: string, offset: Int, limit: Int): GetMeasuresResponse
    }

    type Mutation {
        addMeasure(input: AddMeasureInput): MemberMeasure
    }
`