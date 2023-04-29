/* eslint-disable prettier/prettier */
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { ServerWithAuth } from '../../types';
import { BeStrongContext } from '../context';

function authDirectiveTransformer(schema: GraphQLSchema, directiveName: string) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;
        // Replace the original resolver with a function that *first* checks if user
        // is authenticated, then resolves the field
        fieldConfig.resolve = async function (source, args, context, info) {

            const {server, request} = context as BeStrongContext;
            const authenticatedServer = server as ServerWithAuth;

            try {
                await authenticatedServer.authenticate(request); 
            }catch(err) {
                throw new GraphQLError('user unauthorized', {
                    extensions: {
                        code: 'UNAUTHORIZED_USER'
                    }
                })
            }
            const result = await resolve(source, args, context, info);
            return result;
        };
        return fieldConfig;
      }
    },
  });
}

export default authDirectiveTransformer;