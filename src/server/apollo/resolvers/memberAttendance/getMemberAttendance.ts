import { BeStrongContext } from '../../context';

const getMemberAttendance = (
  parent: { code: string } | null,
  args: { memberCode: string } | null,
  context: BeStrongContext
) => {
  const code = parent?.code || args?.memberCode || '';
  const attendance = context.prisma.memberAttendance.findUnique({
    where: {
      memberCode: code,
    },
  });

  return attendance;
};

export default getMemberAttendance;
