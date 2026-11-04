import { describe, it, expect } from 'vitest';
import { GraphQLError } from 'graphql';
import { parseMemberFilter } from './memberFilter';

describe('parseMemberFilter', () => {
  it('acepta name/startsWith', () => expect(parseMemberFilter('name', 'startsWith')).toEqual({ column: 'name', comparator: 'startsWith' }));
  it('acepta name/contains', () => expect(parseMemberFilter('name', 'contains')).toEqual({ column: 'name', comparator: 'contains' }));
  for (const [col, cmp] of [['pwd', 'equals'], ['code', 'startsWith'], ['name', 'equals'], [undefined, 'startsWith'], ['name', null]]) {
    it(`rechaza ${String(col)}/${String(cmp)}`, () => {
      try { parseMemberFilter(col, cmp); throw new Error('no lanzó'); }
      catch (e) { expect(e).toBeInstanceOf(GraphQLError); expect((e as GraphQLError).extensions.code).toBe('BAD_USER_INPUT'); }
    });
  }
});
