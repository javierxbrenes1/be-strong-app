import { BeStrongContext } from '../../context';

type Input = {
  memberCodes: string[];
  gymClassId: number;
  gymClassTimeId: number;
};

const addMembersAttendances = async (
  parent: unknown,
  args: { input: Input },
  context: BeStrongContext
) => {
  const { memberCodes, gymClassId, gymClassTimeId } = args.input;
  const { prisma } = context;
  await prisma.$transaction(
    memberCodes.map((memberCode) =>
      prisma.memberAttendanceLog.upsert({
        where: {
          memberCode,
          gymClassId,
          gymClassTimeId,
        },
        update: {},
        create: {
          memberCode,
          gymClassId,
          gymClassTimeId,
        },
      })
    )
  );

  return true;
};

export default addMembersAttendances;
