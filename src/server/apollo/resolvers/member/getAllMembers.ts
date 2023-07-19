/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';

const getAllMembers = async (
  _parent: unknown,
  args: { offset: number; limit: number; ignore: string[] },
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;
  // total elements
  const totalMembers = await prisma.member.count({
    where: {
      isActive: true,
    },
  });
  const { offset, limit, ignore = [] } = args;
  const {
    select: { members: selectFields = {} },
  } = new PrismaSelect(info).value;

  const members = prisma.member.findMany({
    where: {
      isActive: true,
      code: {
        notIn: ignore,
      },
    },
    ...selectFields,
    skip: offset,
    take: limit,
    orderBy: {
      name: 'asc',
    },
  });

  let nextPageStart = limit + offset;
  const currentPage = Math.floor(offset / limit);
  nextPageStart = nextPageStart >= totalMembers ? -1 : nextPageStart;

  return {
    members,
    pagination: {
      total: totalMembers,
      pageSize: limit,
      nextPageStart,
      totalPages: Math.ceil(totalMembers / limit),
      currentPage,
    },
  };
};

export default getAllMembers;
