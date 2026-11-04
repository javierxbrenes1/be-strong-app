import { GraphQLError, Kind } from 'graphql';
import { describe, expect, it } from 'vitest';
import { LocalDateScalar, LocalTimeScalar } from './localScalars';

describe('LocalDate scalar', () => {
  it('serializes Prisma date columns (00:00Z) as YYYY-MM-DD', () => {
    expect(LocalDateScalar.serialize(new Date('1990-04-12T00:00:00Z'))).toBe('1990-04-12');
    expect(LocalDateScalar.serialize('1990-04-12')).toBe('1990-04-12');
  });

  it('parses valid strings into a 00:00Z Date for Prisma', () => {
    expect(LocalDateScalar.parseValue('1990-04-12')).toEqual(new Date('1990-04-12T00:00:00Z'));
    expect(LocalDateScalar.parseLiteral({ kind: Kind.STRING, value: '2026-11-03' })).toEqual(
      new Date('2026-11-03T00:00:00Z')
    );
  });

  it('rejects impossible dates and epoch numbers with BAD_USER_INPUT', () => {
    expect(() => LocalDateScalar.parseValue('2026-02-30')).toThrow(GraphQLError);
    expect(() => LocalDateScalar.parseValue('2026-13-01')).toThrow(GraphQLError);
    expect(() => LocalDateScalar.parseValue('26-1-1')).toThrow(GraphQLError);
    expect(() => LocalDateScalar.parseValue(637200000000)).toThrow(GraphQLError);
    expect(() => LocalDateScalar.parseLiteral({ kind: Kind.INT, value: '637200000000' })).toThrow(GraphQLError);
    try {
      LocalDateScalar.parseValue('2026-02-30');
    } catch (e) {
      expect((e as GraphQLError).extensions.code).toBe('BAD_USER_INPUT');
    }
  });
});

describe('LocalTime scalar', () => {
  it('passes HH:mm through both ways', () => {
    expect(LocalTimeScalar.parseValue('17:30')).toBe('17:30');
    expect(LocalTimeScalar.serialize('19:00')).toBe('19:00');
    expect(LocalTimeScalar.parseLiteral({ kind: Kind.STRING, value: '05:15' })).toBe('05:15');
  });

  it('rejects 12h strings', () => {
    expect(() => LocalTimeScalar.parseValue('5:30 PM')).toThrow(GraphQLError);
  });
});
