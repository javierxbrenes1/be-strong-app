import { BeStrongContext } from '../../context';

const updateEquipmentCategoryName = async (
  _parent: unknown,
  args: { uuid: string; name: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { uuid, name } = args;
  await prisma.equipmentCategory.update({
    where: {
      uuid,
    },
    data: {
      name,
    },
  });

  const category = await prisma.equipmentCategory.findUnique({
    where: {
      uuid,
    },
    include: {
      equipment: true,
    },
  });
  return category;
};

export default updateEquipmentCategoryName;
