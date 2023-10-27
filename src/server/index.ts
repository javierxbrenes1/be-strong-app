import fastify from 'fastify';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import fastifyStatic from '@fastify/static';
import path from 'path';
import subscribeApollo from './apollo';
import registerAuth from './plugins/auth';
import { PATHS } from '../common/enums';

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

    if (process.env.NODE_ENV === 'production') {
      ['assets', 'images'].forEach((t, index) => {
        server.register(fastifyStatic, {
          root: path.join(__dirname, `../../../dist/${t}`),
          prefix: `/${t}`,
          decorateReply: index === 0,
        });
      });

      Object.values(PATHS).forEach((p: string) => {
        server.get(p, (req, reply) =>
          reply.sendFile('index.html', path.join(__dirname, '../../../dist/'), {
            cacheControl: false,
          })
        );
      });
    }

    const address = await server.listen({ port: 8080 });

    console.log(`Server listening at ${address}`);
    console.log(server.printRoutes());
  } catch (er) {
    server.log.error(er);
    console.log(er);
    process.exit(1);
  }
};

start();
