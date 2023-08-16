/* eslint-disable no-console */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import * as Material from '@mui/material';
import PopUp from './popup';
import NewTaskForm from './newtask-form';

interface AddButtonProps {
  msg: string;
}

const AddButton: React.FC<AddButtonProps> = ({ msg }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Material.Button
        onClick={handleModal}
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          ':hover': {
            bgcolor: 'primary.light',
          },
        }}
      >
        {msg}
      </Material.Button>
      <PopUp form={<NewTaskForm />} handleModal={handleModal} isOpen={isOpen} />
    </>
  );
};

export default AddButton;
