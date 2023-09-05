import { gql } from '@apollo/client';
import { GYM_CLASS_ALL_FIELDS } from '../fragments/gymClassFragment';

export const ADD_CLASS = gql`
  mutation addGymClass($input: AddClassInput) {
    addGymClass(input: $input) {
      ...getGymClassAllFields
    }
  }
  ${GYM_CLASS_ALL_FIELDS}
`;
