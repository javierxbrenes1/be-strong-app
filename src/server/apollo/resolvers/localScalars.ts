import { GraphQLError, GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { isLocalDate, isLocalTime, LocalDate, LocalTime } from '../../../common/dates';

const badInput = (message: string) => new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } });

function toPrismaDate(value: unknown): Date {
  if (!isLocalDate(value)) throw badInput(`LocalDate must be a real YYYY-MM-DD date, got ${JSON.stringify(value)}`);
  return new Date(`${value}T00:00:00Z`);
}

function toLocalTime(value: unknown): LocalTime {
  if (!isLocalTime(value)) throw badInput(`LocalTime must be HH:mm (24h), got ${JSON.stringify(value)}`);
  return value;
}

const literal = (ast: ValueNode) => (ast.kind === Kind.STRING ? ast.value : undefined);

export const LocalDateScalar = new GraphQLScalarType<Date, LocalDate>({
  name: 'LocalDate',
  description: 'Calendar date "YYYY-MM-DD" (no time, no timezone)',
  serialize(value) {
    // Prisma returns `date` columns as Date at 00:00Z, so the UTC day is the calendar day.
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    if (isLocalDate(value)) return value;
    throw new GraphQLError(`Cannot serialize LocalDate from ${JSON.stringify(value)}`);
  },
  parseValue: toPrismaDate,
  parseLiteral: (ast) => toPrismaDate(literal(ast)),
});

export const LocalTimeScalar = new GraphQLScalarType<LocalTime, LocalTime>({
  name: 'LocalTime',
  description: 'Gym local time "HH:mm" (24h)',
  serialize(value) {
    if (isLocalTime(value)) return value;
    throw new GraphQLError(`Cannot serialize LocalTime from ${JSON.stringify(value)}`);
  },
  parseValue: toLocalTime,
  parseLiteral: (ast) => toLocalTime(literal(ast)),
});

export default { LocalDate: LocalDateScalar, LocalTime: LocalTimeScalar };
