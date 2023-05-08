import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from '@apollo/client';

import { RetryLink } from '@apollo/client/link/retry';
import { ReactNode } from 'react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { getAuthState } from './state/authState';

const retryLink = new RetryLink({
  attempts: {
    max: 3,
  },
});

const httpLink = new HttpLink({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  uri: import.meta.env.VITE_GRAPHQL_URsL,
});

const authLink = setContext((_, { headers }) => {
  const token = getAuthState().jwt;
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : '',
    },
  };
});

const logoutLink = onError(({ response }) => {
  const { errors } = response as { errors: GraphQLError[] };

  const hasUnauthorizedError =
    errors &&
    errors.length > 0 &&
    errors.some((e) => e.extensions.code === 'UNAUTHORIZED_USER');
  console.log({ hasUnauthorizedError });
  if (hasUnauthorizedError) {
    getAuthState().reset();
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([retryLink, authLink, logoutLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Member: {
        keyFields: ['code'],
      },
    },
  }),
});

function GraphqlClient(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphqlClient;
