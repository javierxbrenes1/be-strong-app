import { describe, expect, it } from 'vitest';
import { categorySchema, equipmentSchema } from './schemas';

describe('equipment schemas', () => {
  it('requires a category name that is not only spaces', () => {
    expect(
      categorySchema.safeParse({ name: '   ', equipment: [] }).error!.issues[0]
        .message
    ).toBe('Requerido');
  });
  it('rejects negative totals', () => {
    expect(
      equipmentSchema.safeParse({ description: 'Remo', total: '-1' }).success
    ).toBe(false);
  });
  it('rejects decimal totals', () => {
    expect(
      equipmentSchema.safeParse({ description: 'Remo', total: '2.5' }).error!
        .issues[0].message
    ).toBe('Debe ser un número entero');
  });
  it('requires a total', () => {
    expect(
      equipmentSchema.safeParse({ description: 'Remo', total: '' }).error!
        .issues[0].message
    ).toBe('Requerido');
  });
  it('trims and converts a valid row', () => {
    expect(
      equipmentSchema.parse({
        description: ' Remo ',
        brand: 'Concept2',
        total: '3',
      })
    ).toEqual({ description: 'Remo', brand: 'Concept2', total: 3 });
  });
});
