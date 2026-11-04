import { addDays } from '../../../../common/dates';
import { BeStrongContext } from '../../context';
import { prismaDateToLocalDate } from '../localScalars';

const getGymClasses = async (
  _parent: unknown,
  args: { gte: Date; lt?: Date | null }, // LocalDate scalar → 00:00Z
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { gte, lt } = args;

  return prisma.gymClass.findMany({
    where: {
      classDate: {
        gte,
        lt:
          lt ?? new Date(`${addDays(prismaDateToLocalDate(gte), 1)}T00:00:00Z`),
      },
    },
    orderBy: [{ classDate: 'desc' }],
    include: {
      gymClassOnTimes: {
        include: {
          gymClassTime: true,
        },
      },
    },
  });
};

export default getGymClasses;
