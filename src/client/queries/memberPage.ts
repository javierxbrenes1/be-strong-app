import { gql } from '@apollo/client';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';
import { GYM_CLASS_TIME_ALL_FIELDS } from '../fragments/gymClassTimeFragment';
import { MEMBER_ATTENDANCE_ALL_FIELDS } from '../fragments/memberAttendanceFragment';

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
      gymClassTime {
        ...gymClassTimeAllFields
      }
      memberAttendance {
        ...memberAttendanceAllFields
      }
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS},
  ${GYM_CLASS_TIME_ALL_FIELDS},
  ${MEMBER_ATTENDANCE_ALL_FIELDS}
`;
