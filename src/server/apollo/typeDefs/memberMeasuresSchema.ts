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
        measures: [MemberMeasure]
        pagination: Pagination
    }

    input AddMeasureInput {
        memberCode: String!
        weight: Float!
        corporalFat: Float!
        muscle: Float!
        bodyMassIndex: Float!
        corporalWaterPct: Float!
        calories: Float!
    }

    type Query {
        getMeasures(memberCode: String, offset: Int, limit: Int): GetMeasuresResponse
    }

    type Mutation {
        addMeasure(measure: AddMeasureInput): MemberMeasure
    }
`

export default memberMeasuresSchema;