import getMemberAttendance from '../memberAttendance/getMemberAttendance';
import getAllMembers from './getAllMembers';
import getMember from './getMember';
import getMemberMeasures from './getMemberMeasures';
import addMember from './addMember';
import updateMember from './updateMember';
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
    memberMeasures: getMemberMeasures,
  },
  Mutation: {
    addMember,
    updateMember,
  },
};

export default memberResolvers;
