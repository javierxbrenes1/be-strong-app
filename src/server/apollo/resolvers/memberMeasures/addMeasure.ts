import { Genre } from '../../../../common/enums';
import { calculateAge } from '../../../../common/utils';
import measuresCalculator from '../../../logic/measuresCalculator';
import { BeStrongContext } from '../../context';

type InputType = {
  memberCode: string;
  weight: number;
  corporalFat: number;
  muscle: number;
  bodyMassIndex: number;
  corporalWaterPct: number;
  calories: number;
  date: Date;
};

export default async (
  _parent: unknown,
  args: { measure: InputType },
  context: BeStrongContext
) => {
  const { prisma } = context;
  const { measure } = args;
  const member = await prisma.member.findUnique({
    where: {
      code: measure.memberCode,
    },
  });
  if (!member) {
    throw new Error('Member was not found');
  }
  const age = member?.birthDate ? calculateAge(member.birthDate) : 18;
  const genre = member.genre as Genre;

  const data = {
    ...measure,
    age,
    corporalFatResult: measuresCalculator.calculateCorporalFat(
      genre,
      age,
      measure.corporalFat
    ),
    corporalWaterPctResult: measuresCalculator.calculateCorporalWaterPct(
      genre,
      age,
      measure.corporalWaterPct
    ),
    bodyMassIndexResult: measuresCalculator.calculateBodyMassIndex(
      genre,
      age,
      measure.bodyMassIndex
    ),
    caloriesResult: measuresCalculator.calculateCalories(
      genre,
      age,
      measure.calories
    ),
    muscleResult: measuresCalculator.calculateMuscle(
      genre,
      age,
      measure.muscle
    ),
  };

  const newMeasure = await prisma.memberMeasures.create({ data });
  return newMeasure;
};
