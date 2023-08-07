import getAllMembers from './getAllMembers';
import getMember from './getMember';
import addMember from './addMember';
import updateMember from './updateMember';
import getMembersCount from './getMembersCount';
import getBirthdateMembers from './getBirthdateMembers';
import getFilteredMembers from './getFilteredMembers';
import getVisitMember from './getVisitMember';

const memberResolvers = {
  Query: {
    getAllMembers,
    getMember,
    getVisitMember,
    getMembersCount,
    getBirthdateMembers,
    getFilteredMembers,
  },
  Mutation: {
    addMember,
    updateMember,
  },
};

export default memberResolvers;
