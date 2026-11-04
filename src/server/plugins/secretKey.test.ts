import { describe, it, expect } from 'vitest';
import { getSecretKey } from './secretKey';

describe('getSecretKey', () => {
  it('devuelve la clave sin importar su longitud', () => {
    expect(getSecretKey({ SECRET_KEY: 'corta' })).toBe('corta');
    expect(getSecretKey({ SECRET_KEY: 'x'.repeat(64) })).toBe('x'.repeat(64));
  });
  it('recorta espacios', () =>
    expect(getSecretKey({ SECRET_KEY: '  clave  ' })).toBe('clave'));
  it('falla si falta', () =>
    expect(() => getSecretKey({})).toThrow(/SECRET_KEY/));
  it('falla si está vacía o solo espacios', () => {
    expect(() => getSecretKey({ SECRET_KEY: '' })).toThrow(/SECRET_KEY/);
    expect(() => getSecretKey({ SECRET_KEY: '   ' })).toThrow(/SECRET_KEY/);
  });
});
