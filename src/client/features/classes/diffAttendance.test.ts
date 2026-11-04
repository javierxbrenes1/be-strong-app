import { describe, expect, it } from 'vitest';
import { diffAttendance } from './diffAttendance';

describe('diffAttendance', () => {
  it('no changes', () => {
    expect(diffAttendance(['a', 'b'], ['a', 'b'])).toEqual({
      add: [],
      remove: [],
    });
  });
  it('swap one', () => {
    expect(diffAttendance(['a', 'b'], ['b', 'c'])).toEqual({
      add: ['c'],
      remove: ['a'],
    });
  });
  it('add to empty', () => {
    expect(diffAttendance([], ['x'])).toEqual({ add: ['x'], remove: [] });
  });
});
