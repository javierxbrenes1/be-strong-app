import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';
import { parseMemberFilter } from './memberFilter';

const getFilteredMembers = async (
  _parent: unknown,
  args: { column: string; comparator: string; filter: string },
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;
  const { filter } = args;
  const { column, comparator } = parseMemberFilter(
    args.column,
    args.comparator
  );

  const where = {
    isActive: true,
    [column]: {
      [comparator]: filter,
      mode: 'insensitive',
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const select = new PrismaSelect(info).value;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const members = await prisma.member.findMany({ where, ...select });

  return members;
};

export default getFilteredMembers;
