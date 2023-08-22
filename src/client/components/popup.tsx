/* eslint-disable react/function-component-definition */
import * as Material from '@mui/material';

interface PopUpProps {
  isOpen: boolean;
  handleModal: () => void;
  form: React.ReactNode;
}

const PopUp = ({ isOpen, handleModal, form }: PopUpProps) => {
  return (
    <Material.Modal
      aria-describedby="parent-modal-description"
      aria-labelledby="parent-modal-title"
      onClose={handleModal}
      open={isOpen}
    >
      <Material.Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          pt: 2,
          px: 4,
          pb: 3,
          border: 'none',
        }}
      >
        {form}
      </Material.Box>
    </Material.Modal>
  );
};

export default PopUp;
