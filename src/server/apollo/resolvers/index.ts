import { mergeResolvers } from '@graphql-tools/merge';
import memberResolvers from './member';
import dateScalar from './dateScalar';
import memberAttendanceResolvers from './memberAttendance';
import memberMeasuresResolvers from './memberMeasures';
import gymClassesResolvers from './gymClasses';
import loginResolvers from './login';
import gymClassTimeResolvers from './gymClassTime';

const resolvers = [
  memberResolvers,
  dateScalar,
  memberAttendanceResolvers,
  memberMeasuresResolvers,
  gymClassesResolvers,
  loginResolvers,
  gymClassTimeResolvers,
];

export default mergeResolvers(resolvers);
