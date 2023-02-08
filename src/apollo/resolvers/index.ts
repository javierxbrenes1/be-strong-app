const { mergeResolvers } = require('@graphql-tools/merge');
import memberResolvers from './member';
import dateScalar from './dateScalar';


 const resolvers = mergeResolvers([
    memberResolvers,
    dateScalar
]);

export default resolvers;