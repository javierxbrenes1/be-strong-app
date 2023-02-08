import { GraphQLScalarType, Kind } from 'graphql';

export default { 
  Date: new GraphQLScalarType<Date | null, number>({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date | unknown) {
      return (value as Date).getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: number | unknown) {
      if(typeof value !== 'number') {
        return null
      }
      return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    },
  })
}

