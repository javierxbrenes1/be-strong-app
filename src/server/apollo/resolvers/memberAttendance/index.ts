import attendanceList from '../gymClasses/attendanceList';
import getMember from '../member/getMember';
import addMembersAttendances from './addMembersAttendances';
import getMemberAttendance from './getMemberAttendance';
import getMemberAttendanceLogByYear from './getMemberAttendanceLogByYear';
import getMemberAttendanceLogsDetails from './getMemberAttendanceLogsDetails';
import removeMembersAttendances from './removeMembersAttendances';

const memberAttendanceResolvers = {
  Query: {
    getMemberAttendance,
    getMemberAttendanceLogByYear,
    getMemberAttendanceLogsDetails,
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
