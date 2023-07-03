import { gql } from '@apollo/client';
import { MEMBER_ALL_FIELDS } from '../fragments/memberFragment';
import { PAGINATION } from '../fragments/paginationFragment';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';

export const GET_MEMBER_DETAILS = gql`
  query getMemberDetails(
    $code: String!
    $take: Int
    $orderBy: MemberMeasuresOrderBy
  ) {
    getMember(code: $code) {
      ...memberAllFields
    }
  }
  ${MEMBER_ALL_FIELDS}
`;

export const GET_MEMBER_MEASURES = gql`
  query getMemberMeasures($input: GetMeasuresInput) {
    getMeasures(input: $input) {
      measures {
        ...MeasureAllFields
      }
      pagination {
        ...pagination
      }
    }
  }
  ${PAGINATION}
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;
