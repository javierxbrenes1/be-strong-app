export enum CorporalFat {
    excellent = 'Excelente',
    good = 'Bueno',
    regular = 'Regular',
    bad = 'Malo',
    undefined = 'Indefinido'
}

export enum CorporalWaterPct {
    excellent = 'Excelente',
    good = 'Bueno',
    bad = 'Malo',
    undefined = 'Indefinido'
}

export enum BodyMassIndex {
    underWeight = 'Falta de peso',
    normalWeight = 'Peso normal',
    overWeight = 'Sobre peso',
    undefined = 'Indefinido'
}

export enum Calories {
    good = 'Bien',
    needsImprove = 'Necesita mejorar',
    undefined = 'Indefinido'
}

export enum Muscle {
    belowAverage = 'Poco',
    standard = 'Normal',
    highQuality = 'Mucho',
    undefined = 'Indefinido'
}

export type Genre = 'male' | 'female'

type ValidationFnType<ResultType> = (genre: Genre, age: number, value: number) => ResultType;

export type MeasuresCalculator = {
    calculateCorporalFat: ValidationFnType<CorporalFat>,
    calculateCorporalWaterPct: ValidationFnType<CorporalWaterPct>,
    calculateBodyMassIndex: ValidationFnType<BodyMassIndex>,
    calculateCalories: ValidationFnType<Calories>
    calculateMuscle: ValidationFnType<Muscle>
}