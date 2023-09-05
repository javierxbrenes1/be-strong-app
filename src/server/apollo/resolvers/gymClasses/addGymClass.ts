import { getIsoTime } from '../../../utils/dateshelper';
import { BeStrongContext } from '../../context';

type InputType = {
  classDate: string;
  classTimeIds: number[];
  classDurationInMinutes: number;
  classType: string;
  classDescription: string;
};

const addGymClass = async (
  _parent: unknown,
  args: { input: InputType },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const {
    classDate,
    classTimeIds,
    classDurationInMinutes,
    classType,
    classDescription,
  } = args.input;

  const newGymClass = await prisma.gymClass.create({
    data: {
      classDate: getIsoTime(classDate),
      classDurationInMinutes,
      classType,
      classDescription,
      gymClassOnTimes: {
        create: classTimeIds.map((t) => ({
          gymClassTime: {
            connect: {
              id: t,
            },
          },
        })),
      },
    },
    include: {
      gymClassOnTimes: {
        include: {
          gymClassTime: true,
        },
      },
    },
  });

  return newGymClass;
};

export default addGymClass;
