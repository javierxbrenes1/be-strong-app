import { BeStrongContext } from '../../context';

const getMembersCount = async (
  _parent: unknown,
  _args: unknown,
  context: BeStrongContext
): Promise<number> => {
  const { prisma } = context;
  const total = await prisma.member.count({
    where: {
      isActive: true,
    },
  });
  return total;
};

export default getMembersCount;
