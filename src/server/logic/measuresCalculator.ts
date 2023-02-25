import { getBodyMassIndexResult } from "./measuresTables/bodyMassIndexTable";
import { getCaloriesResult } from "./measuresTables/caloriesTable";
import { getCorporalFatResult } from "./measuresTables/corporalFatTable";
import { getCorporalWaterPctResult } from "./measuresTables/corporalWaterPctTable";
import { getMuscleResult } from "./measuresTables/muscleTable";
import { BodyMassIndex, Calories, CorporalFat, CorporalWaterPct, Genre, MeasuresCalculator, Muscle } from "./types";

const measuresCalculator: MeasuresCalculator = {
    calculateCorporalFat: function (genre: Genre, age: number, value: number): CorporalFat {
        return getCorporalFatResult(genre, age, value);
    },
    calculateCorporalWaterPct: function (genre: Genre, _age: number, value: number): CorporalWaterPct {
        return getCorporalWaterPctResult(genre, value);
    },
    calculateBodyMassIndex: function (genre: Genre, age: number, value: number): BodyMassIndex {
        return getBodyMassIndexResult(genre, age, value);
    },
    calculateCalories: function (genre: Genre, _age: number, value: number): Calories {
        return getCaloriesResult(genre, value);
    },
    calculateMuscle: function (genre: Genre, age: number, value: number): Muscle {
        return getMuscleResult(genre, age, value);
    }
}

export default measuresCalculator;