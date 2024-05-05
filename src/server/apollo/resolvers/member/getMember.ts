import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';

const getMember = async (
  parent: { memberCode: string } | null,
  args: { code: string } | null,
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const code = parent?.memberCode || args?.code || '';
  const { prisma } = context;

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

export default getMember;
