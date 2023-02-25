import { BeStrongContext } from "../../context";

const getMember = async(parent: {memberCode: string} | null, args: {code: string} | null, context: BeStrongContext) => {
    const code = parent?.memberCode || args?.code || '';
    const { prisma } = context;
    const member = await prisma.member.findUnique({
        where: {
            code: code
        }
    });
    return member;
}

export default getMember;