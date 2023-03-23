import { BeStrongContext } from '../../context';

const getGymClasses = async (
  _parent: unknown,
  args: { gte: Date; lte?: Date },
  context: BeStrongContext
) => {
  const { prisma } = context;

  const { gte, lte } = args;
  gte.setHours(0, 0, 0);
  const lteDate = lte || new Date(gte);
  lteDate.setHours(23, 59, 59);

  const classes = await prisma.gymClass.findMany({
    where: {
      classDate: {
        gte,
        lte: lteDate,
      },
    },
    orderBy: [
      {
        classDate: 'desc',
      },
      {
        classTime: 'asc',
      },
    ],
  });

  return classes;
};

export default getGymClasses;
