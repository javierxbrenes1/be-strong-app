import { BeStrongContext } from '../../context';

const createCode = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz012345678';
  const code = [];
  for (let i = 0; i <= 6; i++) {
    const random = Math.floor(Math.random() * (chars.length - 1));
    code.push(chars[random]);
  }
  return `BS-${code.join('')}`;
};

type AddMemberArgs = {
  name: string;
  birthDate: Date;
  height: number;
  genre: string;
  observations?: string;
};
export const addMember = async (
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
