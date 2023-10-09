import attendanceList from '../gymClasses/attendanceList';
import getMember from '../member/getMember';
import addMembersAttendances from './addMembersAttendances';
import getMemberAttendance from './getMemberAttendance';
import removeMembersAttendances from './removeMembersAttendances';

const memberAttendanceResolvers = {
  Query: {
    getMemberAttendance,
  },
  MemberAttendance: {
    member: getMember,
  },
  Mutation: {
    addMembersAttendances,
    removeMembersAttendances,
  },
  GymClass: {
    attendanceList,
  },
};

export default memberAttendanceResolvers;
