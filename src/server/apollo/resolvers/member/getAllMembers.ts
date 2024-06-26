import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';
import getMembersPage from './actions/getMembersPage';

const getAllMembers = async (
  _parent: unknown,
  args: { offset: number; limit: number; ignore: string[] },
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;
  const { offset, limit, ignore } = args;
  const details = await getMembersPage({
    prisma,
    offset,
    limit,
    ignore,
    info,
    status: 'active',
  });

  return details;
};

export default getAllMembers;
