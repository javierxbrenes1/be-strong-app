interface Measure {
  id: number;
  date: Date;
  weight: number;
  weightDiff: number;
  corporalFat: number;
  corporalFatDiff: number;
  muscle: number;
  muscleDiff: number;
  bodyMassIndex: number;
  bodyMassIndexDiff: number;
  corporalWaterPct: number;
  corporalWaterPctDiff: number;
  calories: number;
  caloriesDiff: number;
  muscleResult: string;
  bodyMassIndexResult: string;
  corporalFatResult: string;
  corporalWaterPctResult: string;
  caloriesResult: string;
}

export default Measure;
