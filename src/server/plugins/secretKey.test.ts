import { describe, it, expect } from 'vitest';
import { getSecretKey } from './secretKey';

const k32 = 'x'.repeat(32);
describe('getSecretKey', () => {
  it('devuelve la clave cuando mide 32 o más', () =>
    expect(getSecretKey({ SECRET_KEY: k32 })).toBe(k32));
  it('recorta espacios', () =>
    expect(getSecretKey({ SECRET_KEY: `  ${k32}  ` })).toBe(k32));
  it('falla si falta', () =>
    expect(() => getSecretKey({})).toThrow(/SECRET_KEY/));
  it('falla si está vacía', () =>
    expect(() => getSecretKey({ SECRET_KEY: '' })).toThrow(/SECRET_KEY/));
  it('falla con 31 caracteres', () =>
    expect(() => getSecretKey({ SECRET_KEY: 'x'.repeat(31) })).toThrow(
      /SECRET_KEY/
    ));
  it('falla con 31 caracteres más espacios', () =>
    expect(() => getSecretKey({ SECRET_KEY: ` ${'x'.repeat(31)} ` })).toThrow(
      /SECRET_KEY/
    ));
});
