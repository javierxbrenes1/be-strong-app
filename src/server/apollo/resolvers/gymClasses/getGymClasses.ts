import dayjs from 'dayjs';
import { getIsoTime } from '../../../utils/dateshelper';
import { BeStrongContext } from '../../context';

const getGymClasses = async (
  _parent: unknown,
  args: { gte: string; lt: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { gte, lt } = args;

  const filters = {
    gte: getIsoTime(gte),
    lt: lt ? getIsoTime(lt) : dayjs(gte).add(1, 'day').toISOString(),
  };

  const classes = await prisma.gymClass.findMany({
    where: {
      classDate: filters,
    },
    orderBy: [
      {
        classDate: 'desc',
      },
    ],
    include: {
      gymClassOnTimes: {
        include: {
          gymClassTime: true,
        },
      },
    },
  });

  return classes.map((r) => ({
    ...r,
    classDate: r.classDate?.toISOString().split('T')[0],
  }));
};

export default getGymClasses;
