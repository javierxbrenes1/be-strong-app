import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';

const isProd = process.env.NODE_ENV === 'production';
const prisma = new PrismaClient({
  log: !isProd ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
});

if (!isProd) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /** @ts-ignore */
  prisma.$on('query', (e) => {
    console.log(e);
  });
}
export interface BeStrongContext {
  server: FastifyInstance;
  prisma: PrismaClient;
  saltRounds: number;
  request: FastifyRequest;
}

export const beStrongContextFunction: ApolloFastifyContextFunction<
  BeStrongContext
  // eslint-disable-next-line @typescript-eslint/require-await
> = async (request) => ({
  request,
  server: request.server,
  prisma,
  saltRounds: 8,
});
