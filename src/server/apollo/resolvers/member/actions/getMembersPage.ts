/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { PrismaSelect } from '@paljs/plugins';
import { PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import { GraphQLResolveInfo } from 'graphql';

async function getMembersPage(args: {
  prisma: PrismaClient<PrismaClientOptions, never, DefaultArgs>;
  offset: number;
  limit: number;
  ignore: string[];
  status: 'active' | 'inactive';
  info: GraphQLResolveInfo;
}) {
  const { prisma, offset, limit, ignore, status, info } = args;
  const isActive = status === 'active';

  const totalMembers = await prisma.member.count({
    where: {
      isActive,
    },
  });

  const {
    select: { members: selectFields = {} },
  } = new PrismaSelect(info).value;

  const members = prisma.member.findMany({
    where: {
      isActive,
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
}

export default getMembersPage;
