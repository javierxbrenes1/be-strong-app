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

  return data.map(
    (d: {
      gymClass: {
        id: number;
        classDate: Date | null;
        classDurationInMinutes: number | null;
        classType: string | null;
        classDescription: string | null;
      };
      gymClassTime: {
        id: number;
        localTime: string;
      };
    }) => {
      const { localTime } = d.gymClassTime;
      const { id, ...gymClass } = d.gymClass;
      return { localTime, ...gymClass };
    }
  );
};

export default getMemberAttendanceClasses;
