import { BeStrongContext } from '../../context';

const deleteEquipment = async (
  _parent: unknown,
  args: { equipmentUuid: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  await prisma.equipment.delete({
    where: {
      uuid: args.equipmentUuid,
    },
  });

  return true;
};

export default deleteEquipment;
