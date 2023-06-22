import UpdateMemberArgs from '../../../../common/actionModels/UpdateMember';
import { BeStrongContext } from '../../context';

const updateMember = async (
  _p: unknown,
  args: { member: UpdateMemberArgs },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { code, memberAttendance, ...memberDetails } = args.member;

  const data = {
    ...memberDetails,
    ...(memberAttendance
      ? {
          memberAttendance: {
            update: {
              ...memberAttendance,
            },
          },
        }
      : {}),
  };

  const include = memberAttendance ? { memberAttendance: true } : undefined;

  const updatedMember = await prisma.member.update({
    where: {
      code,
    },
    data,
    include,
  });

  return updatedMember;
};

export default updateMember;
