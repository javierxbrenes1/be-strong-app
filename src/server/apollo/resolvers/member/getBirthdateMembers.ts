import { member } from '@prisma/client';
import { BeStrongContext } from '../../context';

const getBirthdateMembers = async (
  _parent: unknown,
  args: { date: Date },
  context: BeStrongContext
): Promise<member[]> => {
  const { prisma } = context;
  const month = String(args.date.getMonth() + 1).padStart(2, '0');
  const day = String(args.date.getDate()).padStart(2, '0');
  const filter = `${month}-${day}`;

  const members = await prisma.$queryRaw<
    member[]
  >`SELECT * from app.member where to_char("birthDate", 'MM-DD') = ${filter}`;
  return members;
};

export default getBirthdateMembers;
