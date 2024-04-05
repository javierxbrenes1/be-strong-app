import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';

const getEquipmentByCategory = async (
  parent: unknown,
  args: { categoryUuid: string },
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const select = new PrismaSelect(info).value;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const equipmentCategories = await prisma.equipmentCategory.findUnique({
    where: {
      uuid: args.categoryUuid,
    },
    ...select,
  });
  return equipmentCategories;
};

export default getEquipmentByCategory;
