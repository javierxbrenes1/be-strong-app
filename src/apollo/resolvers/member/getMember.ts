import { BeStrongContext } from "../../context";

const getMember = async(_parent: unknown, args: {code: string}, context: BeStrongContext) => {
    const { prisma } = context;
    const member = await prisma.member.findUnique({
        where: {
            code: args.code
        }
    });
    return member;
}

export default getMember;