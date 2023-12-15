import dayjs from 'dayjs';
import { BeStrongContext } from '../../context';

const getMemberAttendanceClasses = async (
  _parent: unknown,
  args: { memberCode: string; order: 'asc' | 'desc'; take: number },
  context: BeStrongContext
) => {
  const { memberCode, order = 'asc', take } = args;
  const { prisma } = context;
  const data = await prisma.memberAttendanceLog.findMany({
    include: {
      gymClass: true,
      gymClassTime: true,
    },
    where: {
      memberCode,
    },
    orderBy: {
      gymClass: {
        classDate: order,
      },
    },
    ...(take ? { take } : {}),
  });

  return data.map((d) => {
    const { isoTime } = d.gymClassTime;
    const { id, classDate, ...gymClass } = d.gymClass;
    return {
      isoTime,
      classDate: dayjs(classDate).toISOString().split('T')[0],
      ...gymClass,
    };
  });
};

export default getMemberAttendanceClasses;
