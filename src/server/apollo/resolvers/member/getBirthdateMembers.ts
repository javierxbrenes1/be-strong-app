import { member } from '@prisma/client';
import dayjs from 'dayjs';
import { BeStrongContext } from '../../context';

const getBirthdateMembers = async (
  _parent: unknown,
  args: { date: string },
  context: BeStrongContext
): Promise<member[]> => {
  const { prisma } = context;

  const format = dayjs(args.date).format('MM-DD');

  const members = await prisma.$queryRaw<
    member[]
  >`SELECT * from app.member where to_char("birthDate", 'MM-DD') = ${format}`;
  return members;
};

export default getBirthdateMembers;
