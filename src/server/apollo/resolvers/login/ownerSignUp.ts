import bcrypt from 'bcrypt';
import { BeStrongContext } from '../../context';

type InputType = {
  username: string;
  pwd: string;
  role: string;
};

const ownerSignUp = async (
  _p: unknown,
  args: { input: InputType },
  context: BeStrongContext
) => {
  const { input } = args;
  const { prisma, saltRounds } = context;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPwd = await bcrypt.hash(input.pwd, salt);

  try {
    await prisma.ownerUser.create({
      data: {
        ...input,
        pwd: hashedPwd,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
};

export default ownerSignUp;
