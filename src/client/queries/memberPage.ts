import { gql } from '@apollo/client';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';

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
        ...MeasureAllFields
      }
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;
