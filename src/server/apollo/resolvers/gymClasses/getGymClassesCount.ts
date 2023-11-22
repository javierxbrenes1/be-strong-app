import { BeStrongContext } from '../../context';

const getGymClassesCount = async (
  _parent: unknown,
  args: { year: number },
  context: BeStrongContext
): Promise<number> => {
  const { prisma } = context;
  const { year } = args;

  const classDate = {
    gte: new Date(`${year}-01-01`).toISOString(),
    lt: new Date(`${year + 1}-01-01`).toISOString(),
  };

  const counter = await prisma.gymClass.count({
    where: {
      classDate,
    },
  });

  return counter;
};

export default getGymClassesCount;
