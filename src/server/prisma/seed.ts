import prisma from '.';
import taskSeed from './seeders/taskSeed';

async function main() {
  await taskSeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log(e);
  });
