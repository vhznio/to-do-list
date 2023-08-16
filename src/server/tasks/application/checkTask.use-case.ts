/* eslint-disable radix */
import prisma from '@/server/prisma';
import { CheckTaskDto } from '../domain/dto/checkTask.dto';

export async function checkTaskUseCase({ taskId, status }: CheckTaskDto) {
  const id = parseInt(taskId);
  return prisma.$transaction(async (Prisma) => {
    await Prisma.task.update({
      where: { id },
      data: { status },
    });
    return JSON.stringify({ status: 'Successfully Updated' });
  });
}
