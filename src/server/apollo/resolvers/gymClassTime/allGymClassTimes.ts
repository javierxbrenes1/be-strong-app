import { BeStrongContext } from '../../context';

export default async (
  _parent: unknown,
  _args: unknown,
  context: BeStrongContext
) => {
  const response = await context.prisma.gymClassTime.findMany();
  return response;
};
