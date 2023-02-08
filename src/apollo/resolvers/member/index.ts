import getAllMembers from "./getAllMembers";
import getMember from "./getMember";

const memberResolvers = {
	Query: {
		getAllMembers,
        getMember
	}
};

export default memberResolvers;