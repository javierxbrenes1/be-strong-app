import { BeStrongContext } from '../../context';

type Input = {
  description?: string;
  total?: number;
  brand?: string;
  equipmentUuid?: string;
};

const updateEquipment = async (
  _parent: unknown,
  args: { input: Input },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { equipmentUuid, ...data } = args.input;

  const updatedValue = prisma.equipment.update({
    where: {
      uuid: args.input.equipmentUuid,
    },
    data,
    include: {
      category: true,
    },
  });

  return updatedValue;
};

export default updateEquipment;
