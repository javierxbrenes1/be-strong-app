import { ApolloError } from '@apollo/client';

export const createAvatarLink = (name: string): string =>
  `https://ui-avatars.com/api/?name=${name}&background=random`;

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
