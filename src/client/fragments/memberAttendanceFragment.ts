import { gql } from '@apollo/client';

export const MEMBER_ATTENDANCE_ALL_FIELDS = gql`
  fragment memberAttendanceAllFields on MemberAttendance {
    memberCode
    monday
    tuesday
    wednesday
    thursday
    friday
    saturday
    sunday
  }
`;
