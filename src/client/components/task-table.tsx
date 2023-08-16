/* eslint-disable react/function-component-definition */
import * as Material from '@mui/material';
import React from 'react';
import { GetTaskDto } from '@/server/tasks/domain/dto/getTask.dto';
import TaskRow from './task-row';

interface RowProps {
  data: GetTaskDto[];
  headers: string[];
}

const TaskTable: React.FC<RowProps> = ({ data, headers }) => {
  return (
    <Material.TableContainer component={Material.Paper}>
      <Material.Table>
        <Material.TableHead>
          <Material.TableRow>
            {headers.map((item) => {
              return (
                <Material.TableCell key={item} align="center">
                  {item}
                </Material.TableCell>
              );
            })}
          </Material.TableRow>
        </Material.TableHead>
        <Material.TableBody>
          {data.map((cell) => {
            const checkedTask = {
              bgColor: '',
            };
            if (cell.status) {
              checkedTask.bgColor = `rgba(0,0,0,0.05)`;
            }
            return (
              <Material.TableRow
                key={cell.id}
                sx={{
                  bgcolor: checkedTask.bgColor,
                }}
              >
                <TaskRow
                  date={cell.date}
                  id={cell.id}
                  name={cell.name}
                  priority={cell.priority}
                  status={cell.status}
                />
              </Material.TableRow>
            );
          })}
        </Material.TableBody>
      </Material.Table>
    </Material.TableContainer>
  );
};

export default TaskTable;
