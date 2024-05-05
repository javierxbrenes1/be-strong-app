import { getDateAndTimeWithLimit } from '../../../utils/dateshelper';
import { BeStrongContext } from '../../context';
import Measure from '../../../../common/models/Measure';

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

  let rawSql = `
SELECT "id", 
"date", 
"weight",
weight - COALESCE(lag(weight, 1) over(partition by "memberCode" order by "date" asc), "weight") "weightDiff",
"corporalFat", 
"corporalFat" - COALESCE(lag("corporalFat", 1) over(partition by "memberCode" order by "date" asc), "corporalFat") "corporalFatDiff",
"muscle",
"muscle" - COALESCE(lag("muscle", 1) over(partition by "memberCode" order by "date" asc), "muscle") "muscleDiff",
"bodyMassIndex",
"bodyMassIndex" - COALESCE(lag("bodyMassIndex", 1) over(partition by "memberCode" order by "date" asc), "bodyMassIndex") "bodyMassIndexDiff",
"corporalWaterPct", 
"corporalWaterPct" - COALESCE(lag("corporalWaterPct", 1) over(partition by "memberCode" order by "date" asc), "corporalWaterPct") "corporalWaterPctDiff",
"calories",
"calories" - COALESCE(lag("calories", 1) over(partition by "memberCode" order by "date" asc), "calories") "caloriesDiff",
"muscleResult", 
"bodyMassIndexResult", 
"corporalFatResult", 
"corporalWaterPctResult",
"caloriesResult", 
"memberCode" 
FROM "app"."memberMeasures" 
WHERE "memberCode" = $1
`;
  if (filters) {
    rawSql += ` AND "date" >= $4 AND "date" <= $5`;
  }
  rawSql += ` ORDER BY "date" ASC LIMIT $2 OFFSET $3`;

  const measures = await prisma.$queryRawUnsafe<Measure[]>(
    rawSql,
    code,
    limit,
    offset,
    filters ? getDateAndTimeWithLimit(filters.from, 'min') : null,
    filters ? getDateAndTimeWithLimit(filters.to, 'max') : null
  );

  // const measures = await prisma.memberMeasures.findMany({
  //   orderBy: {
  //     date: 'asc',
  //   },
  //   skip: offset,
  //   take: limit,
  //   where,
  // });

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
