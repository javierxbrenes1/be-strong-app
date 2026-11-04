import { describe, expect, it } from 'vitest';
import { weekBounds } from './weekBounds';

describe('weekBounds', () => {
  it('returns Monday-Sunday bounds for this and last week (Tuesday)', () => {
    expect(weekBounds('2026-11-03')).toEqual({
      thisWeek: { from: '2026-11-02', to: '2026-11-08' },
      lastWeek: { from: '2026-10-26', to: '2026-11-01' },
    });
  });
  it('starts the week on Monday when today is Monday', () => {
    expect(weekBounds('2026-11-02').thisWeek.from).toBe('2026-11-02');
  });
  it('keeps Sunday in the week that started the previous Monday', () => {
    expect(weekBounds('2026-11-08').thisWeek.from).toBe('2026-11-02');
  });
});
