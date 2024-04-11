import { BeStrongContext } from '../../context';

const createCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz012345678';
  const code = [];
  for (let i = 0; i <= 6; i += 1) {
    const random = Math.floor(Math.random() * (chars.length - 1));
    code.push(chars[random]);
  }
  return `BS-${code.join('')}`;
};

type AddMemberArgs = {
  avatar?: string;
  name: string;
  birthDate?: Date;
  birthDateAsString?: string;
  height?: number;
  genre?: string;
  observations?: string;
};

const addMember = async (
  _p: unknown,
  args: { member: AddMemberArgs },
  context: BeStrongContext
) => {
  const data = {
    code: createCode(),
    isActive: true,
    ...args.member,
  };
  const newUser = await context.prisma.member.create({ data });
  return newUser;
};

export default addMember;
