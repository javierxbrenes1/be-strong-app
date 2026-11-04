import { addDays, LocalDate } from './dates';

type Range = { from: LocalDate; to: LocalDate };

// Semanas de lunes a domingo; `to` es inclusivo.
export function weekBounds(today: LocalDate): {
  thisWeek: Range;
  lastWeek: Range;
} {
  const sinceMonday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const monday = addDays(today, -sinceMonday);
  return {
    thisWeek: { from: monday, to: addDays(monday, 6) },
    lastWeek: { from: addDays(monday, -7), to: addDays(monday, -1) },
  };
}
