/* eslint-disable radix */
import prisma from '@/server/prisma';
import { DeleteTaskDto } from '../domain/dto/deleteTask.dto';

export async function deleteTaskUseCase({ taskId }: DeleteTaskDto) {
  const id = parseInt(taskId);
  return prisma.$transaction(async (Prisma) => {
    await Prisma.task.delete({
      where: { id },
    });
    return JSON.stringify({ status: 'Successfully Deleted' });
  });
}
