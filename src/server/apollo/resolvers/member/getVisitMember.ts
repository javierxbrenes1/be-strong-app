import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';

const getVisitMember = async (
  _parent: unknown,
  args: { code: string },
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;
  const { code } = args;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const select = new PrismaSelect(info).value;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (select?.select?.lastMeasure) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete select.select.lastMeasure;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const member = await prisma.member.findUnique({
    where: {
      code,
    },
    ...select,
  });

  return member;
};

export default getVisitMember;
