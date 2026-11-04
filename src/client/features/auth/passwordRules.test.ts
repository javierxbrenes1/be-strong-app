import { describe, expect, it } from 'vitest';
import { passwordRules } from './passwordRules';

const ok = (p: string, c: string) =>
  Object.fromEntries(passwordRules(p, c).map((r) => [r.id, r.ok]));

describe('passwordRules', () => {
  it('passes a valid password', () => {
    expect(ok('Abcdefghi1!', 'Abcdefghi1!')).toEqual({
      length: true,
      number: true,
      upper: true,
      special: true,
      match: true,
    });
  });
  it('fails everything for a bad one', () => {
    expect(ok('abc', 'abd')).toEqual({
      length: false,
      number: false,
      upper: false,
      special: false,
      match: false,
    });
  });
  it('does not trim', () => {
    expect(ok(' Abcdefgh1!', 'Abcdefgh1!').match).toBe(false);
  });
  it('has exact labels', () => {
    expect(passwordRules('', '').map((r) => r.label)).toEqual([
      'Al menos 10 caracteres.',
      'Tiene al menos un número.',
      'Tiene al menos una mayúscula.',
      'Tiene al menos un carácter especial (.!@#$%^&*).',
      'Contraseña confirmada.',
    ]);
  });
});
