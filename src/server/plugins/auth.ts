import { FastifyInstance, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { getSecretKey } from './secretKey';

async function registerAuth(server: FastifyInstance) {
  await server.register(fastifyJwt, {
    secret: getSecretKey(),
    sign: {
      algorithm: 'HS512',
      expiresIn: '2 days',
    },
  });

  server.decorate('authenticate', async (request: FastifyRequest) => {
    await request.jwtVerify();
  });
}

export default registerAuth;
