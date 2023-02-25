import { Genre, Muscle } from "../types";
type AgeTuple = [number, number];

type TableType = {
    ages: [number, number],
    ranges: Record<string, (value: number) => boolean>
}[]

const maleMuscleTable: TableType = [
    {
        ages: [10, 14],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 44,
            [Muscle.standard as string]: (value: number) => value >= 44 && value <= 57,
            [Muscle.highQuality as string]: (value: number) => value > 57
        }
    },
    {
        ages: [15, 19],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 43,
            [Muscle.standard as string]: (value: number) => value >= 43 && value <= 56,
            [Muscle.highQuality as string]: (value: number) => value > 56
        }
    },
    {
        ages: [20, 29],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 42,
            [Muscle.standard as string]: (value: number) => value >= 42 && value <= 54,
            [Muscle.highQuality as string]: (value: number) => value > 54
        }
    },
    {
        ages: [30, 39],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 41,
            [Muscle.standard as string]: (value: number) => value >= 41 && value <= 52,
            [Muscle.highQuality as string]: (value: number) => value > 52
        }
    },
    {
        ages: [40, 49],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 40,
            [Muscle.standard as string]: (value: number) => value >= 40 && value <= 50,
            [Muscle.highQuality as string]: (value: number) => value > 50
        }
    },
    {
        ages: [50, 59],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 39,
            [Muscle.standard as string]: (value: number) => value >= 39 && value <= 48,
            [Muscle.highQuality as string]: (value: number) => value > 48
        }
    },
    {
        ages: [60, 69],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 38,
            [Muscle.standard as string]: (value: number) => value >= 38 && value <= 47,
            [Muscle.highQuality as string]: (value: number) => value > 47
        }
    },
    {
        ages: [70, 100],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 37,
            [Muscle.standard as string]: (value: number) => value >= 37 && value <= 46,
            [Muscle.highQuality as string]: (value: number) => value > 46
        }
    }
]

const femaleMuscleTable: TableType = [
    {
        ages: [10, 14],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 36,
            [Muscle.standard as string]: (value: number) => value >= 36 && value <= 43,
            [Muscle.highQuality as string]: (value: number) => value > 43
        }
    },
    {
        ages: [15, 19],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 35,
            [Muscle.standard as string]: (value: number) => value >= 35 && value <= 41,
            [Muscle.highQuality as string]: (value: number) => value > 41
        }
    },
    {
        ages: [20, 29],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 34,
            [Muscle.standard as string]: (value: number) => value >= 34 && value <= 39,
            [Muscle.highQuality as string]: (value: number) => value > 39
        }
    },
    {
        ages: [30, 39],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 33,
            [Muscle.standard as string]: (value: number) => value >= 33 && value <= 38,
            [Muscle.highQuality as string]: (value: number) => value > 38
        }
    },
    {
        ages: [40, 49],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 31,
            [Muscle.standard as string]: (value: number) => value >= 31 && value <= 36,
            [Muscle.highQuality as string]: (value: number) => value > 36
        }
    },
    {
        ages: [50, 59],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 29,
            [Muscle.standard as string]: (value: number) => value >= 29 && value <= 34,
            [Muscle.highQuality as string]: (value: number) => value > 34
        }
    },
    {
        ages: [60, 69],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 28,
            [Muscle.standard as string]: (value: number) => value >= 28 && value <= 33,
            [Muscle.highQuality as string]: (value: number) => value > 33
        }
    },
    {
        ages: [70, 100],
        ranges: {
            [Muscle.belowAverage as string]: (value: number) => value < 27,
            [Muscle.standard as string]: (value: number) => value >= 27 && value <= 32,
            [Muscle.highQuality as string]: (value: number) => value > 32
        }
    }

]


export const getMuscleResult = (genre: Genre, age: number, value: number): Muscle => {
    const table = genre === 'male' ? maleMuscleTable : femaleMuscleTable;
    const el = table.find(({ages}) => {
        const [min, max] = ages;
        return min >= age && age <= max;
    } )
    if(!el) {
        return Muscle.undefined;
    }

    const muscleResult = Object.keys(el.ranges).find((k) => {
        return el.ranges[k](value);
    }) || Muscle.undefined;
    return muscleResult as Muscle;
}