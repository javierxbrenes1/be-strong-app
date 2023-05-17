import UpdateMemberArgs from '../../../../common/actionModels/UpdateMember';
import { BeStrongContext } from '../../context';

const updateMember = async (
  _p: unknown,
  args: { member: UpdateMemberArgs },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { code, ...memberDetails } = args.member;

  const updatedMember = await prisma.member.update({
    where: {
      code,
    },
    data: memberDetails,
  });

  return updatedMember;
};

export default updateMember;
