import getMemberAttendance from '../memberAttendance/getMemberAttendance';
import getAllMembers from './getAllMembers';
import getMember from './getMember';
import getMemberMeasure from './getMemberMeasures';
import addMember from './addMember';
import getMembersCount from './getMembersCount';
import getBirthdateMembers from './getBirthdateMembers';
import getFilteredMembers from './getFilteredMembers';

const memberResolvers = {
  Query: {
    getAllMembers,
    getMember,
    getMembersCount,
    getBirthdateMembers,
    getFilteredMembers,
  },
  Member: {
    memberAttendance: getMemberAttendance,
    memberMeasures: getMemberMeasure,
  },
  Mutation: {
    addMember,
  },
};

export default memberResolvers;
