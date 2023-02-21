const { mergeResolvers } = require('@graphql-tools/merge');
import memberResolvers from './member';
import dateScalar from './dateScalar';
import memberAttendanceResolvers from './memberAttendance';
import memberMeasuresResolvers from './memberMeasures';

 const resolvers = mergeResolvers([
    memberResolvers,
    dateScalar,
    memberAttendanceResolvers,
    memberMeasuresResolvers
]);

export default resolvers;