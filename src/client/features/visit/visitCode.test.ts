import { describe, expect, it } from 'vitest';
import { encode } from 'js-base64';
import { decodeVisitCode } from './visitCode';

describe('decodeVisitCode', () => {
  it('decodes a base64 member code', () => {
    expect(decodeVisitCode(encode('BS-fd55o1b'))).toBe('BS-fd55o1b');
  });
  it('returns null when the param is missing or empty', () => {
    expect(decodeVisitCode(null)).toBeNull();
    expect(decodeVisitCode('')).toBeNull();
  });
  it('returns null for non-base64 input', () => {
    expect(decodeVisitCode('%%%')).toBeNull();
  });
});
