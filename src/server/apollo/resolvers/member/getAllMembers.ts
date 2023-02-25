import { BeStrongContext } from "../../context";

const getAllMembers = async (_parent: unknown, args: {offset: number, limit: number}, context: BeStrongContext) => {
    const { prisma } = context;
    // total elements
    const totalMembers = await prisma.member.count({
        where: {
            isActive: true
        }
    });
    const { offset, limit } = args;
    const members = await prisma.member.findMany({
        where:{
            isActive: true,
        },
        skip: offset,
        take: limit
    });

    let nextPageStart = limit + offset;
    nextPageStart = nextPageStart >= totalMembers ? -1 : nextPageStart;

    return {
        members,
        pagination: {
            total: totalMembers,
            pageSize: limit,
            nextPageStart,
            totalPages: Math.ceil(totalMembers / limit)
        }
    }
    
}

export default getAllMembers;