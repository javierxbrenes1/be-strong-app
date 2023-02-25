import getMemberAttendance from "../memberAttendance/getMemberAttendance";
import getAllMembers from "./getAllMembers";
import getMember from "./getMember";
import { getMemberMeasure } from "./getMemberMeasures";
import {addMember} from './addMember';

const memberResolvers = {
	Query: {
		getAllMembers,
        getMember
	},
	Member:{
		memberAttendance: getMemberAttendance,
		memberMeasures: getMemberMeasure
	},
	Mutation: {
		addMember
	}
};

export default memberResolvers;