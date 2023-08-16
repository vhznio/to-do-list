/* eslint-disable prettier/prettier */
import prisma from '@/server/prisma';
import { GetTaskDto } from '../domain/dto/getTask.dto';

export async function getTaskUseCase(): Promise<GetTaskDto[]> {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      name: true,
      date: true,
      priority: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [
      { status: 'asc'},
    ],
  });
  return tasks.map((task) => ({
    id: task.id,
    name: task.name,
    date: task.date,
    priority: task.priority,
    status: task.status as boolean,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }));
}
