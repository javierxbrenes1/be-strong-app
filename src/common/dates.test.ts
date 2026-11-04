import { describe, expect, it } from 'vitest';
import {
  addDays,
  ageOn,
  compareLocalTime,
  dayBoundsUtc,
  formatInstant,
  formatLocalDate,
  formatLocalTime,
  isLocalDate,
  isLocalTime,
  isoTimeToLocalTime,
  todayLocalDate,
} from './dates';

describe('LocalDate', () => {
  it('validates real YYYY-MM-DD dates only', () => {
    expect(isLocalDate('2026-11-03')).toBe(true);
    expect(isLocalDate('2026-02-30')).toBe(false);
    expect(isLocalDate('2026-13-01')).toBe(false);
    expect(isLocalDate('26-1-1')).toBe(false);
    expect(isLocalDate(637200000000)).toBe(false);
  });

  it('computes today in the gym timezone, not UTC', () => {
    expect(todayLocalDate(new Date('2026-11-04T05:30:00Z'))).toBe('2026-11-03'); // 11:30 PM en CR
    expect(todayLocalDate(new Date('2026-11-04T06:00:00Z'))).toBe('2026-11-04');
  });

  it('adds days across year boundaries', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('formats without shifting the day', () => {
    expect(formatLocalDate('1990-04-12')).toBe('12/04/1990');
  });

  it('computes age on and around birthdays, including Feb 29', () => {
    expect(ageOn('1990-04-12', '2026-04-11')).toBe(35);
    expect(ageOn('1990-04-12', '2026-04-12')).toBe(36);
    expect(ageOn('2000-02-29', '2026-02-28')).toBe(25);
    expect(ageOn('2000-02-29', '2026-03-01')).toBe(26);
  });

  it('gives UTC bounds of gym days, inclusive of a 10 PM measure', () => {
    const bounds = dayBoundsUtc('2026-11-03', '2026-11-03');
    expect(bounds).toEqual({ gte: new Date('2026-11-03T06:00:00Z'), lt: new Date('2026-11-04T06:00:00Z') });
    const tenPm = new Date('2026-11-04T04:00:00Z');
    expect(tenPm >= bounds.gte && tenPm < bounds.lt).toBe(true);
  });
});

describe('LocalTime', () => {
  it('validates HH:mm 24h', () => {
    expect(isLocalTime('17:30')).toBe(true);
    expect(isLocalTime('24:00')).toBe(false);
    expect(isLocalTime('5:30 PM')).toBe(false);
  });

  it('formats as h:mm A', () => {
    expect(formatLocalTime('17:30')).toBe('5:30 PM');
    expect(formatLocalTime('19:00')).toBe('7:00 PM');
  });

  it('sorts chronologically', () => {
    expect(['19:00', '05:15', '17:30'].sort(compareLocalTime)).toEqual(['05:15', '17:30', '19:00']);
  });

  it('converts legacy UTC isoTime to gym local time, wrapping at 24h', () => {
    expect(isoTimeToLocalTime('T23:30:00.000Z')).toBe('17:30');
    expect(isoTimeToLocalTime('T01:00:00.000Z')).toBe('19:00');
    expect(isoTimeToLocalTime('T06:00:00.000Z')).toBe('00:00');
  });
});

describe('instants', () => {
  it('formats in the gym timezone', () => {
    expect(formatInstant(new Date('2026-11-04T04:00:00Z'))).toBe('03/11/2026 10:00 PM');
  });
});
