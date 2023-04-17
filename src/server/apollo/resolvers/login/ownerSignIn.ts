import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { BeStrongContext } from '../../context';

type InputType = {
  username: string;
  pwd: string;
};

const generalMessage = 'Usuario o Contraseña Incorrectos';

const ownerSignIn = async (
  _p: unknown,
  args: { input: InputType },
  context: BeStrongContext
) => {
  const { prisma, server } = context;
  const { input } = args;
  const user = await prisma.ownerUser.findUnique({
    where: {
      username: input.username,
    },
  });

  if (!user) {
    throw new GraphQLError(generalMessage, {
      extensions: {
        code: 'UNKNOWN_USER',
      },
    });
  }

  const isPwdCorrect = await bcrypt.compare(input.pwd, user.pwd);
  if (!isPwdCorrect) {
    throw new GraphQLError(generalMessage, {
      extensions: {
        code: 'UNKNOWN_USER',
      },
    });
  }

  await prisma.ownerUser.update({
    data: {
      lastLoginDate: new Date(),
    },
    where: {
      username: input.username,
    },
  });

  return {
    jwt: server.jwt.sign({ username: user.username, role: user.role }),
  };
};

export default ownerSignIn;
