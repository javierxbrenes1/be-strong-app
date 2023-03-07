import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppRoutes from './AppRoutes';

const client = new ApolloClient({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

console.log({ here: import.meta.env });

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AppRoutes />
      </div>
    </ApolloProvider>
  );
}

export default App;
