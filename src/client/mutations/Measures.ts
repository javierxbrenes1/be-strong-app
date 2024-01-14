import { gql } from '@apollo/client';
import { MEASURE_FRAGMENT_ALL_FIELDS } from '../fragments/measureFragment';

export const ADD_MEASURE = gql`
  mutation addMeasure($measure: AddMeasureInput) {
    addMeasure(measure: $measure) {
      ...MeasureAllFields
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;

export const UPDATE_MEASURE = gql`
  mutation updateMeasure($measure: UpdateMeasureInput) {
    updateMeasure(measure: $measure) {
      ...MeasureAllFields
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;

export const DELETE_MEASURE = gql`
  mutation deleteMeasure($id: Int!, $memberCode: String!) {
    deleteMeasure(id: $id, memberCode: $memberCode) {
      ...MeasureAllFields
    }
  }
  ${MEASURE_FRAGMENT_ALL_FIELDS}
`;
