import { Measures } from './types';

export const MEASURES_TITLES = {
  weight: 'Peso',
  bodyMassIndex: 'Índice de masa corporal',

  corporalFat: 'Grasa corporal',
  calories: 'Calorías',
  corporalWaterPct: 'Porcentaje de agua',
  muscle: 'Músculo',
};

export type MeasuresTitlesProp = keyof typeof MEASURES_TITLES;

const MeasuresColumnsIds: Record<Measures, string[]> = {
  weight: ['weight'],
  bodyMassIndex: ['bodyMassIndex', 'bodyMassIndexResult'],
  calories: ['calories', 'caloriesResult'],
  corporalFat: ['corporalFat', 'corporalFatResult'],
  corporalWaterPct: ['corporalWaterPct', 'corporalWaterPctResult'],
  muscle: ['muscle', 'muscleResult'],
};

export const getMeasureTableColumns = (measureType: Measures) => {
  const cIds = MeasuresColumnsIds[measureType];
  return [
    {
      id: 'date',
      text: 'Fecha',
    },
    ...cIds.map((id) => ({
      id,
      text: MEASURES_TITLES[id as MeasuresTitlesProp] || 'Indicador',
    })),
  ];
};

export const getFullMeasureTableColums = () => [
  {
    id: 'date',
    text: 'Fecha',
  },
  {
    id: Measures.weight,
    text: MEASURES_TITLES.weight,
  },
  {
    id: Measures.bodyMassIndex,
    text: MEASURES_TITLES.bodyMassIndex,
  },
  {
    id: Measures.corporalFat,
    text: MEASURES_TITLES.corporalFat,
  },
  {
    id: Measures.calories,
    text: MEASURES_TITLES.calories,
  },
  {
    id: Measures.corporalWaterPct,
    text: MEASURES_TITLES.corporalWaterPct,
  },
  {
    id: Measures.muscle,
    text: MEASURES_TITLES.muscle,
  },
];

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

export const DAYS = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sabado',
  sunday: 'Domingo',
};

export const MeasuresColorMap = {
  [Measures.weight]: '#4c9173',
  [Measures.bodyMassIndex]: '#453953',
  [Measures.corporalFat]: '#fc3a52',
  [Measures.calories]: '#f2910a',
  [Measures.corporalWaterPct]: '#418c9f',
  [Measures.muscle]: '#49beb7',
};
