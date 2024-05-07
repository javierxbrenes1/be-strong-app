const memberMeasuresSchema = `
    type MemberMeasure {
        id: Int!
        memberCode: String!
        date: Date
        weight: Float
        weightDiff: Float
        corporalFat: Float
        corporalFatDiff: Float
        muscle: Float
        muscleDiff: Float
        bodyMassIndex: Float
        bodyMassIndexDiff: Float
        corporalWaterPct: Float
        corporalWaterPctDiff: Float
        calories: Float
        caloriesDiff: Float
        muscleResult: String
        bodyMassIndexResult: String
        corporalFatResult: String
        corporalWaterPctResult: String
        caloriesResult: String
        member: Member
    }

    type GetMeasuresResponse {
        member: Member
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
        date: Date!
    }

    input UpdateMeasureInput {
        memberCode: String!
        id: Int!
        weight: Float
        corporalFat: Float
        muscle: Float
        bodyMassIndex: Float
        corporalWaterPct: Float
        calories: Float
    }

    input  MeasureFiltersInput {
        from: Date
        to: Date
    }

    input GetMeasuresInput {
        memberCode: String
        offset: Int
        limit: Int
        filters: MeasureFiltersInput
    }

    type Query {
        getMeasures(input: GetMeasuresInput): GetMeasuresResponse
    }

    type Mutation {
        addMeasure(measure: AddMeasureInput): MemberMeasure @auth
        updateMeasure(measure: UpdateMeasureInput): MemberMeasure @auth
        deleteMeasure(id: Int!, memberCode: String!): MemberMeasure @auth
    }
`;

export default memberMeasuresSchema;
