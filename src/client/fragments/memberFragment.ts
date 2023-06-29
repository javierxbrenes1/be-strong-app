import { gql } from '@apollo/client';
import { MEASURE_FRAGMENT_ALL_FIELDS } from './measureFragment';
import { MEMBER_ATTENDANCE_ALL_FIELDS } from './memberAttendanceFragment';

const MEMBER_SCALAR_FIELDS = gql`
  fragment memberScalarFields on Member {
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
  }
`;

export const MEMBER_ALL_FIELDS = gql`
  fragment memberAllFields on Member {
    ...memberScalarFields
    memberMeasures(take: $take) {
      ...MeasureAllFields
    }
    memberAttendance {
      ...memberAttendanceAllFields
    }
  }
  ${MEMBER_SCALAR_FIELDS},
  ${MEASURE_FRAGMENT_ALL_FIELDS},
  ${MEMBER_ATTENDANCE_ALL_FIELDS}
`;

export const MEMBER_WITHOUT_MEASURES = gql`
fragment memberFieldsWithoutMeasures on Member {
  ...memberScalarFields
  memberAttendance {
    ...memberAttendanceAllFields
  }
}
${MEMBER_SCALAR_FIELDS},
${MEMBER_ATTENDANCE_ALL_FIELDS}
`;
