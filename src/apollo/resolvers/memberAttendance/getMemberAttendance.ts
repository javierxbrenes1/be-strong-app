import { BeStrongContext } from "../../context";

const getMemberAttendance = async(parent: {code: string} | null, args: {memberCode: string} | null, context: BeStrongContext) => {
    const code = parent?.code || args?.memberCode || '';
    const attendance = await context.prisma.memberAttendance.findUnique({
        where: {
            memberCode: code
        }
    });

    return attendance;
}

export default getMemberAttendance;