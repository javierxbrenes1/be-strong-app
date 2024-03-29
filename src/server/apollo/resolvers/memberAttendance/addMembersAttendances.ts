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
          memberCode_gymClassId_gymClassTimeId: {
            memberCode,
            gymClassId,
            gymClassTimeId,
          },
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

export default addMembersAttendances;
