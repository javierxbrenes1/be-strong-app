import fastify from 'fastify';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import subscribeApollo from './apollo';
import registerAuth from './plugins/auth';

const server = fastify();

const start = async () => {
  try {
    await subscribeApollo(server);
    await registerAuth(server);

    await server.register(cors, {
      // put your options here
      origin: false,
    });

    await server.register(compress);

    const address = await server.listen({ port: 8080 });

    console.log(`Server listening at ${address}`);
  } catch (er) {
    server.log.error(er);
    console.log(er);
    process.exit(1);
  }
};

start();
