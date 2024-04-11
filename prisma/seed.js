const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function updateBirthDate() {
  const members = await prisma.member.findMany({
    where: {
      birthDateAsString: {
        equals: null
      },
      birthDate: {
        not: null
      }
    }
  });

  for (const member of members) {
    if(member.birthDate) {
    member.birthDate.setDate(member.birthDate.getDate() - 1);
    const year = member.birthDate.getFullYear();
    const month = member.birthDate.getMonth() + 1;
    const date = member.birthDate.getDate();
    const isoDate = `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}T00:00:00.000Z`;
    await prisma.member.update({
      where: {
        code: member.code
      },
      data: {
        birthDateAsString: isoDate
      }
    });
  }
  }
}

async function main() {

  await prisma.ownerUser.upsert({
    where: { username: 'thomas' },
    update: {},
    create: {
      username: 'thomas',
      name: 'Thomas Pacheco',
      pwd: '$2b$08$f7CVQ3nWJu2aCNOr5bLQJO39Cn4ZOnvl7ATMxgZk47i3j5rVXNvCq',
      role: 'admin'
    },
  });

  await prisma.gymClassTime.upsert({
    where: {
        isoTime: 'T23:30:00.000Z'
    },
    update: {},
    create: {
        isoTime: 'T23:30:00.000Z'
    }
  });

  await prisma.gymClassTime.upsert({
    where: {
        isoTime: 'T01:00:00.000Z'
    },
    update: {},
    create: {
        isoTime: 'T01:00:00.000Z'
    }
  });

  // await updateBirthDate();

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })