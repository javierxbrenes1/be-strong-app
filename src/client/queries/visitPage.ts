import { gql } from '@apollo/client';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';
import { PAGINATION } from '../fragments/paginationFragment';

export const GET_VISIT_MEMBER = gql`
  query getVisitMember(
    $code: String
    $take: Int
    $orderBy: MemberMeasuresOrderBy
  ) {
    getVisitMember(code: $code) {
      code
      name
      avatar
      memberMeasures(take: $take, orderBy: $orderBy) {
        ...MeasureAllFields
      }
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;

export const GET_VISIT_MEASURES = gql`
  query getVisitMeasures($input: GetMeasuresInput) {
    getMeasures(input: $input) {
      measures {
        ...MeasureAllFields
      }
      pagination {
        ...pagination
      }
    }
  }
  ${PAGINATION},
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;
