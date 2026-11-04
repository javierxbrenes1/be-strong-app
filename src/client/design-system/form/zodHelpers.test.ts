import { describe, expect, it } from 'vitest';
import { zLocalDate, zLocalTime, zNumber } from './zodHelpers';

const msg = (r: {
  success: boolean;
  error?: { issues: { message: string }[] };
}) => r.error?.issues[0]?.message;

describe('zNumber', () => {
  const n = zNumber({ min: 0, max: 300 });
  it('requires a value by default', () => {
    expect(n.safeParse('').success).toBe(false);
    expect(msg(n.safeParse(''))).toBe('Requerido');
  });
  it('parses plain, decimal-comma and leading-zero text', () => {
    expect(n.parse('75')).toBe(75);
    expect(n.parse('78,5')).toBe(78.5);
    expect(n.parse('075')).toBe(75);
  });
  it('rejects non numbers and out of range', () => {
    expect(msg(n.safeParse('abc'))).toBe('Debe ser un número');
    expect(msg(n.safeParse('301'))).toBe('Máximo 300');
    expect(msg(n.safeParse('-1'))).toBe('Mínimo 0');
  });
  it('integer and optional options', () => {
    expect(msg(zNumber({ int: true }).safeParse('1.5'))).toBe(
      'Debe ser un número entero'
    );
    expect(zNumber({ required: false }).parse('')).toBeUndefined();
  });
});

describe('zLocalDate / zLocalTime', () => {
  it('validates calendar dates', () => {
    expect(zLocalDate().safeParse('2026-02-30').success).toBe(false);
    expect(msg(zLocalDate().safeParse('2026-02-30'))).toBe('Fecha inválida');
    expect(zLocalDate().parse('2026-11-03')).toBe('2026-11-03');
  });
  it('validates HH:mm', () => {
    expect(zLocalTime().parse('08:30')).toBe('08:30');
    expect(zLocalTime().safeParse('25:00').success).toBe(false);
  });
});
