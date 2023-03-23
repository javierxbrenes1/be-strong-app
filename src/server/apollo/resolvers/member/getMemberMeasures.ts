import { member } from '@prisma/client';
import { BeStrongContext } from '../../context';

const getMemberMeasure = (
  parent: member,
  args: { take: number },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const measures = prisma.member
    .findUnique({
      where: {
        code: parent.code,
      },
    })
    .memberMeasures({
      orderBy: {
        date: 'desc',
      },
      take: args.take,
    });

  return measures;
};

export default getMemberMeasure;
