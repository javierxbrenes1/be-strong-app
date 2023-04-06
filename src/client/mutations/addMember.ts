import { gql } from '@apollo/client';

const ADD_NEW_MEMBER = gql`
  mutation addMember($member: AddMemberInput) {
    addMember(member: $member) {
      avatar
      code
      name
    }
  }
`;

export default ADD_NEW_MEMBER;
