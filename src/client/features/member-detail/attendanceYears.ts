import { LocalDate } from '../../../common/dates';

export function attendanceYears(
  firstClassDate: LocalDate | null,
  today: LocalDate
): number[] {
  const current = Number(today.slice(0, 4));
  const first = firstClassDate ? Number(firstClassDate.slice(0, 4)) : current;
  return Array.from({ length: current - first + 1 }, (_, i) => current - i);
}
