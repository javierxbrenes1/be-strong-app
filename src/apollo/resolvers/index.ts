const { mergeResolvers } = require('@graphql-tools/merge');
import memberResolvers from './member';
import dateScalar from './dateScalar';
import memberAttendanceResolvers from './memberAttendance';


 const resolvers = mergeResolvers([
    memberResolvers,
    dateScalar,
    memberAttendanceResolvers
]);

export default resolvers;