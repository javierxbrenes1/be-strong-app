import { gql } from '@apollo/client';

export const GET_MEMBER_DETAILS = gql`
  query getMemberDetails($code: String!, $take: Int) {
    getMember(code: $code) {
      code
      name
      genre
      birthDate
      height
      isActive
      phone
      email
      avatar
      observations
      preferredClassTime
      memberMeasures(take: $take) {
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
    }
  }
`;
