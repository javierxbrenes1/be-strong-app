import { BeStrongContext } from '../../context';

const getGymClassTypes = async (
  _parent: unknown,
  _args: unknown,
  context: BeStrongContext
): Promise<string[]> => {
  const rows = await context.prisma.gymClass.findMany({
    where: { classType: { not: null } },
    distinct: ['classType'],
    select: { classType: true },
    orderBy: { classType: 'asc' },
  });
  return rows.map((r) => r.classType as string);
};

export default getGymClassTypes;
