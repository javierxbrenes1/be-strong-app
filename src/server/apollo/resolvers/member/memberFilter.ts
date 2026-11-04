import { GraphQLError } from 'graphql';

const ALLOWED_COLUMN = 'name';
const ALLOWED_COMPARATORS = ['startsWith', 'contains'] as const;

type MemberFilterComparator = (typeof ALLOWED_COMPARATORS)[number];

export const parseMemberFilter = (
  column: unknown,
  comparator: unknown
): { column: 'name'; comparator: MemberFilterComparator } => {
  if (
    column !== ALLOWED_COLUMN ||
    !ALLOWED_COMPARATORS.includes(comparator as MemberFilterComparator)
  ) {
    throw new GraphQLError('Invalid member filter', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return { column, comparator: comparator as MemberFilterComparator };
};
