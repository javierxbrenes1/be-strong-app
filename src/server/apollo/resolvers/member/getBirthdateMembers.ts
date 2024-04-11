import dayjs from 'dayjs';
import { BeStrongContext } from '../../context';
import Member from '../../../../common/models/Member';

const getBirthdateMembers = async (
  _parent: unknown,
  args: { date: string },
  context: BeStrongContext
): Promise<Member[]> => {
  const { prisma } = context;

  const format = dayjs(args.date).format('MM-DD');
  const members = await prisma.$queryRaw<
    Member[]
  >`SELECT * from app.member where "isActive" = TRUE and to_char("birthDate", 'MM-DD') = ${format}`;
  return members;
};

export default getBirthdateMembers;
