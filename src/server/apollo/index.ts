import { ApolloServer, BaseContext } from '@apollo/server';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { FastifyInstance } from 'fastify';
import { BeStrongContext, beStrongContextFunction } from './context';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const subscribeApollo = async (server: FastifyInstance) => {
  const apolloServer = new ApolloServer<BeStrongContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(server)],
  });

  await apolloServer.start();

  await server.register(fastifyApollo(apolloServer), {
    context: beStrongContextFunction,
  });
};

export default subscribeApollo;
