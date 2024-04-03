import { BeStrongContext } from '../../context';

const deleteEquipment = async (
  _parent: unknown,
  args: { equipmentUuid: string },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const deleted = await prisma.equipment.delete({
    where: {
      uuid: args.equipmentUuid,
    },
  });

  return deleted;
};

export default deleteEquipment;
