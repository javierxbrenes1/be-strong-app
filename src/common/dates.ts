// Única fuente de lógica de fechas, compartida por servidor y cliente.
// LocalDate = día de calendario 'YYYY-MM-DD'; LocalTime = hora del gimnasio 'HH:mm' (24 h);
// los instantes (Date) se muestran en GYM_TIMEZONE.
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export type LocalDate = string;
export type LocalTime = string;

export const GYM_TIMEZONE = 'America/Costa_Rica';

const DATE_FORMAT = 'YYYY-MM-DD';
const LOCAL_TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

// UTC so the host timezone never shifts a calendar date.
const parseLocalDate = (d: LocalDate) => dayjs.utc(d, DATE_FORMAT, true);

export function isLocalDate(v: unknown): v is LocalDate {
  return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && parseLocalDate(v).isValid();
}

export function isLocalTime(v: unknown): v is LocalTime {
  return typeof v === 'string' && LOCAL_TIME_RE.test(v);
}

export function todayLocalDate(now: Date = new Date()): LocalDate {
  return dayjs(now).tz(GYM_TIMEZONE).format(DATE_FORMAT);
}

export function addDays(d: LocalDate, n: number): LocalDate {
  return parseLocalDate(d).add(n, 'day').format(DATE_FORMAT);
}

export function formatLocalDate(d: LocalDate, fmt = 'DD/MM/YYYY'): string {
  return parseLocalDate(d).format(fmt);
}

export function ageOn(birth: LocalDate, today: LocalDate): number {
  const [by, bm, bd] = birth.split('-').map(Number);
  const [ty, tm, td] = today.split('-').map(Number);
  const hadBirthday = tm > bm || (tm === bm && td >= bd);
  return ty - by - (hadBirthday ? 0 : 1);
}

export function formatLocalTime(t: LocalTime): string {
  return dayjs.utc(`2000-01-01 ${t}`, 'YYYY-MM-DD HH:mm').format('h:mm A');
}

export function compareLocalTime(a: LocalTime, b: LocalTime): number {
  return a.localeCompare(b); // 'HH:mm' zero-padded sorts lexicographically
}

export function dayBoundsUtc(from: LocalDate, to: LocalDate): { gte: Date; lt: Date } {
  return {
    gte: dayjs.tz(`${from} 00:00`, GYM_TIMEZONE).toDate(),
    lt: dayjs.tz(`${addDays(to, 1)} 00:00`, GYM_TIMEZONE).toDate(),
  };
}

export function formatInstant(d: Date | number, fmt = 'DD/MM/YYYY h:mm A'): string {
  return dayjs(d).tz(GYM_TIMEZONE).format(fmt);
}

// Legacy gymClassTime.isoTime ('T23:30:00.000Z', UTC) → gym local 'HH:mm'.
// Same formula as the SQL migration: UTC time minus 6 h, wrapping at 24 h (CR has no DST).
export function isoTimeToLocalTime(iso: string): LocalTime {
  const [h, m] = iso.slice(1, 6).split(':').map(Number);
  const minutes = (((h * 60 + m - 6 * 60) % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
}
