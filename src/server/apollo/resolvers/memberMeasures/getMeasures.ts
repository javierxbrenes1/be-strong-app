import { BeStrongContext } from '../../context';

type ArgsType = {
  memberCode: string;
  offset: number;
  limit: number;
};

const getMeasures = async (
  parent: { code: string } | null,
  args: ArgsType,
  context: BeStrongContext
) => {
  const { prisma } = context;
  const code = parent?.code || args.memberCode || '';
  const { limit, offset } = args;
  const totalMeasures = await prisma.memberMeasures.count({
    where: {
      memberCode: code,
    },
  });

  let nextPageStart = limit + offset;
  nextPageStart = nextPageStart >= totalMeasures ? -1 : nextPageStart;

  const measures = await prisma.memberMeasures.findMany({
    orderBy: {
      id: 'desc',
    },
    skip: offset,
    take: limit,
    where: {
      memberCode: code,
    },
  });

  const memberDetails = await prisma.member.findUnique({
    where: {
      code,
    },
    select: {
      name: true,
      avatar: true,
      code: true,
    },
  });

  return {
    member: memberDetails,
    measures,
    pagination: {
      total: totalMeasures,
      pageSize: limit,
      nextPageStart,
      totalPages: Math.ceil(totalMeasures / limit),
    },
  };
};

export default getMeasures;
