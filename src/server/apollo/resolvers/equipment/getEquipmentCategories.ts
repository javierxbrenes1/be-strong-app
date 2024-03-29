import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';
import { BeStrongContext } from '../../context';

const getEquipmentCategories = async (
  parent: unknown,
  args: { code: string } | null,
  context: BeStrongContext,
  info: GraphQLResolveInfo
) => {
  const { prisma } = context;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const select = new PrismaSelect(info).value;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const equipmentCategories = await prisma.equipmentCategory.findMany({
    ...select,
  });
  return equipmentCategories;
};

export default getEquipmentCategories;
