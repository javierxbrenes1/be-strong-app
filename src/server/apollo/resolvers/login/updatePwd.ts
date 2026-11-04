import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { BeStrongContext } from '../../context';
import { AuthenticatedRequest } from '../../../types';
import { isStrongPassword } from '../../../../common/passwordPolicy';

const badInput = (message: string) =>
  new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });

const updatePwd = async (
  _p: unknown,
  args: { currentPwd: string; pwd: string },
  context: BeStrongContext
) => {
  const { prisma, saltRounds, request } = context;
  const { user } = request as AuthenticatedRequest;

  if (!isStrongPassword(args.pwd)) {
    throw badInput('La contraseña no cumple los requisitos.');
  }

  const owner = await prisma.ownerUser.findUnique({
    where: { username: user.username },
  });
  if (!owner || !(await bcrypt.compare(args.currentPwd, owner.pwd))) {
    throw badInput('La contraseña actual es incorrecta.');
  }

  await prisma.ownerUser.update({
    data: {
      pwd: await bcrypt.hash(args.pwd, await bcrypt.genSalt(saltRounds)),
      lastPasswordChangeDate: new Date(),
    },
    where: { username: user.username },
  });
  return true;
};

export default updatePwd;
