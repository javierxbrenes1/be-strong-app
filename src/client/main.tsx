import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import App from './App';

// palette #edc951 • #eb6841 • #cc2a36 • #4f372d • #00a0b0
const retryLink = new RetryLink({
  attempts: {
    max: 1,
  },
});

const httpLink = new HttpLink({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  uri: import.meta.env.VITE_GRAPHQL_URL,
});

const client = new ApolloClient({
  link: ApolloLink.from([retryLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
