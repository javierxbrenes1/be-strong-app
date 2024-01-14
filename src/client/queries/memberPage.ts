import { gql } from '@apollo/client';
import { MEMBER_FIELDS_WITHOUT_MEASURE } from '../fragments/memberFragment';
import { PAGINATION } from '../fragments/paginationFragment';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';

export const GET_MEMBER_DETAILS = gql`
  query getMemberDetails($code: String!) {
    getMember(code: $code) {
      ...memberWithoutMeasure
    }
  }
  ${MEMBER_FIELDS_WITHOUT_MEASURE}
`;

export const GET_MEMBER_LAST_MEASURE = gql`
  query getMemberLastMeasure(
    $code: String!
    $take: Int
    $orderBy: MemberMeasuresOrderBy
  ) {
    getMember(code: $code) {
      memberMeasures(take: $take, orderBy: $orderBy) {
        ...MeasureAllFields
      }
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS}
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

export const GET_MEMBER_ATTENDANCE_LOG_BY_YEAR = gql`
  query getMemberAttendanceLogDetails($year: Int!, $memberCode: String!) {
    getMemberAttendanceLogByYear(year: $year, memberCode: $memberCode) {
      year
      month
      total
    }
  }
`;

export const GET_MEMBER_ATTENDANCE_CLASSES = gql`
  query getMemberAttendanceClasses(
    $memberCode: String!
    $order: String
    $take: Int
  ) {
    getMemberAttendanceClasses(
      memberCode: $memberCode
      order: $order
      take: $take
    ) {
      classDate
      isoTime
    }
  }
`;

export const GET_MEMBER_ATTENDANCE_LOG_DETAILS = gql`
  query getMemberAttendanceLogsDetails(
    $year: Int!
    $month: Int!
    $memberCode: String!
  ) {
    getMemberAttendanceLogsDetails(
      year: $year
      month: $month
      memberCode: $memberCode
    ) {
      classDate
      classDurationInMinutes
      classType
      isoTime
    }
  }
`;
