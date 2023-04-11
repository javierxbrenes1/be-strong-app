import {
  BodyMassIndex,
  Calories,
  CorporalFat,
  CorporalWaterPct,
  Genre,
  Muscle,
} from '../../common/enums';

type ValidationFnType<ResultType> = (
  genre: Genre,
  age: number,
  value: number
) => ResultType;

export type MeasuresCalculator = {
  calculateCorporalFat: ValidationFnType<CorporalFat>;
  calculateCorporalWaterPct: ValidationFnType<CorporalWaterPct>;
  calculateBodyMassIndex: ValidationFnType<BodyMassIndex>;
  calculateCalories: ValidationFnType<Calories>;
  calculateMuscle: ValidationFnType<Muscle>;
};
