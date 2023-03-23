import { BeStrongContext } from '../../context';

const getGymClassesCount = async (
  _parent: unknown,
  args: { year: number },
  context: BeStrongContext
): Promise<number> => {
  const { prisma } = context;
  const { year } = args;

  const counter = await prisma.gymClass.count({
    where: {
      classDate: {
        gte: new Date(`${year}-01-01 00:00:00`),
        lte: new Date(`${year}-12-31 23:59:59`),
      },
    },
  });

  return counter;
};

export default getGymClassesCount;
