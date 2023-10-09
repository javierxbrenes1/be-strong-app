import { BeStrongContext } from '../../context';

type Input = {
  memberCodes: string[];
  gymClassId: number;
  gymClassTimeId: number;
};

const removeMembersAttendances = async (
  parent: unknown,
  args: { input: Input },
  context: BeStrongContext
) => {
  const { memberCodes, gymClassId, gymClassTimeId } = args.input;
  const { prisma } = context;
  await prisma.memberAttendanceLog.deleteMany({
    where: {
      gymClassId,
      gymClassTimeId,
      memberCode: {
        in: memberCodes,
      },
    },
  });

  const gymClass = await prisma.gymClass.findUnique({
    where: {
      id: gymClassId,
    },
    include: {
      gymClassOnTimes: {
        include: {
          gymClassTime: true,
        },
      },
    },
  });

  return gymClass;
};

export default removeMembersAttendances;
