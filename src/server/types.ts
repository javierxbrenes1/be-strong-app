import { FastifyInstance, FastifyRequest } from 'fastify';

export type ServerWithAuth = FastifyInstance & {
  authenticate: (request: FastifyRequest) => Promise<boolean>;
};
