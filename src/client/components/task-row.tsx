/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import * as Material from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { GetTaskDto } from '@/server/tasks/domain/dto/getTask.dto';
import getDate from '../helpers/getDate';
import getHour from '../helpers/getHour';

function Task({ id, name, date, priority, status }: GetTaskDto) {
  const router = useRouter();

  const deleteRow = async (taskId: number) => {
    try {
      const endpoint = `api/tasks/${taskId}`;
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      throw new Error(' Invalid Data ');
    }
  };
  const checkRow = async (taskId: number) => {
    const body = {
      status: !status,
    };
    try {
      const endpoint = `api/tasks/${taskId}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      throw new Error(' Invalid Data ');
    }
  };

  return (
    <>
      <Material.TableCell
        align="center"
        sx={status ? { color: 'rgba(0,0,0,0.4)' } : { color: 'primary.main' }}
      >
        {name}
      </Material.TableCell>
      <Material.TableCell
        align="center"
        sx={status ? { color: 'rgba(0,0,0,0.4)' } : { color: 'black' }}
      >
        {getDate(date)}
      </Material.TableCell>
      <Material.TableCell
        align="center"
        sx={status ? { color: 'rgba(0,0,0,0.4)' } : { color: 'black' }}
      >
        {getHour(date)}
      </Material.TableCell>
      <Material.TableCell
        align="center"
        sx={status ? { color: 'rgba(0,0,0,0.4)' } : { color: 'black' }}
      >
        {priority}
      </Material.TableCell>
      <Material.TableCell align="center">
        <Material.Checkbox checked={status} onChange={() => checkRow(id)} />
      </Material.TableCell>
      <Material.TableCell>
        <MdDeleteForever
          onClick={() => deleteRow(id)}
          size={20}
          style={
            status
              ? {
                  color: 'rgba(0,0,0,0.4)',
                  marginTop: '8px',
                  cursor: 'pointer',
                }
              : { color: 'red', cursor: 'pointer', marginTop: '8px' }
          }
        />
      </Material.TableCell>
    </>
  );
}

export default Task;
