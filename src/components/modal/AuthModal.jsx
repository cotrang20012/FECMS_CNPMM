import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack } from '@mui/material';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { handleCloseModal } from 'src/redux/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
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

const fakeData = [
  {
    id: 1,
    name: 'User',
  },
  {
    id: 2,
    name: 'Admin',
  },
];
const AuthModal = () => {
  const [age, setAge] = React.useState('');
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return ReactDOM.createPortal(
    <Modal
      open={isModalOpen}
      onClose={() => {
        dispatch(handleCloseModal());
      }}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Stack sx={{ ...style }} direction={'column'} rowGap={'1rem'}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Phân quyền</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Phân quyền"
            onChange={handleChange}
          >
            {fakeData.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button variant="outlined" color="primary">
            Thay đổi
          </Button>
          <Button variant="outlined" color="error">
            Hủy bỏ
          </Button>
        </Stack>
      </Stack>
    </Modal>,
    document.querySelector('body')
  );
};

export default AuthModal;
