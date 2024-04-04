import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';
import getMembersPage from './actions/getMembersPage';

const getAllInactiveMembers = async (
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
    status: 'inactive',
  });

  return details;
};

export default getAllInactiveMembers;
