import { dayBoundsUtc } from '../../../../common/dates';
import { prismaDateToLocalDate } from '../localScalars';
import { measuresWithDiffsCte } from './measuresWithDiffsSql';
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

  // filters.from/to arrive as LocalDate (Date 00:00Z); bounds are gym-timezone days.
  const bounds = filters
    ? dayBoundsUtc(
        prismaDateToLocalDate(filters.from),
        prismaDateToLocalDate(filters.to)
      )
    : undefined;
  const where: { memberCode: string; date?: { gte: Date; lt: Date } } = {
    memberCode: code,
    ...(bounds ? { date: bounds } : {}),
  };

  const totalMeasures = await prisma.memberMeasures.count({
    where,
  });

  let nextPageStart = limit + offset;
  const currentPage = Math.floor(offset / limit);
  nextPageStart = nextPageStart >= totalMeasures ? -1 : nextPageStart;

  const rawSql = `${measuresWithDiffsCte}
SELECT * FROM m${filters ? ' WHERE "date" >= $4 AND "date" < $5' : ''}
ORDER BY "date" ASC LIMIT $2 OFFSET $3`;

  const measures = await prisma.$queryRawUnsafe(
    rawSql,
    code,
    limit,
    offset,
    bounds?.gte ?? null,
    bounds?.lt ?? null
  );

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
