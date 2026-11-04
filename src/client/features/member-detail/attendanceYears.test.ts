import { describe, expect, it } from 'vitest';
import { attendanceYears } from './attendanceYears';

describe('attendanceYears', () => {
  it('falls back to the current year without attendances', () => {
    expect(attendanceYears(null, '2026-11-03')).toEqual([2026]);
  });
  it('lists years from the first class down from the current one', () => {
    expect(attendanceYears('2024-03-10', '2026-11-03')).toEqual([
      2026, 2025, 2024,
    ]);
  });
});
