import { ApolloError } from '@apollo/client';
import dayjs from 'dayjs';
import Member from '../../common/models/Member';

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

export const formatDate = (date: number | Date): string => {
  const text = dayjs(date).locale('es').format('DD MMMM YYYY');
  return text
    .split(' ')
    .map((x) => x[0].toLocaleUpperCase() + x.substring(1))
    .join(' ');
};

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
