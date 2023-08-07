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
