import { ApolloError } from '@apollo/client';
import dayjs from 'dayjs';
import Member from '../../common/models/Member';
import Measure from '../../common/models/Measure';
import { Measures } from '../types';

export const createAvatarLink = (name: string): string =>
  `https://robohash.org/${name}?size=64x64&bgset=bg2`;
// `https://ui-avatars.com/api/?name=${name}&background=random`;

export function getApolloErrorMessages(error: ApolloError) {
  const messages = [];
  if (error && error.graphQLErrors) {
    error.graphQLErrors.forEach((graphQLError) => {
      if (graphQLError && graphQLError.message) {
        messages.push(graphQLError.message);
      }
    });
  }
  if (error && error.networkError && error.networkError.message) {
    messages.push(error.networkError.message);
  }
  return messages;
}

export function isValid(val?: unknown) {
  return val !== undefined && val !== null;
}

export const formatDate = (date: number | Date | string): string => {
  const text = dayjs(date).locale('es').format('DD/MM/YYYY');
  return text
    .split(' ')
    .map((x) => x[0].toLocaleUpperCase() + x.substring(1))
    .join(' ');
};

function getEnumKeys<T extends Record<string, any>>(
  enumObject: T
): Array<keyof T> {
  return Object.keys(enumObject) as Array<keyof T>;
}

export const sortMemberListByName = (list: Member[]) =>
  list.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

export const parseMeasureData = (measures: Measure[]) =>
  measures.map((m) => {
    const date = formatDate(m.date);
    const newObj: Record<string, string> = {};
    type Mtype = keyof typeof m;
    Object.keys(m).forEach((x) => {
      newObj[x] = String(m[x as Mtype]);
    });
    newObj.date = date;
    return newObj;
  });

export function buildMeasureChartDataByMeasureType(
  measures: Measure[],
  selectedMeasureType: Measures
) {
  const labels: string[] = [];
  const numbers: number[] = [];

  measures.forEach((measure) => {
    labels.push(formatDate(measure.date));
    type MeasureT = keyof typeof measure;
    numbers.push(Number(measure[selectedMeasureType as MeasureT]) || 0);
  });

  return { labels, numbers };
}

export function buildMeasureChartDataForAllMeasures(measures: Measure[]) {
  const keys = getEnumKeys(Measures);
  const labels: string[] = [];
  const numbers: Record<string, number[]> = {};

  measures.forEach((measure) => {
    type MeasureT = keyof typeof measure;
    labels.push(formatDate(measure.date));
    keys.forEach((k) => {
      if (!numbers[k]) {
        numbers[k] = [];
      }
      const x = measure[k as MeasureT] as number;
      numbers[k].push(x);
    });
  });

  return {
    labels,
    numbers,
  };
}

export function removeTypeName<T>(obj: { __typename?: string } & T): T {
  const newObj = { ...obj };
  delete newObj.__typename;
  return newObj;
}

export const isoFormatDate = (date: Date, withTime = false) =>
  `${dayjs(date).format('YYYY-MM-DD')}${withTime ? 'T00:00:00.000Z' : ''}`;
