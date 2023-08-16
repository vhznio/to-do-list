import prisma from '..';
import tasks from '../data/tasks';

export default async function taskSeed() {
  try {
    await prisma.$transaction(
      tasks.map(({ id, name, date, priority, status }) =>
        prisma.task.upsert({
          create: {
            id,
            name,
            date,
            priority,
            status,
          },
          update: {},
          where: {
            id,
          },
        }),
      ),
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
