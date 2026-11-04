import { describe, expect, it } from 'vitest';
import { MEASURE_METRICS, isGoodDelta, resultVariant } from './metrics';

describe('metrics', () => {
  it('maps classifications to variants', () => {
    expect(resultVariant('Peso normal')).toBe('success');
    expect(resultVariant('Bueno')).toBe('info');
    expect(resultVariant('Regular')).toBe('warning');
    expect(resultVariant('Sobre peso')).toBe('danger');
    expect(resultVariant('Indefinido')).toBe('neutral');
    expect(resultVariant(undefined)).toBe('neutral');
  });

  it('knows which direction is good', () => {
    expect(isGoodDelta('weight', -0.8)).toBe(true);
    expect(isGoodDelta('calories', 15)).toBe(false);
    expect(isGoodDelta('muscle', 0.4)).toBe(true);
  });

  it('lists the metrics in display order', () => {
    expect(MEASURE_METRICS.map((m) => m.key)).toEqual([
      'weight',
      'bodyMassIndex',
      'corporalFat',
      'muscle',
      'corporalWaterPct',
      'calories',
    ]);
  });
});
