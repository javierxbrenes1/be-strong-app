import { describe, it, expect } from 'vitest';
import { isTokenStale } from './tokenStale';
import { isStrongPassword } from '../../common/passwordPolicy';

const changed = new Date('2026-11-04T12:00:00Z');
const sec = (iso: string) => Math.floor(new Date(iso).getTime() / 1000);

describe('isTokenStale', () => {
  it('no es obsoleto si nunca se cambió la contraseña', () =>
    expect(isTokenStale(1, null)).toBe(false));
  it('es obsoleto si se emitió antes del cambio', () =>
    expect(isTokenStale(sec('2026-11-04T11:59:59Z'), changed)).toBe(true));
  it('es válido si se emitió en el segundo del cambio o después', () => {
    expect(isTokenStale(sec('2026-11-04T12:00:00Z'), changed)).toBe(false);
    expect(isTokenStale(sec('2026-11-04T12:05:00Z'), changed)).toBe(false);
  });
  it('es obsoleto si el token no trae iat', () =>
    expect(isTokenStale(undefined, changed)).toBe(true));
});

describe('isStrongPassword', () => {
  it('acepta una válida', () =>
    expect(isStrongPassword('Abcdefghi1!')).toBe(true));
  it.each(['', 'abc', 'abcdefghi1!', 'Abcdefghij!', 'Abcdefghi11', 'Ab1!'])(
    'rechaza %j',
    (p) => expect(isStrongPassword(p)).toBe(false)
  );
});
