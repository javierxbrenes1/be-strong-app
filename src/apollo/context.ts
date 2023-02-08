import { ApolloFastifyContextFunction } from "@as-integrations/fastify";
import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface BeStrongContext {
	server: FastifyInstance;
	prisma: PrismaClient
}

export const beStrongContextFunction: ApolloFastifyContextFunction<BeStrongContext> = async (
	request,
	reply,
) => ({
	server: request.server,
	prisma: prisma
});