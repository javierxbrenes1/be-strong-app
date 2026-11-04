import { describe, expect, it } from 'vitest';
import { memberSchema } from './memberSchema';

const firstMessage = (v: unknown) =>
  memberSchema.safeParse(v).error?.issues[0].message;

describe('memberSchema', () => {
  it('requires name', () => {
    expect(firstMessage({ name: '' })).toBe('Requerido');
  });
  it('limits phone to 10 characters', () => {
    expect(firstMessage({ name: 'A', phone: '88881234567' })).toBe(
      'Máximo 10 caracteres'
    );
  });
  it('rejects bad email', () => {
    expect(firstMessage({ name: 'A', email: 'carlos@' })).toBe(
      'Correo inválido'
    );
  });
  it('accepts comma decimals for height', () => {
    expect(memberSchema.parse({ name: 'A', height: '1,78' }).height).toBe(1.78);
  });
  it('rejects height out of range', () => {
    expect(firstMessage({ name: 'A', height: '178' })).toBe('Máximo 2.5');
  });
  it('keeps birthDate as LocalDate', () => {
    expect(
      memberSchema.parse({ name: 'A', birthDate: '1990-04-12' }).birthDate
    ).toBe('1990-04-12');
  });
  it('fills defaults', () => {
    const m = memberSchema.parse({ name: 'A' });
    expect(m.isActive).toBe(true);
    expect(m.attendance.monday).toBe(false);
  });
});
