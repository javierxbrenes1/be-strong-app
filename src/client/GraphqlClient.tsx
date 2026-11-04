import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  Reference,
} from '@apollo/client';

import { RetryLink } from '@apollo/client/link/retry';
import { ReactNode } from 'react';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { getAuthState } from './state/authState';

type MembersCache = {
  members: Reference[];
  pagination: unknown;
  keysToAvoidDuplicates: Record<string, boolean>;
};

const retryLink = new RetryLink({
  attempts: {
    max: 3,
  },
});

const httpLink = new HttpLink({
  uri: '/graphql',
});

const authLink = setContext(
  (_, { headers }: { headers?: Record<string, string> }) => {
    const token = getAuthState().jwt;
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : '',
      },
    };
  }
);

const logoutLink = onError((obj) => {
  const CODE = 'UNAUTHORIZED_USER';

  let hasUnauthorizedError = false;
  const { response, graphQLErrors } = obj;
  if (response) {
    const { errors } = response as { errors: GraphQLError[] };
    hasUnauthorizedError =
      errors &&
      errors?.length > 0 &&
      errors.some((e) => e?.extensions?.code === CODE);
  } else if (graphQLErrors) {
    hasUnauthorizedError =
      graphQLErrors?.length > 0 &&
      graphQLErrors.some((e) => e?.extensions?.code === CODE);
  }

  if (hasUnauthorizedError) {
    getAuthState().reset();
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([retryLink, authLink, logoutLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Member: {
        keyFields: ['code'],
      },
      EquipmentCategory: {
        keyFields: ['uuid'],
      },
      Equipment: {
        keyFields: ['uuid'],
      },
      Query: {
        fields: {
          getAllMembers: {
            keyArgs: false,
            merge(
              existing: MembersCache | undefined,
              incoming: MembersCache,
              { readField }
            ): MembersCache {
              const { pagination } = incoming;
              const keysToAvoidDuplicates = {
                ...(existing?.keysToAvoidDuplicates ?? {}),
              };
              const members = [...(existing?.members ?? [])];
              (incoming.members ?? []).forEach((m) => {
                const code = readField<string>('code', m);

                if (!code) {
                  members.push({ ...m });
                } else if (code && !keysToAvoidDuplicates[code]) {
                  keysToAvoidDuplicates[code] = true;
                  members.push({ ...m });
                }
              });
              return {
                members,
                pagination,
                keysToAvoidDuplicates,
              };
            },
          },
        },
      },
    },
  }),
});

function GraphqlClient(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export default GraphqlClient;
