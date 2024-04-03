import { BeStrongContext } from '../../context';

const deleteEquipmentCategory = async (
  _parent: unknown,
  args: { categoryUuid: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const deleted = await prisma.equipmentCategory.delete({
    where: {
      uuid: args.categoryUuid,
    },
  });
  return deleted;
};

export default deleteEquipmentCategory;
