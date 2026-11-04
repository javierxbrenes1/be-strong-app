import type { StatusVariant } from '../../design-system';

export type MetricKey =
  | 'weight'
  | 'bodyMassIndex'
  | 'corporalFat'
  | 'muscle'
  | 'corporalWaterPct'
  | 'calories';

export type MeasureValues = Partial<Record<MetricKey, number | null>>;

export type Metric = {
  key: MetricKey;
  label: string;
  unit: string;
  goodWhen: 'down' | 'up';
  resultKey?: string;
  diffKey: string;
};

export const MEASURE_METRICS: Metric[] = [
  {
    key: 'weight',
    label: 'Peso',
    unit: 'kg',
    goodWhen: 'down',
    diffKey: 'weightDiff',
  },
  {
    key: 'bodyMassIndex',
    label: 'IMC',
    unit: '',
    goodWhen: 'down',
    resultKey: 'bodyMassIndexResult',
    diffKey: 'bodyMassIndexDiff',
  },
  {
    key: 'corporalFat',
    label: 'Grasa corporal',
    unit: '%',
    goodWhen: 'down',
    resultKey: 'corporalFatResult',
    diffKey: 'corporalFatDiff',
  },
  {
    key: 'muscle',
    label: 'Músculo',
    unit: '%',
    goodWhen: 'up',
    resultKey: 'muscleResult',
    diffKey: 'muscleDiff',
  },
  {
    key: 'corporalWaterPct',
    label: 'Agua',
    unit: '%',
    goodWhen: 'up',
    resultKey: 'corporalWaterPctResult',
    diffKey: 'corporalWaterPctDiff',
  },
  {
    key: 'calories',
    label: 'Calorías',
    unit: 'kcal',
    goodWhen: 'down',
    resultKey: 'caloriesResult',
    diffKey: 'caloriesDiff',
  },
];

const VARIANTS: Record<string, StatusVariant> = {
  Excelente: 'success',
  'Peso normal': 'success',
  Bien: 'success',
  Mucho: 'success',
  Bueno: 'info',
  Normal: 'info',
  Regular: 'warning',
  'Falta de peso': 'warning',
  Poco: 'warning',
  Malo: 'danger',
  'Sobre peso': 'danger',
  'Necesita mejorar': 'danger',
};

export const resultVariant = (
  result: string | null | undefined
): StatusVariant => (result && VARIANTS[result]) || 'neutral';

export function isGoodDelta(metric: MetricKey, delta: number): boolean {
  const goodWhen = MEASURE_METRICS.find((m) => m.key === metric)?.goodWhen;
  return goodWhen === 'down' ? delta < 0 : delta > 0;
}
