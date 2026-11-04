import { BeStrongContext } from '../../context';
import Member from '../../../../common/models/Member';
import { todayLocalDate } from '../../../../common/dates';
import { prismaDateToLocalDate } from '../localScalars';

const getBirthdateMembers = async (
  _parent: unknown,
  args: { date?: Date | null },
  context: BeStrongContext
): Promise<Member[]> => {
  const { prisma } = context;

  const day = args.date ? prismaDateToLocalDate(args.date) : todayLocalDate();
  const monthDay = day.slice(5); // 'MM-DD'
  const members = await prisma.$queryRaw<
    Member[]
  >`SELECT * from app.member where "isActive" = TRUE and to_char("birthDate", 'MM-DD') = ${monthDay}`;
  return members;
};

export default getBirthdateMembers;
