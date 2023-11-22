import { Prisma } from '@prisma/client';
import { BeStrongContext } from '../../context';

const getMemberAttendanceLogByYear = async (
  _parent: unknown,
  args: { year: number; memberCode: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { year, memberCode } = args;
  const data = await prisma.$queryRaw(
    Prisma.sql`
  SELECT DATE_PART('Year', gc."classDate") as year,
         DATE_PART('Month', gc."classDate") as month, 
         CAST((COALESCE(count(*),'0')) AS INTEGER) as total
    FROM "memberAttendanceLog" mal 
    JOIN "gymClass" gc 
      ON mal."gymClassId" = gc.id 
   WHERE DATE_PART('Year', gc."classDate") = ${year} 
    AND mal."memberCode" = ${memberCode} 
  GROUP BY DATE_PART('Year', gc."classDate"), DATE_PART('Month', gc."classDate");
  `
  );

  return data;
};

export default getMemberAttendanceLogByYear;
