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
    } else if(req.method === 'PATCH'){
      const { taskId, } = req.query;
      const { status } = req.body;
      const checkData = {
        id: Number(taskId),
        status,
      }
      if(status !== undefined || status !== null){
        await checkTaskUseCase(checkData);
      }
      res.status(200).json({ message: 'Successfully Checked' });
    }
    else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
