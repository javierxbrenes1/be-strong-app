import fastify from 'fastify';
import subscribeApollo from './apollo';
import registerAuth from './plugins/auth';

const server = fastify();

const start = async () => {
  try {
    await subscribeApollo(server);
    await registerAuth(server);

    const address = await server.listen({ port: 8080 });

    console.log(`Server listening at ${address}`);
  } catch (er) {
    server.log.error(er);
    console.log(er);
    process.exit(1);
  }
};

start();
