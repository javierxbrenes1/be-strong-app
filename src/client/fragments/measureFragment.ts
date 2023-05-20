import { gql } from '@apollo/client';

export const MEASURE_FRAGMENT_ALL_FIELDS = gql`
  fragment MeasureAllFields on MemberMeasure {
    id
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
`;
