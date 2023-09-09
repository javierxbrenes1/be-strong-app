import GymClass from '../../../../common/models/GymClass';
import Member from '../../../../common/models/Member';
import { BeStrongContext } from '../../context';

export default async (
  parent: GymClass,
  _args: unknown,
  context: BeStrongContext
) => {
  const { prisma } = context;

  const result = await prisma.gymClass.findUnique({
    where: {
      id: parent.id,
    },
    include: {
      memberAttendanceLog: {
        include: {
          member: true,
        },
      },
    },
  });

  const { memberAttendanceLog = [] } = result || {};
  const map = new Map<number, Member[]>();
  memberAttendanceLog.forEach((m) => {
    const { gymClassTimeId, member } = m;
    const array = map.get(gymClassTimeId) || [];

    map.set(m.gymClassTimeId, [...array, member as Member]);
  });

  const attendanceList = [];
  for (const [gymClassTimeId, members] of map.entries()) {
    attendanceList.push({
      gymClassTimeId,
      members,
    });
  }

  return attendanceList; // result?.memberAttendanceLog?.map((r) => r.member) || [];
};
