import bcrypt from 'bcrypt';
import { BeStrongContext } from '../../context';
import { AuthenticatedRequest } from '../../../types';

const updatePwd = async (
  _p: unknown,
  args: { pwd: string },
  context: BeStrongContext
) => {
  const { prisma, saltRounds, request } = context;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(args.pwd, salt);
  const { user } = request as AuthenticatedRequest;

  try {
    await prisma.ownerUser.update({
      data: {
        pwd: hashedPwd,
        lastPasswordChangeDate: new Date(),
      },
      where: {
        username: user.username,
        role: user.role,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default updatePwd;
