import { BeStrongContext } from '../../context';
import { addDays, dayBoundsUtc, LocalDate } from '../../../../common/dates';
import { RISK_DAYS, UNMEASURED_DAYS } from '../../../../common/thresholds';
import { weekBounds } from '../../../../common/weekBounds';
import { prismaDateToLocalDate } from '../localScalars';

type MemberRef = { code: string; name: string };

const getHomeSummary = async (
  _parent: unknown,
  args: { today: Date },
  { prisma }: BeStrongContext
) => {
  const today: LocalDate = prismaDateToLocalDate(args.today);
  const { thisWeek, lastWeek } = weekBounds(today);
  const last7From = addDays(today, -6);
  const rangeFrom = last7From < lastWeek.from ? last7From : lastWeek.from;
  const rangeTo = today > thisWeek.to ? today : thisWeek.to;

  const monthFirst = `${today.slice(0, 7)}-01`;
  const monthLast = addDays(`${addDays(monthFirst, 31).slice(0, 7)}-01`, -1);

  const riskCutoff = addDays(today, -RISK_DAYS);
  const measureCutoff = dayBoundsUtc(
    addDays(today, -UNMEASURED_DAYS),
    addDays(today, -UNMEASURED_DAYS)
  ).gte;

  const [
    activeMembers,
    newMembersThisMonth,
    perDay,
    birthdays,
    atRisk,
    unmeasured,
  ] = await Promise.all([
    prisma.member.count({ where: { isActive: true } }),
    prisma.member.count({
      where: { createAt: dayBoundsUtc(monthFirst, monthLast) },
    }),
    prisma.$queryRaw<{ day: string; count: bigint }[]>`
        SELECT g."classDate"::text AS day, count(*) AS count
        FROM app."memberAttendanceLog" l
        JOIN app."gymClass" g ON g.id = l."gymClassId"
        WHERE g."classDate" BETWEEN ${rangeFrom}::date AND ${rangeTo}::date
        GROUP BY 1`,
    prisma.$queryRaw<MemberRef[]>`
        SELECT code, name FROM app.member
        WHERE "isActive" = TRUE AND to_char("birthDate", 'MM-DD') = ${today.slice(
          5
        )}
        ORDER BY name`,
    prisma.$queryRaw<MemberRef[]>`
        SELECT m.code, m.name FROM app.member m
        WHERE m."isActive" = TRUE AND COALESCE((
          SELECT max(g."classDate") FROM app."memberAttendanceLog" l
          JOIN app."gymClass" g ON g.id = l."gymClassId"
          WHERE l."memberCode" = m.code), '0001-01-01'::date) < ${riskCutoff}::date
        ORDER BY m.name`,
    prisma.$queryRaw<MemberRef[]>`
        SELECT m.code, m.name FROM app.member m
        WHERE m."isActive" = TRUE AND NOT EXISTS (
          SELECT 1 FROM app."memberMeasures" mm
          WHERE mm."memberCode" = m.code AND mm.date >= ${measureCutoff})
        ORDER BY m.name`,
  ]);

  const byDay = new Map(perDay.map((r) => [r.day, Number(r.count)]));
  const sum = (from: LocalDate, to: LocalDate) =>
    [...byDay].reduce((s, [d, n]) => (d >= from && d <= to ? s + n : s), 0);

  return {
    activeMembers,
    newMembersThisMonth,
    attendancesThisWeek: sum(thisWeek.from, thisWeek.to),
    attendancesLastWeek: sum(lastWeek.from, lastWeek.to),
    last7Days: Array.from({ length: 7 }, (_, i) => {
      const date = addDays(last7From, i);
      return { date, count: byDay.get(date) ?? 0 };
    }),
    birthdays,
    atRisk,
    unmeasured,
  };
};

export default getHomeSummary;
