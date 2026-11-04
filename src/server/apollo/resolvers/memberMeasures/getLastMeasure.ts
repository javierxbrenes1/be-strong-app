import Measure from '../../../../common/models/Measure';
import { measuresWithDiffsCte } from './measuresWithDiffsSql';
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

  const rawSql = `${measuresWithDiffsCte}
SELECT * FROM m ORDER BY "date" DESC LIMIT 1`;

  const result = await prisma.$queryRawUnsafe(rawSql, code);
  const [lastMeasure] = result as Measure[];
  return lastMeasure;
};

export default getLastMeasure;
