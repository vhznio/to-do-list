import * as Material from '@mui/material';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import AddButton from '@/client/components/add-button';
import TaskTable from '@/client/components/task-table';
import headers from '@/client/constants/headers';
import buttonMsg from '@/client/constants/button-msg';
import title from '@/client/constants/title';
import { GetTaskDto } from '@/server/tasks/domain/dto/getTask.dto';

const taskEndpoint = `${process.env.BASE_URL}/api/tasks`;

export const getServerSideProps: GetServerSideProps<{
  tasks: GetTaskDto[],
}> = async () => {
  const res = await fetch(taskEndpoint);
  const { tasks = [] } = await res.json();
  return { props: { tasks } };
};

export default function Home({
  tasks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Material.Container>
      <Material.Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Material.Typography
          sx={{
            my: 2,
            textAlign: 'center',
            color: 'primary.main',
            fontSize: '1.5rem',
            padding: 2,
            borderRadius: '5px',
            backgroundColor: 'secondary.main',
          }}
        >
          {title}
        </Material.Typography>
        <AddButton msg={buttonMsg} />
      </Material.Box>
      <Material.Box
        sx={{
          my: 2,
          padding: 2,
          backgroundColor: 'secondary.main',
          borderRadius: '5px',
        }}
      >
        <TaskTable data={tasks} headers={headers} />
      </Material.Box>
    </Material.Container>
  );
}
