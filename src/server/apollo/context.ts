import { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export interface BeStrongContext {
  server: FastifyInstance;
  prisma: PrismaClient;
  saltRounds: number;
}

export const beStrongContextFunction: ApolloFastifyContextFunction<
  BeStrongContext
> = async (request, reply) => ({
  server: request.server,
  prisma,
  saltRounds: 8,
});
