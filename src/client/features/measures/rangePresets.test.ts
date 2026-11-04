import { describe, expect, it } from 'vitest';
import { rangePresets } from './rangePresets';

describe('rangePresets', () => {
  it('builds year, 6 months and 3 months ranges from today', () => {
    const p = Object.fromEntries(
      rangePresets('2026-11-03').map((r) => [r.id, [r.from, r.to]])
    );
    expect(p.year).toEqual(['2026-01-01', '2026-11-03']);
    expect(p['6m']).toEqual(['2026-06-01', '2026-11-03']);
    expect(p['3m']).toEqual(['2026-09-01', '2026-11-03']);
  });
});
