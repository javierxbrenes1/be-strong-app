import getMemberAttendance from "../memberAttendance/getMemberAttendance";
import getAllMembers from "./getAllMembers";
import getMember from "./getMember";

const memberResolvers = {
	Query: {
		getAllMembers,
        getMember
	},
	Member:{
		memberAttendance: getMemberAttendance
	}
};

export default memberResolvers;