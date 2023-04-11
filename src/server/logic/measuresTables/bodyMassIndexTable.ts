import { BodyMassIndex, Genre } from '../../../common/enums';

type TableType = Record<string, Record<string, (value: number) => boolean>>;

const maleTable: TableType = {
  '10': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 12.7 && value <= 14.8,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 14.9 && value <= 18.4,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 18.5 && value <= 26.1,
  },
  '11': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 13 && value <= 15.2,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 15.3 && value <= 19.1,
    [BodyMassIndex.overWeight]: (value: number) => value >= 19.2 && value <= 28,
  },
  '12': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 13.3 && value <= 15.7,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 15.8 && value <= 19.8,
    [BodyMassIndex.overWeight]: (value: number) => value >= 19.9 && value <= 30,
  },
  '13': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 13.7 && value <= 16.3,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 16.4 && value <= 20.7,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 20.8 && value <= 31.7,
  },
  '14': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 14.2 && value <= 16.9,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 17 && value <= 21.7,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 21.8 && value <= 33.1,
  },
  '15': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 14.6 && value <= 17.5,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 17.6 && value <= 22.6,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 22.7 && value <= 34.1,
  },
  '16': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15 && value <= 18.1,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 18.2 && value <= 23.4,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 23.5 && value <= 34.8,
  },
  '17': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15.3 && value <= 18.7,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 18.8 && value <= 24.2,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 24.3 && value <= 35.2,
  },
  '18': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15.6 && value <= 19.1,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 19.2 && value <= 24.8,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 24.9 && value <= 35.4,
  },
  '19': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15.8 && value <= 19.5,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 19.6 && value <= 25.3,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 25.4 && value <= 35.5,
  },
};

const femaleTable: TableType = {
  '10': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 12.7 && value <= 14.7,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 14.8 && value <= 18.9,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 19 && value <= 228.4,
  },
  '11': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 13 && value <= 15.2,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 15.3 && value <= 19.8,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 19.9 && value <= 30.2,
  },
  '12': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 13.3 && value <= 15.9,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 16 && value <= 20.7,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 20.8 && value <= 31.9,
  },
  '13': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 13.7 && value <= 16.5,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 16.6 && value <= 21.7,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 21.8 && value <= 33.4,
  },
  '14': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 14.2 && value <= 17.1,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 17.2 && value <= 22.6,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 27.7 && value <= 34.7,
  },
  '15': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 14.6 && value <= 17.7,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 17.8 && value <= 23.4,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 23.5 && value <= 35.5,
  },
  '16': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15 && value <= 18.1,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 18.2 && value <= 24,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 24.1 && value <= 36.1,
  },
  '17': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15.3 && value <= 18.3,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 18.4 && value <= 24.4,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 24.5 && value <= 36.3,
  },
  '18': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15.6 && value <= 18.5,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 18.6 && value <= 24.7,
    [BodyMassIndex.overWeight]: (value: number) =>
      value >= 24.8 && value <= 36.3,
  },
  '19': {
    [BodyMassIndex.underWeight]: (value: number) =>
      value >= 15.8 && value <= 18.6,
    [BodyMassIndex.normalWeight]: (value: number) =>
      value >= 18.7 && value <= 24.9,
    [BodyMassIndex.overWeight]: (value: number) => value >= 25 && value <= 36.2,
  },
};

export const getBodyMassIndexResult = (
  genre: Genre,
  age: number,
  value: number
) => {
  const table = genre === Genre.male ? maleTable : femaleTable;
  if (age < 10) return BodyMassIndex.undefined;

  const attr = table[String(age)];
  if (!attr) {
    // if not attr it means age is over 20
    if (value >= 15.9 && value <= 18.4) return BodyMassIndex.underWeight;
    if (value >= 18.5 && value <= 24.9) return BodyMassIndex.normalWeight;
    if (value >= 25 && value <= 40) return BodyMassIndex.overWeight;
    return BodyMassIndex.undefined;
  }

  const bodyMassIndex =
    Object.keys(attr).find((k) => attr[k](value)) || BodyMassIndex.undefined;

  return bodyMassIndex as BodyMassIndex;
};
