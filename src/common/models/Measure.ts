interface Measure {
  id: number;
  date: Date;
  weight: number;
  corporalFat: number;
  muscle: number;
  bodyMassIndex: number;
  corporalWaterPct: number;
  calories: number;
  muscleResult: string;
  bodyMassIndexResult: string;
  corporalFatResult: string;
  corporalWaterPctResult: string;
  caloriesResult: string;
}

export default Measure;
