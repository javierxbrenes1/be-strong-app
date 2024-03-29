import { BeStrongContext } from '../../context';

const deleteEquipmentCategory = async (
  _parent: unknown,
  args: { categoryUuid: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  await prisma.equipmentCategory.delete({
    where: {
      uuid: args.categoryUuid,
    },
  });
  return true;
};

export default deleteEquipmentCategory;
