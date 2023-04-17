import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fastifyJwt from '@fastify/jwt';

async function registerAuth(server: FastifyInstance) {
  await server.register(fastifyJwt, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    secret: process.env.SECRET_KEY || 'supersecret',
    sign: {
      expiresIn: '2 days',
    },
  });

  server.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
}

export default registerAuth;
