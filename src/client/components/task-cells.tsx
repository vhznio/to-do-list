/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import * as Material from '@mui/material';
import { MdDeleteForever } from 'react-icons/md';
import { LiaEditSolid } from 'react-icons/lia';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GetTaskDto } from '@/server/tasks/domain/dto/getTask.dto';
import getDate from '../helpers/getDate';
import getHour from '../helpers/getHour';
import PopUp from './popup';
import UpdateTaskForm from './edittask-form';

function Task({ id, name, date, priority, status }: GetTaskDto) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

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
        method: 'PATCH',
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
      <Material.TableCell
        sx={{
          textAlign: 'center',
        }}
      >
        <LiaEditSolid
          onClick={() => handleModal()}
          size={20}
          style={
            status
              ? {
                  color: 'rgba(0,0,0,0.4)',
                  marginTop: '4px',
                  cursor: 'pointer',
                }
              : { color: 'black', cursor: 'pointer', marginTop: '4px' }
          }
        />
      </Material.TableCell>
      <Material.TableCell
        sx={{
          textAlign: 'center',
        }}
      >
        <MdDeleteForever
          onClick={() => deleteRow(id)}
          size={20}
          style={
            status
              ? {
                  color: 'rgba(0,0,0,0.4)',
                  marginTop: '4px',
                  cursor: 'pointer',
                }
              : { color: 'black', cursor: 'pointer', marginTop: '4px' }
          }
        />
      </Material.TableCell>
      <PopUp
        form={
          <UpdateTaskForm
            date={date}
            id={id}
            name={name}
            priority={priority}
            status={status}
          />
        }
        handleModal={handleModal}
        isOpen={isOpen}
      />
    </>
  );
}

export default Task;
