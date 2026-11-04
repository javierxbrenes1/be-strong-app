import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';

export type MemberSummary = {
  lastAttendanceDate: string | null;
  currentWeight: number | null;
};

// Resuelve un lote de miembros con 2 queries (sin N+1).
export default function memberSummaryLoader(prisma: PrismaClient) {
  return new DataLoader<string, MemberSummary>(async (codes) => {
    const list = [...codes];
    const [attendance, weights] = await Promise.all([
      prisma.$queryRaw<{ memberCode: string; last: string }[]>`
        SELECT l."memberCode", max(g."classDate")::text AS last
        FROM app."memberAttendanceLog" l
        JOIN app."gymClass" g ON g.id = l."gymClassId"
        WHERE l."memberCode" = ANY(${list})
        GROUP BY 1`,
      prisma.$queryRaw<{ memberCode: string; weight: number }[]>`
        SELECT DISTINCT ON ("memberCode") "memberCode", weight
        FROM app."memberMeasures"
        WHERE "memberCode" = ANY(${list})
        ORDER BY "memberCode", date DESC`,
    ]);
    const lastBy = new Map(attendance.map((r) => [r.memberCode, r.last]));
    const weightBy = new Map(weights.map((r) => [r.memberCode, r.weight]));
    return list.map((code) => ({
      lastAttendanceDate: lastBy.get(code) ?? null,
      currentWeight: weightBy.get(code) ?? null,
    }));
  });
}
