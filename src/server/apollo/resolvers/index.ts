import { mergeResolvers } from '@graphql-tools/merge';
import memberResolvers from './member';
import dateScalar from './dateScalar';
import memberAttendanceResolvers from './memberAttendance';
import memberMeasuresResolvers from './memberMeasures';
import gymClassesResolvers from './gymClasses';

const resolvers = mergeResolvers([
  memberResolvers,
  dateScalar,
  memberAttendanceResolvers,
  memberMeasuresResolvers,
  gymClassesResolvers,
]);

export default resolvers;
