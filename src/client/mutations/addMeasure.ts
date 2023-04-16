import { gql } from '@apollo/client';

const ADD_MEASURE = gql`
  mutation addMeasure($measure: AddMeasureInput) {
    addMeasure(measure: $measure) {
      date
      weight
      corporalFat
      muscle
      bodyMassIndex
      corporalWaterPct
      calories
      muscleResult
      bodyMassIndexResult
      corporalFatResult
      corporalWaterPctResult
      caloriesResult
    }
  }
`;

export default ADD_MEASURE;
