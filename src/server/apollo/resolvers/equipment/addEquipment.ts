import { BeStrongContext } from '../../context';

type Input = {
  description: string;
  total: number;
  brand: string;
  equipmentCategoryUuid: string;
};

const addEquipment = async (
  _parent: unknown,
  args: { input: Input },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const data = { ...args.input };
  const result = prisma.equipment.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

export default addEquipment;
