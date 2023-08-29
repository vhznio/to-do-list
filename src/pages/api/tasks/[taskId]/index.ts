/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTaskUseCase } from '@/server/tasks/application/deleteTask.use-case';
import { checkTaskUseCase } from '@/server/tasks/application/checkTask.use-case';
import { editTaskUseCase } from '@/server/tasks/application/editTask.use-case';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'DELETE') {
      const { taskId } = req.query;
      const deleteTaskDto = {
        id: Number(taskId),
      };
      if (taskId) {
        await deleteTaskUseCase(deleteTaskDto);
      }
      res.status(200).json({ message: 'Successfully Deleted' });
    } else if (req.method === 'PUT') {
      const { id, name, date, priority, status } = req.body;
      const task = {
        id,
        name,
        date,
        priority,
        status,
      };
      if (status !== null) {
        await editTaskUseCase(task);
      }
      res.status(200).json({ message: 'Successfully Updated' });
    } else if (req.method === 'PATCH') {
      const { taskId } = req.query;
      const { status } = req.body;
      const checkData = {
        id: Number(taskId),
        status,
      };
      if (status !== undefined || status !== null) {
        await checkTaskUseCase(checkData);
      }
      res.status(200).json({ message: 'Successfully Checked' });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 *  @openapi
 *  /api/tasks/{taskId}:
 *    put:
 *      tags:
 *        - Tasks
 *      summary: Update the task.
 *      parameters:
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *                date:
 *                  type: Date
 *                priority:
 *                  type: string
 *                status:
 *                  type: boolean
 *            examples:
 *              status:
 *                summary: Update the task.
 *                value:
 *                  id: 24
 *                  name: "Visiting Grandma."
 *                  date: "2023-08-21T04:45:51.000Z"
 *                  priority: "LOW"
 *                  status: false
 *      responses:
 *        200:
 *          description: Returns an object with a successful message.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "The registry has been updated."
 *                  severity: "success"
 *        400:
 *          description: Returns an object with an error code.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "An error has occurred in the request."
 *                  severity: "error"
 */

/**
 *  @openapi
 *  /api/tasks/{taskId}:
 *    patch:
 *      tags:
 *        - Tasks
 *      summary: Check task as complete.
 *      parameters:
 *        - name: taskId
 *          in: path
 *          description: Id of the task.
 *          required: true
 *          example: 1
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *            examples:
 *              status:
 *                summary: Update the check.
 *                value:
 *                  status: false
 *      responses:
 *        200:
 *          description: Returns an object with a successful message.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "The registry has been updated."
 *                  severity: "success"
 *        400:
 *          description: Returns an object with an error code.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "An error has occurred in the request."
 *                  severity: "error"
 */

/**
 *  @openapi
 *  /api/tasks/{taskId}:
 *    delete:
 *      tags:
 *        - Tasks
 *      summary: Delete task.
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Id of the task.
 *          required: true
 *          example: 1
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *            examples:
 *              status:
 *                summary: Update the check.
 *                value:
 *                  status: false
 *      responses:
 *        200:
 *          description: Returns an object with a successful message.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "The registry has been updated."
 *                  severity: "success"
 *        400:
 *          description: Returns an object with an error code.
 *          content:
 *            application/json:
 *              example:
 *                message:
 *                  text: "An error has occurred in the request."
 *                  severity: "error"
 */