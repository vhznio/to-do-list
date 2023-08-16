/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next';
import { getTaskUseCase } from '@/server/tasks/application/getTask.use-case';
import { createTaskUseCase } from '@/server/tasks/application/createTask.use-case';
import {
  CreateTaskDto,
  CreateTaskSchema,
} from '@/server/tasks/domain/dto/createTask.dto';
import { validate } from '@/server/common/application/validator.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const tasks = await getTaskUseCase();
      res.status(200).json({ tasks });
    } else if (req.method === 'POST') {
      const createTaskDto = validate<CreateTaskDto>(
        req.body,
        CreateTaskSchema,
        'Create task error',
      );
      await createTaskUseCase(createTaskDto);
      res.status(200).json('Successfully Created');
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
