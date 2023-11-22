import { Prisma } from '@prisma/client';
import { BeStrongContext } from '../../context';

const getMemberAttendanceLogsDetails = async (
  _parent: unknown,
  args: { year: number; month: number; memberCode: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { year, memberCode, month } = args;
  const data = await prisma.$queryRaw(
    Prisma.sql`
    SELECT cast(gc."classDate" as varchar) as "classDate", gc."classDurationInMinutes", gc."classType", gct."isoTime"
    FROM "memberAttendanceLog" mal 
    JOIN "gymClass" gc 
      ON mal."gymClassId" = gc.id
     join "gymClassTime" gct 
      on mal."gymClassTimeId" = gct.id
    WHERE DATE_PART('Year', gc."classDate") = ${year}
     AND DATE_PART('Month', gc."classDate") = ${month}
    AND mal."memberCode" = ${memberCode}
    ORDER BY gc."classDate" ASC
  `
  );

  return data;
};

export default getMemberAttendanceLogsDetails;
