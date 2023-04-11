import { getBodyMassIndexResult } from './measuresTables/bodyMassIndexTable';
import { getCaloriesResult } from './measuresTables/caloriesTable';
import { getCorporalFatResult } from './measuresTables/corporalFatTable';
import { getCorporalWaterPctResult } from './measuresTables/corporalWaterPctTable';
import { getMuscleResult } from './measuresTables/muscleTable';
import {
  BodyMassIndex,
  Calories,
  CorporalFat,
  CorporalWaterPct,
  Genre,
  Muscle,
} from '../../common/enums';
import { MeasuresCalculator } from './types';

const measuresCalculator: MeasuresCalculator = {
  calculateCorporalFat(genre: Genre, age: number, value: number): CorporalFat {
    return getCorporalFatResult(genre, age, value);
  },
  calculateCorporalWaterPct(
    genre: Genre,
    _age: number,
    value: number
  ): CorporalWaterPct {
    return getCorporalWaterPctResult(genre, value);
  },
  calculateBodyMassIndex(
    genre: Genre,
    age: number,
    value: number
  ): BodyMassIndex {
    return getBodyMassIndexResult(genre, age, value);
  },
  calculateCalories(genre: Genre, _age: number, value: number): Calories {
    return getCaloriesResult(genre, value);
  },
  calculateMuscle(genre: Genre, age: number, value: number): Muscle {
    return getMuscleResult(genre, age, value);
  },
};

export default measuresCalculator;
