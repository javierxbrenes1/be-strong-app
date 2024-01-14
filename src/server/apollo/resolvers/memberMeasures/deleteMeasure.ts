import { BeStrongContext } from '../../context';

export default async (
  _parent: unknown,
  args: { id: number; memberCode: string },
  context: BeStrongContext
) => {
  const { id, memberCode } = args;
  const deletedMeasure = await context.prisma.memberMeasures.delete({
    where: {
      id,
      memberCode,
    },
  });

  return deletedMeasure;
};
