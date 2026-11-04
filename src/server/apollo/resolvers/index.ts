import { mergeResolvers } from '@graphql-tools/merge';
import memberResolvers from './member';
import dateScalar from './dateScalar';
import localScalars from './localScalars';
import memberAttendanceResolvers from './memberAttendance';
import memberMeasuresResolvers from './memberMeasures';
import gymClassesResolvers from './gymClasses';
import loginResolvers from './login';
import gymClassTimeResolvers from './gymClassTime';
import equipmentResolvers from './equipment';
import homeResolvers from './home';

const resolvers = [
  memberResolvers,
  dateScalar,
  localScalars,
  memberAttendanceResolvers,
  memberMeasuresResolvers,
  gymClassesResolvers,
  loginResolvers,
  gymClassTimeResolvers,
  equipmentResolvers,
  homeResolvers,
];

export default mergeResolvers(resolvers);
