import { PrismaClient } from '@prisma/client';
import Member from '../../../../client/models/Member';
import { BeStrongContext } from '../../context';

const queryForMember = async (member: Member, prisma: PrismaClient) => {
  const time = await prisma.member
    .findUnique({
      where: {
        code: member.code,
      },
    })
    .gymClassTime();

  return time;
};

export default async (
  parent: Member | null,
  args: { id: number } | null,
  context: BeStrongContext
) => {
  if (parent) {
    return queryForMember(parent, context.prisma);
  }

  if (!args) {
    throw new Error('No id found');
  }

  const response = await context.prisma.gymClassTime.findUnique({
    where: {
      id: args?.id,
    },
  });

  return response;
};
