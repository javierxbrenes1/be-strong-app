import { describe, expect, it } from 'vitest';
import { planCategoryChanges } from './saveCategory';

const orig = [
  { uuid: 'a', description: 'Remo', brand: 'C2', total: 3 },
  { uuid: 'b', description: 'Bici', brand: 'K', total: 10 },
];

describe('planCategoryChanges', () => {
  it('splits create, update and remove', () => {
    expect(
      planCategoryChanges(orig, [
        { uuid: 'a', description: 'Remo', brand: 'C2', total: 4 },
        { description: 'Soga', brand: '', total: 5 },
      ])
    ).toEqual({
      create: [{ description: 'Soga', brand: '', total: 5 }],
      update: [{ uuid: 'a', description: 'Remo', brand: 'C2', total: 4 }],
      remove: ['b'],
    });
  });
  it('returns nothing to do when unchanged', () => {
    expect(planCategoryChanges(orig, orig)).toEqual({
      create: [],
      update: [],
      remove: [],
    });
  });
});
