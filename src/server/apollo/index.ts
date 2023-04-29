import { ApolloServer } from '@apollo/server';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { FastifyInstance } from 'fastify';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { BeStrongContext, beStrongContextFunction } from './context';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import authDirectiveTransformer from './directives/auth';

const subscribeApollo = async (server: FastifyInstance) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const apolloServer = new ApolloServer<BeStrongContext>({
    schema: authDirectiveTransformer(schema, 'auth'),
    plugins: [fastifyApolloDrainPlugin(server)],
  });

  await apolloServer.start();

  await server.register(fastifyApollo(apolloServer), {
    context: beStrongContextFunction,
  });
};

export default subscribeApollo;
