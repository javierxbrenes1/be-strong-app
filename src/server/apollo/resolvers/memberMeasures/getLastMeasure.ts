import Measure from '../../../../common/models/Measure';
import { BeStrongContext } from '../../context';

type ArgsType = {
  input: {
    memberCode: string;
  };
};

const getLastMeasure = async (
  parent: { code: string } | null,
  args: ArgsType,
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { memberCode } = args?.input || {};
  const code = parent?.code || memberCode || '';

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
  rawSql += ` ORDER BY "date" DESC LIMIT 1`;

  const result = await prisma.$queryRawUnsafe(rawSql, code);
  const [lastMeasure] = result as Measure[];
  return lastMeasure;
};

export default getLastMeasure;
