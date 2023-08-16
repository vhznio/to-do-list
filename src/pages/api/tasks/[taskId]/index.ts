/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteTaskUseCase } from '@/server/tasks/application/deleteTask.use-case';
import { checkTaskUseCase } from '@/server/tasks/application/checkTask.use-case';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { taskId } = req.query;
    if (req.method === 'DELETE') { 
        const deleteTask = {
          taskId: taskId as string,
        }    
        await deleteTaskUseCase(deleteTask);
        res.status(200).json({ message: 'Successfully Deleted' });
    } else if( req.method === 'PUT') {
        const { status } = req.body;
        const checkData = {
          taskId: taskId as string,
          status,
        }
        if(status !== undefined || status !== null){
          await checkTaskUseCase(checkData);
        }
        res.status(200).json({ message: 'Successfully Updated' });
    } 
    else {
        res.status(405).end();
    }
  } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
  }
}
