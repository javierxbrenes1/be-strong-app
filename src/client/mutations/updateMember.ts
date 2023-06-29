import { gql } from '@apollo/client';
import { MEMBER_WITHOUT_MEASURES } from '../fragments/memberFragment';

export const UPDATE_MEMBER_INFO = gql`
  mutation updateMember($member: UpdateMemberInput) {
    updateMember(member: $member) {
      ...memberFieldsWithoutMeasures
    }
  }
  ${MEMBER_WITHOUT_MEASURES}
`;
