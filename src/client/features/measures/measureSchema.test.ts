import { describe, expect, it } from 'vitest';
import { measureSchema } from './measureSchema';

const base = {
  date: Date.now(),
  weight: '78',
  bodyMassIndex: '24.7',
  corporalFat: '21',
  muscle: '36',
  corporalWaterPct: '53.5',
  calories: '1875',
};

describe('measureSchema', () => {
  it('parses numeric text', () => {
    expect(measureSchema.parse(base).weight).toBe(78);
  });
  it('requires every value', () => {
    const r = measureSchema.safeParse({ ...base, weight: '' });
    expect(r.error?.issues[0].message).toBe('Requerido');
  });
  it('rejects negatives', () => {
    expect(measureSchema.safeParse({ ...base, weight: '-1' }).success).toBe(
      false
    );
  });
  it('accepts a decimal comma', () => {
    expect(
      measureSchema.parse({ ...base, corporalWaterPct: '53,5' })
        .corporalWaterPct
    ).toBe(53.5);
  });
});
