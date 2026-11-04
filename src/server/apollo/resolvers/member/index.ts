import getAllMembers from './getAllMembers';
import getAllInactiveMembers from './getAllInactiveMembers';
import getMember from './getMember';
import addMember from './addMember';
import updateMember from './updateMember';
import getMembersCount from './getMembersCount';
import getBirthdateMembers from './getBirthdateMembers';
import getFilteredMembers from './getFilteredMembers';
import getVisitMember from './getVisitMember';
import { BeStrongContext } from '../../context';
import getLastMeasure from '../memberMeasures/getLastMeasure';

const memberResolvers = {
  Member: {
    lastMeasure: getLastMeasure,
    lastAttendanceDate: async (
      parent: { code: string },
      _args: unknown,
      ctx: BeStrongContext
    ) => (await ctx.loaders.memberSummary.load(parent.code)).lastAttendanceDate,
    currentWeight: async (
      parent: { code: string },
      _args: unknown,
      ctx: BeStrongContext
    ) => (await ctx.loaders.memberSummary.load(parent.code)).currentWeight,
  },
  VisitMember: {
    lastMeasure: getLastMeasure,
  },
  Query: {
    getAllMembers,
    getAllInactiveMembers,
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
