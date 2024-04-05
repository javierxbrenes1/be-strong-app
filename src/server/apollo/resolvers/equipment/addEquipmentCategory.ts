import { EquipmentInput } from '../../../../common/models/Equipment';
import { BeStrongContext } from '../../context';

const addEquipmentCategory = async (
  _parent: unknown,
  args: { name: string; equipment?: EquipmentInput[] },
  context: BeStrongContext
) => {
  const { name, equipment } = args;
  const { prisma } = context;

  const result = prisma.equipmentCategory.create({
    data: {
      name,
      equipment: {
        create:
          equipment?.map((r) => ({
            description: r.description,
            brand: r.brand,
            total: r.total || 0,
          })) ?? [],
      },
    },
    include: {
      equipment: true,
    },
  });

  return result;
};

export default addEquipmentCategory;
