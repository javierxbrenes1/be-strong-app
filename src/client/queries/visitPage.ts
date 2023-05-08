import { gql } from '@apollo/client';

export const GET_VISIT_MEASURES = gql`
  query getVisitMeasures($memberCode: String, $offset: Int, $limit: Int) {
    getMeasures(memberCode: $memberCode, offset: $offset, limit: $limit) {
      member {
        code
        name
        avatar
      }
      measures {
        date
        weight
        corporalFat
        muscle
        bodyMassIndex
        corporalWaterPct
        calories
        muscleResult
        bodyMassIndexResult
        corporalFatResult
        corporalWaterPctResult
        caloriesResult
      }
      pagination {
        nextPageStart
        pageSize
        total
        totalPages
      }
    }
  }
`;
