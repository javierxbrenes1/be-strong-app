import { gql } from '@apollo/client';
import { GYM_CLASS_ALL_FIELDS } from '../fragments/gymClassFragment';

export const GET_CLASSES_BY_DATE = gql`
  query getGymClasses($gte: String!, $lt: String!) {
    getGymClasses(gte: $gte, lt: $lt) {
      ...getGymClassAllFields
    }
  }
  ${GYM_CLASS_ALL_FIELDS}
`;

export const ADD_MEMBER_ATTENDANCES_LOG = gql`
  mutation addMembersAttendances($input: MembersAttendancesInput!) {
    addMembersAttendances(input: $input) {
      ...getGymClassAllFields
    }
  }
  ${GYM_CLASS_ALL_FIELDS}
`;

export const REMOVE_MEMBER_ATTENDANCES_LOG = gql`
  mutation removeMembersAttendances($input: MembersAttendancesInput!) {
    removeMembersAttendances(input: $input) {
      ...getGymClassAllFields
    }
  }
  ${GYM_CLASS_ALL_FIELDS}
`;
