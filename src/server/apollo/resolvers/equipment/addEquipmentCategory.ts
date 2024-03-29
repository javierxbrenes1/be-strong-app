import { BeStrongContext } from '../../context';

const addEquipmentCategory = async (
  _parent: unknown,
  args: { name: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const result = prisma.equipmentCategory.create({
    data: {
      name: args.name,
    },
    include: {
      equipment: true,
    },
  });

  return result;
};

export default addEquipmentCategory;
