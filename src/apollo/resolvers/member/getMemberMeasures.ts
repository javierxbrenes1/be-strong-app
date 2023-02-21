import { member } from "@prisma/client";
import { BeStrongContext } from "../../context";

export const getMemberMeasure = (parent: member, args: {last: number}, context: BeStrongContext) => {
    const { prisma } = context;
    const memberCode = parent.code;
    const measures = prisma.member.findUnique({
        where: {
            code: memberCode
        }
    }).memberMeasures({
        orderBy: {
            date: 'desc'
        },
        take: args.last
    });

    return measures;
}