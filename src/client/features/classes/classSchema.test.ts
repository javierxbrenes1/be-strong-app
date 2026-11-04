import { describe, expect, it } from 'vitest';
import { classSchema } from './classSchema';

const msg = (v: unknown) => classSchema.safeParse(v).error?.issues[0].message;

describe('classSchema', () => {
  it('requires type', () => {
    expect(msg({ classType: ' ', classTimeIds: [1] })).toBe('Requerido');
  });
  it('requires a time', () => {
    expect(msg({ classType: 'Boxeo', classTimeIds: [] })).toBe(
      'Selecciona al menos un horario'
    );
  });
  it('rejects duration 0', () => {
    expect(
      classSchema.safeParse({
        classType: 'Boxeo',
        classTimeIds: [1],
        classDurationInMinutes: '0',
      }).success
    ).toBe(false);
  });
  it('parses duration', () => {
    expect(
      classSchema.parse({
        classType: 'Boxeo',
        classTimeIds: [1],
        classDurationInMinutes: '45',
      }).classDurationInMinutes
    ).toBe(45);
  });
});
