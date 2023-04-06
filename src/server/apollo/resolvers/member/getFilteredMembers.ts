import { BeStrongContext } from '../../context';

const getFilteredMembers = async (
  _parent: unknown,
  args: { column: string; comparator: string; filter: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { column, comparator, filter } = args;

  const where = {
    isActive: true,
    [column]: {
      [comparator]: filter,
      mode: 'insensitive',
    },
  };
  console.log(where);

  const members = await prisma.member.findMany({ where });

  return members;
};

export default getFilteredMembers;
