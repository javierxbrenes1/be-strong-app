export type CrudAction = 'loading' | 'updating' | 'adding' | 'deleting';

export type ChartDataViewer = 'line' | 'bar';
export type DataViewer = 'table' | ChartDataViewer;

export enum Measures {
  'weight' = 'weight',
  'weightDiff' = 'weightDiff',
  'bodyMassIndex' = 'bodyMassIndex',
  'bodyMassIndexDiff' = 'bodyMassIndexDiff',
  'calories' = 'calories',
  'caloriesDiff' = 'caloriesDiff',
  'corporalFat' = 'corporalFat',
  'corporalFatDiff' = 'corporalFatDiff',
  'corporalWaterPct' = 'corporalWaterPct',
  'corporalWaterPctDiff' = 'corporalWaterPctDiff',
  'muscle' = 'muscle',
  'muscleDiff' = 'muscleDiff',
}

export const MemberCategories = Object.freeze({
  A1: 'A1',
  A2: 'A2',
  A3: 'A3',
  A4: 'A4',
  A5: 'A5',
  A6: 'A6',
  A7: 'A7',
});
