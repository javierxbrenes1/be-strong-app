import { Calories, Genre } from "../types"

type TableType = Record<string, (value: number) => boolean>

const maleTable: TableType = {
    [Calories.good]: (value: number) => value >= 2000 && value <= 2500,
    [Calories.needsImprove]: (value: number) => value >= 2500

}

const femaleTable: TableType = {
    [Calories.good]: (value: number) => value >= 1500 && value <= 2000,
    [Calories.needsImprove]: (value: number) => value >= 2000
}

export const getCaloriesResult = (genre: Genre, value: number): Calories => {
    const table = genre === 'male' ? maleTable : femaleTable;
    const calories = Object.keys(table).find((k) => {
        return table[k](value);
    }) || Calories.undefined;

    return calories as Calories;
}