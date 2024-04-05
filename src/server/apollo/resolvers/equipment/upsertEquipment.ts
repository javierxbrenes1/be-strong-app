import { BeStrongContext } from '../../context';

type Input = {
  uuid?: string;
  description: string;
  total: number;
  brand: string;
  equipmentCategoryUuid: string;
};

const upsertEquipment = async (
  _parent: unknown,
  args: { input: Input },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { uuid, ...data } = { ...args.input };

  let result;
  if (!uuid) {
    result = await prisma.equipment.create({
      data,
      include: {
        category: true,
      },
    });
    return result;
  }

  result = await prisma.equipment.update({
    where: {
      uuid,
    },
    data,
    include: {
      category: true,
    },
  });

  return result;
};

export default upsertEquipment;
