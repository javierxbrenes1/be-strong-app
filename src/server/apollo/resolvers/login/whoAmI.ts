import { AuthenticatedRequest } from '../../../types';
import { BeStrongContext } from '../../context';

const whoAmI = async (
  _p: unknown,
  _args: unknown,
  context: BeStrongContext
) => {
  const { prisma, request } = context;
  const { user } = request as AuthenticatedRequest;

  const details = await prisma.ownerUser.findUnique({
    where: {
      username: user.username,
    },
    select: {
      username: true,
      role: true,
      email: true,
      isBlocked: true,
      lastPasswordChangeDate: true,
      name: true,
    },
  });

  return details;
};

export default whoAmI;
