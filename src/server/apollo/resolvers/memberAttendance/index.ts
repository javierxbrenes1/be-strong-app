import getMember from "../member/getMember";
import getMemberAttendance from "./getMemberAttendance";

const memberAttendanceResolvers = {
	Query: {
		getMemberAttendance
	},
    MemberAttendance: {
        member: getMember
    }
};

export default memberAttendanceResolvers;