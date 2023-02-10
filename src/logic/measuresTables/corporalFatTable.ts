import { CorporalFat, Genre } from "../types";

type TableType = Record<string, (increaseBy: number, value: number) => boolean>;

 const maleCorporalFatTable: TableType  = {
    [CorporalFat.excellent]: (increaseBy: number, value: number) => value < (11 + increaseBy),
    [CorporalFat.good]: (increaseBy: number, value: number) => value >=(11 + increaseBy) && value <=(16 + increaseBy),
    [CorporalFat.regular]: (increaseBy: number, value: number) => value >=(16.1 + increaseBy) && value <=(21 + increaseBy),
    [CorporalFat.bad]: (increaseBy: number, value: number) => value > (21.1 + increaseBy),
}

 const femaleCorporalFatTable: TableType = {
    [CorporalFat.excellent]: (increaseBy: number, value: number) => value < (16 + increaseBy),
    [CorporalFat.good]: (increaseBy: number, value: number) => value >=(16 + increaseBy) && value <=(21 + increaseBy),
    [CorporalFat.regular]: (increaseBy: number, value: number) => value >=(21.1 + increaseBy) && value <=(26 + increaseBy),
    [CorporalFat.bad]: (increaseBy: number, value: number) => value > (26.1 + increaseBy),
}

const getCorporalFat = (genre: Genre, increaseBy: number, value: number): CorporalFat => {
    const corporalFatTable = genre === 'male' ? maleCorporalFatTable : femaleCorporalFatTable;
    const corporalFat = Object.keys(corporalFatTable).find((key: string) => {
        const fn = corporalFatTable[key];
        return fn(increaseBy, value);
    }) || CorporalFat.undefined;
    return corporalFat as CorporalFat;
}

export const getCorporalFatResult = (genre: Genre, age: number, value: number): CorporalFat => {
    if(age >= 10 && age <= 14) {
        return getCorporalFat(genre, 0, value)
     }
     if(age >= 15 && age <= 19) {
         return getCorporalFat(genre,1, value);
     }
     if(age >=20 && age <= 29) {
         return getCorporalFat(genre,2, value);
     }
     if(age >=30 && age <= 39) {
         return getCorporalFat(genre,3, value);
     }
     if(age >=40 && age <= 49) {
         return getCorporalFat(genre,4, value);
     }
     if(age >=50 && age <= 59) {
         return getCorporalFat(genre, 5, value);
     }
     if(age >=60 && age <= 69) {
         return getCorporalFat(genre, 6, value);
     }
     if(age >=70 && age <= 100) {
         return getCorporalFat(genre, 7, value);
     }
     return CorporalFat.undefined;
}