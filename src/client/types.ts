export type CrudAction = 'loading' | 'updating' | 'adding' | 'deleting';

export type ChartDataViewer = 'line' | 'bar';
export type DataViewer = 'table' | ChartDataViewer;

export enum Measures {
  'weight' = 'weight',
  'bodyMassIndex' = 'bodyMassIndex',
  'calories' = 'calories',
  'corporalFat' = 'corporalFat',
  'corporalWaterPct' = 'corporalWaterPct',
  'muscle' = 'muscle',
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
