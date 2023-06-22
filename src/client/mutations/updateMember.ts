import { gql } from '@apollo/client';

export const UPDATE_MEMBER_INFO = gql`
  mutation updateMember($member: UpdateMemberInput) {
    updateMember(member: $member) {
      code
      avatar
      birthDate
      code
      email
      genre
      height
      isActive
      name
      observations
      phone
      preferredClassTime
      memberAttendance
    }
  }
`;
