/* eslint-disable radix */
import prisma from '@/server/prisma';
import { EditTaskDto } from '../domain/dto/editTask.dto';

export async function editTaskUseCase({
  id,
  name,
  date,
  priority,
}: EditTaskDto) {
  return prisma.$transaction(async (Prisma) => {
    await Prisma.task.update({
      where: { id },
      data: { name, date, priority },
    });
    return JSON.stringify({ status: 'Successfully Edited' });
  });
}
