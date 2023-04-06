import { gql } from '@apollo/client';

const ADD_MEASURE = gql`
  mutation addMeasure($measure: AddMeasureInput) {
    addMeasure(measure: $measure) {
      muscleResult
      bodyMassIndexResult
      corporalFatResult
      corporalWaterPctResult
      caloriesResult
    }
  }
`;

export default ADD_MEASURE;
