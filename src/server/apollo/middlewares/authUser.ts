/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FastifyInstance, FastifyRequest } from 'fastify';
import { GraphQLError } from 'graphql';
import { IResolvers } from 'graphql-middleware/dist/types';
import { BeStrongContext } from '../context';

type ServerWithAuth = FastifyInstance & {
  authenticate: (request: FastifyRequest) => Promise<boolean>;
};

async function authUserMiddleware(
  resolve: (parent: any, args: any, context: BeStrongContext, info: any) => any,
  root: any,
  args: any,
  context: BeStrongContext,
  info: any
): Promise<any> {
  const { server, request } = context;
  const serverWithAuth = server as ServerWithAuth;
  try {
    await serverWithAuth.authenticate(request);
  } catch (err) {
    throw new GraphQLError('user unauthorized', {
      extensions: {
        code: 'UNATHORIZED_USER',
      },
    });
  }
  const result = await resolve(root, args, context, info);
  return result;
}

export default authUserMiddleware;
