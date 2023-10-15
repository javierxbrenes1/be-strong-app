import { BeStrongContext } from '../../context';

async function addTimes(
  _parent: unknown,
  args: { classId: number; timeIds: number[] },
  context: BeStrongContext
) {
  const { prisma } = context;
  const { classId, timeIds } = args;

  const data = timeIds.map((t) => ({
    gymClassTimeId: t,
    gymClassId: classId,
  }));

  await prisma.gymClassOnTimes.createMany({
    data,
    skipDuplicates: true,
  });

  const gymClass = await prisma.gymClass.findUnique({
    where: {
      id: classId,
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
}

export default addTimes;
