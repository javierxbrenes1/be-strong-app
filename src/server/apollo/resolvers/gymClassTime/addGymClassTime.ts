import { BeStrongContext } from '../../context';

export default async (
  _: unknown,
  args: { isoTime: string },
  context: BeStrongContext
) => {
  const { prisma } = context;

  const response = await prisma.gymClassTime.create({
    data: args,
  });

  return response;
};
