import { Genre } from '../../../../common/enums';
import { calculateAge } from '../../../../common/utils';
import measuresCalculator from '../../../logic/measuresCalculator';
import { BeStrongContext } from '../../context';

type InputType = {
  memberCode: string;
  id: number;
  weight: number;
  corporalFat: number;
  muscle: number;
  bodyMassIndex: number;
  corporalWaterPct: number;
  calories: number;
};

const funcMap = {
  corporalFat: {
    fn: measuresCalculator.calculateCorporalFat,
    prop: 'corporalFatResult',
  },
  muscle: {
    fn: measuresCalculator.calculateMuscle,
    prop: 'muscleResult',
  },
  bodyMassIndex: {
    fn: measuresCalculator.calculateBodyMassIndex,
    prop: 'bodyMassIndexResult',
  },
  corporalWaterPct: {
    fn: measuresCalculator.calculateCorporalWaterPct,
    prop: 'corporalWaterPctResult',
  },
  calories: {
    fn: measuresCalculator.calculateCalories,
    prop: 'caloriesResult',
  },
};

export default async (
  _parent: unknown,
  args: { measure: InputType },
  context: BeStrongContext
) => {
  const { memberCode, id, ...input } = args.measure;
  const { prisma } = context;

  const member = await prisma.member.findUnique({
    where: {
      code: memberCode,
    },
  });

  if (!member) {
    throw new Error('Member not found');
  }
  const age = calculateAge(member.birthDate);
  const typedGenre = member.genre as Genre;

  const details: Record<string, unknown> = {};
  Object.keys(input).forEach((key) => {
    const resultCalculation = funcMap[key as keyof typeof funcMap];
    if (resultCalculation) {
      const result = resultCalculation.fn(
        typedGenre,
        age,
        input[key as keyof typeof input]
      );
      details[resultCalculation.prop] = result;
    }
    details[key] = input[key as keyof typeof input];
  });

  const updatedMeasure = await prisma.memberMeasures.update({
    where: {
      id,
    },
    data: details,
  });

  return updatedMeasure;
};
