import { gql } from '@apollo/client';
import { MEASURE_FRAGMENT_NO_DIFFS } from './measureFragment';
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
    category
  }
`;

export const MEMBER_FIELDS_WITHOUT_MEASURE = gql`
fragment memberWithoutMeasure on Member {
  ...memberScalarFields
  memberAttendance {
    ...memberAttendanceAllFields
  }
}
${MEMBER_SCALAR_FIELDS},
${MEMBER_ATTENDANCE_ALL_FIELDS}
`;

export const MEMBER_ALL_FIELDS = gql`
  fragment memberAllFields on Member {
    ...memberScalarFields
    memberMeasures(take: $take, orderBy: $orderBy) {
      ...MeasureNoDiffs
    }
    memberAttendance {
      ...memberAttendanceAllFields
    }
  }
  ${MEMBER_SCALAR_FIELDS},
  ${MEASURE_FRAGMENT_NO_DIFFS},
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
