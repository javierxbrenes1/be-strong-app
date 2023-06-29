import { gql } from '@apollo/client';
import { MEMBER_ALL_FIELDS } from '../fragments/memberFragment';

export const GET_MEMBER_DETAILS = gql`
  query getMemberDetails($code: String!, $take: Int) {
    getMember(code: $code) {
      ...memberAllFields
    }
  }
  ${MEMBER_ALL_FIELDS}
`;
