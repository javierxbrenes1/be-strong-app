import { gql } from '@apollo/client';

export const MEASURE_FRAGMENT_ALL_FIELDS = gql`
  fragment MeasureAllFields on MemberMeasure {
    id
    date
    weight
    weightDiff
    corporalFat
    corporalFatDiff
    muscle
    muscleDiff
    bodyMassIndex
    bodyMassIndexDiff
    corporalWaterPct
    corporalWaterPctDiff
    calories
    caloriesDiff
    muscleResult
    bodyMassIndexResult
    corporalFatResult
    corporalWaterPctResult
    caloriesResult
  }
`;

export const MEASURE_FRAGMENT_NO_DIFFS = gql`
  fragment MeasureNoDiffs on MemberMeasure {
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
