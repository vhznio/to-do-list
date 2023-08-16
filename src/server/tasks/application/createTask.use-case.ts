import prisma from '@/server/prisma';
import { CreateTaskDto } from '../domain/dto/createTask.dto';

export async function createTaskUseCase(createTaskDto: CreateTaskDto) {
  return prisma.$transaction(async (Prisma) => {
    await Prisma.task.create({
      data: {
        name: createTaskDto.name,
        date: createTaskDto.date,
        priority: createTaskDto.priority,
        status: createTaskDto.status,
      },
    });
    return JSON.stringify({ status: 'Successfully Created' });
  });
}
