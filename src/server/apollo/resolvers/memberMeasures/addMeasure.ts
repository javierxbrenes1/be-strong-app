import measuresCalculator from "../../../logic/measuresCalculator";
import { Genre } from "../../../logic/types";
import { BeStrongContext } from "../../context"

type InputType = {
    memberCode: string,
    weight: number,
    corporalFat: number,
    muscle: number,
    bodyMassIndex: number,
    corporalWaterPct: number,
    calories: number
}

const calculateAge = (dateBirth: Date): number =>  {
    const diff = (new Date()).getTime() - dateBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const addMeasure = async(_parent: unknown, args: {measure: InputType}, context: BeStrongContext) => {
    const { prisma } = context;
    const {measure} = args;
    const member = await prisma.member.findUnique({
        where: {
            code: measure.memberCode
        }
    });
    if(!member) {
        throw new Error('Member was not found');
    }
    const age = calculateAge(member.birthDate);
    const genre = member.genre as Genre;
   
    const data = {
        ...measure,
        age,
        corporalFatResult: measuresCalculator.calculateCorporalFat(genre, age,measure.corporalFat),
        corporalWaterPctResult: measuresCalculator.calculateCorporalWaterPct(genre, age, measure.corporalWaterPct),
        bodyMassIndexResult: measuresCalculator.calculateBodyMassIndex(genre, age, measure.bodyMassIndex),
        caloriesResult: measuresCalculator.calculateCalories(genre, age, measure.calories),
        muscleResult: measuresCalculator.calculateMuscle(genre, age, measure.muscle)
    }

    const newMeasure = await prisma.memberMeasures.create({data});
    return newMeasure;
}