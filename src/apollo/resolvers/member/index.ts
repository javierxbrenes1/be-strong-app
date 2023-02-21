import getMemberAttendance from "../memberAttendance/getMemberAttendance";
import getAllMembers from "./getAllMembers";
import getMember from "./getMember";
import { getMemberMeasure } from "./getMemberMeasures";

const memberResolvers = {
	Query: {
		getAllMembers,
        getMember
	},
	Member:{
		memberAttendance: getMemberAttendance,
		memberMeasures: getMemberMeasure
	}
};

export default memberResolvers;