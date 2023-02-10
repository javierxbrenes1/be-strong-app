import { getBodyMassIndexResult } from "./measuresTables/bodyMassIndexTable";
import { getCaloriesResult } from "./measuresTables/caloriesTable";
import { getCorporalFatResult } from "./measuresTables/corporalFatTable";
import { getCorporalWaterPct } from "./measuresTables/corporalWaterPctTable";
import { BodyMassIndex, Calories, CorporalFat, CorporalWaterPct, Genre, MeasuresCalculator, Muscle } from "./types";



const measuresCalculator: MeasuresCalculator = {
    calculateCorporalFat: function (genre: Genre, age: number, value: number): CorporalFat {
        return getCorporalFatResult(genre, age, value);
    },
    calculateCorporalWaterPct: function (genre: Genre, _age: number, value: number): CorporalWaterPct {
        return getCorporalWaterPct(genre, value);
    },
    calculateBodyMassIndex: function (genre: Genre, age: number, value: number): BodyMassIndex {
        return getBodyMassIndexResult(genre, age, value);
    },
    calculateCalories: function (genre: Genre, _age: number, value: number): Calories {
        return getCaloriesResult(genre, value);
    },
    calculateMuscle: function (genre: Genre, age: number, value: number): Muscle {
        throw new Error("Function not implemented.");
    }
}

export default measuresCalculator;