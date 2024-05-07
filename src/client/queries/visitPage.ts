import { gql } from '@apollo/client';
import {
  MEASURE_FRAGMENT_ALL_FIELDS,
  MEASURE_FRAGMENT_NO_DIFFS,
} from '../fragments/measureFragment';
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
      lastMeasure {
        ...MeasureAllFields
      }
      memberMeasures(take: $take, orderBy: $orderBy) {
        ...MeasureNoDiffs
      }
    }
  }
  ${MEASURE_FRAGMENT_NO_DIFFS},
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
