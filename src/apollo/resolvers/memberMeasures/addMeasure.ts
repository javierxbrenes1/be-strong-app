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

const addMeasure = async(_parent: unknown, args: {input: InputType}, context: BeStrongContext) => {
    const { prisma } = context;
    const {input} = args;
    const member = await prisma.member.findUnique({
        where: {
            code: input.memberCode
        }
    });
    if(!member) {
        throw new Error('Member was not found');
    }
    const memberAge = calculateAge(member.birthDate);


}