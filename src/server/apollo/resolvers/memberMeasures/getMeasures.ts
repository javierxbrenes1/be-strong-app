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

  let rawSql = `
SELECT "id", 
"date", 
"weight",
ROUND(cast(weight - COALESCE(lag(weight, 1) over(partition by "memberCode" order by "date" asc), "weight") as numeric), 2) as "weightDiff",
"corporalFat", 
ROUND(cast("corporalFat" - COALESCE(lag("corporalFat", 1) over(partition by "memberCode" order by "date" asc), "corporalFat") as numeric), 2) as "corporalFatDiff",
"muscle",
ROUND(cast("muscle" - COALESCE(lag("muscle", 1) over(partition by "memberCode" order by "date" asc), "muscle") as numeric), 2) as "muscleDiff",
"bodyMassIndex",
ROUND(cast("bodyMassIndex" - COALESCE(lag("bodyMassIndex", 1) over(partition by "memberCode" order by "date" asc), "bodyMassIndex") as numeric), 2) as "bodyMassIndexDiff",
"corporalWaterPct", 
ROUND(cast("corporalWaterPct" - COALESCE(lag("corporalWaterPct", 1) over(partition by "memberCode" order by "date" asc), "corporalWaterPct") as numeric), 2) as "corporalWaterPctDiff",
"calories",
ROUND(cast("calories" - COALESCE(lag("calories", 1) over(partition by "memberCode" order by "date" asc), "calories") as numeric), 2) as "caloriesDiff",
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

  const measures = await prisma.$queryRawUnsafe(
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
