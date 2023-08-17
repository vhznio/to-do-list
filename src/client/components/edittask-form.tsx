/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
import React from 'react';
import * as Material from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { GetTaskDto } from '@/server/tasks/domain/dto/getTask.dto';
import InputText from './custom/input-text';
import BasicDateTimePicker from './custom/input-date-time';
import BasicSelect from './custom/select-priority';

const EditTaskForm = ({ id, name, priority }: GetTaskDto) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      id,
      name,
      date: dayjs(Date()),
      priority,
    },
    onSubmit: async (values) => {
      try {
        const endpoint = `api/tasks/${id}`;
        const body = {
          id: values.id,
          name: values.name,
          date: values.date,
          priority: values.priority,
        };
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
    },
    validationSchema: Yup.object({
      name: Yup.string().required('The task must have a name.'),
    }),
  });

  return (
    <Material.Grid
      component="form"
      container
      onSubmit={formik.handleSubmit}
      sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        alignItems: 'center',
      }}
    >
      <InputText formik={formik} label="Task Name" name="name" type="text" />
      <BasicDateTimePicker formik={formik} label="Schedule" name="date" />
      <BasicSelect
        formik={formik}
        label="Priority"
        name="priority"
        options={['HIGH', 'MID', 'LOW']}
      />
      <Material.Button color="primary" type="submit" variant="contained">
        EDIT
      </Material.Button>
    </Material.Grid>
  );
};

export default EditTaskForm;
