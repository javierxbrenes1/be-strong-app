import { getDateAndTimeWithLimit } from '../../../utils/dateshelper';
import { BeStrongContext } from '../../context';

type ArgsType = {
  input: {
    memberCode: string;
    offset: number;
    limit: number;
    filters: {
      from: Date;
      to: Date;
    };
  };
};

const getMeasures = async (
  parent: { code: string } | null,
  args: ArgsType,
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { memberCode, offset, limit, filters } = args.input;
  const code = parent?.code || memberCode || '';

  const where: { memberCode: string; date?: { gte: Date; lte: Date } } = {
    memberCode: code,
  };

  if (filters) {
    where.date = {
      gte: getDateAndTimeWithLimit(filters.from, 'min'),
      lte: getDateAndTimeWithLimit(filters.to, 'max'),
    };
  }

  const totalMeasures = await prisma.memberMeasures.count({
    where,
  });

  let nextPageStart = limit + offset;
  const currentPage = Math.floor(offset / limit);
  nextPageStart = nextPageStart >= totalMeasures ? -1 : nextPageStart;

  const measures = await prisma.memberMeasures.findMany({
    orderBy: {
      date: 'asc',
    },
    skip: offset,
    take: limit,
    where,
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
      currentPage,
    },
  };
};

export default getMeasures;
