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

/**
 *  @openapi
 *  /api/tasks:
 *    get:
 *      tags:
 *        - Tasks
 *      summary: Get tasks.
 *      responses:
 *        200:
 *          description: Returns an object with the task data.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                    description: ID of the task.
 *                  name:
 *                    type: string
 *                  date:
 *                    type: Date
 *                  priority:
 *                    type: string
 *                  status:
 *                    type: boolean
 *              example:
 *                id: 1
 *                name: Study
 *                date: 2023-08-13T14:30:00
 *                priority: HIGH
 *                status: true
 *        400:
 *          description: Returns an object with an error code.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "An error has occurred in the request."
 *                  severity: "error"
 */
