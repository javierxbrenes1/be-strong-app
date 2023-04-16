export type MeasureType =
  | 'weight'
  | 'bodyMassIndex'
  | 'calories'
  | 'corporalFat'
  | 'corporalWaterPct'
  | 'muscle';

export const MEASURES_TITLES = {
  weight: 'Peso',
  bodyMassIndex: 'Indice de masa corporal',
  corporalFat: 'Grasa Corporal',
  calories: 'Calorias',
  corporalWaterPct: 'Porcentaje de Agua',
  muscle: 'Músculo',
};

export const MONTHS = {
  0: 'Ene',
  1: 'Feb',
  2: 'Mar',
  3: 'Abr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Ago',
  8: 'Set',
  9: 'Oct',
  10: 'Nov',
  11: 'Dic',
};
