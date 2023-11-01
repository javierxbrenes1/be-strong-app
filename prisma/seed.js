const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
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