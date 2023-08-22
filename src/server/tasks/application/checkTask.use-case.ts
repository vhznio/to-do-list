/* eslint-disable radix */
import prisma from '@/server/prisma';
import { CheckTaskDto } from '../domain/dto/checkTask.dto';

export async function checkTaskUseCase({ id, status }: CheckTaskDto) {
  return prisma.$transaction(async (Prisma) => {
    await Prisma.task.update({
      where: { id },
      data: { status },
    });
    return JSON.stringify({ status: 'Successfully Updated' });
  });
}
