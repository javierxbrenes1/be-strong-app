// Campos de Member resueltos por field resolvers: Prisma no los conoce.
const COMPUTED = ['lastAttendanceDate', 'currentWeight'];

export default function omitComputed<T>(select: T): T {
  const s = (select as { select?: Record<string, unknown> } | undefined)
    ?.select;
  if (s) {
    COMPUTED.forEach((k) => delete s[k]);
    s.code = true; // los field resolvers lo necesitan
  }
  return select;
}
