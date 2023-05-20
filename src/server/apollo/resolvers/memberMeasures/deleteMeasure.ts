import { BeStrongContext } from '../../context';

export default async (
  _parent: unknown,
  args: { id: number },
  context: BeStrongContext
) => {
  const deletedMeasure = await context.prisma.memberMeasures.delete({
    where: {
      id: args.id,
    },
  });

  return deletedMeasure;
};
