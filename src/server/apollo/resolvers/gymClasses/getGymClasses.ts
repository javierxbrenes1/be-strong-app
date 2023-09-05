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

  console.log(filters);

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

  return classes;
};

export default getGymClasses;
