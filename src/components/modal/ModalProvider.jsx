import { Button, FormControl, Modal, Stack, Typography } from '@mui/material';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleCloseModal } from 'src/redux/modalSlice';

// const fakeData = [
//   {
//     id: 1,
//     name: 'User',
//   },
//   {
//     id: 2,
//     name: 'Admin',
//   },
// ];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  padding: '2rem',
  borderRadius: '2rem',
};
const ModalProvider = ({ id, content, handleClickAccept }) => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(handleCloseModal());
  };
  return ReactDOM.createPortal(
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Stack sx={{ ...style }} direction={'column'} rowGap={'1rem'}>
        <FormControl fullWidth>
          <Typography variant="h5">{content}</Typography>
        </FormControl>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              handleClickAccept(id);
              closeModal();
            }}
          >
            Đồng ý
          </Button>
          <Button variant="outlined" color="error" onClick={closeModal}>
            Hủy bỏ
          </Button>
        </Stack>
      </Stack>
    </Modal>,
    document.querySelector('body')
  );
};

export default ModalProvider;
