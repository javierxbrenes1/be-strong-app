/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import UpdateMemberArgs from '../../../../common/actionModels/UpdateMember';
import { BeStrongContext } from '../../context';

const updateMember = async (
  _p: unknown,
  args: { member: UpdateMemberArgs },
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;
  const { code, memberAttendance, ...memberDetails } = args.member;

  const { select } = new PrismaSelect(info).value;

  const data = {
    ...memberDetails,
    ...(memberAttendance
      ? {
          memberAttendance: {
            upsert: {
              create: {
                ...memberAttendance,
              },
              update: {
                ...memberAttendance,
              },
            },
          },
        }
      : {}),
  };

  const updatedMember = await prisma.member.update({
    where: {
      code,
    },
    data,
    select,
  });

  return updatedMember;
};

export default updateMember;
