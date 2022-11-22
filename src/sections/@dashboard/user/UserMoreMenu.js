import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

// import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import { handleOpenModal } from 'src/redux/modalSlice';
// component
import Iconify from '../../../components/Iconify';
import { useEffect } from 'react';
import userApi from 'src/apis/userApi';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, isActive }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={() => {
            dispatch(handleOpenModal({ type: 'deleteuser', id }));
            setIsOpen(false);
          }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {isActive && (
          <MenuItem
            // component={RouterLink}
            to="#"
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              dispatch(handleOpenModal({ type: 'blockuser', id }));
              setIsOpen(false);
            }}
          >
            <ListItemIcon>
              <Iconify icon="ant-design:lock-filled" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Khóa" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        {!isActive && (
          <MenuItem
            // component={RouterLink}
            to="#"
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              dispatch(handleOpenModal({ type: 'unblockuser', id }));
              setIsOpen(false);
            }}
          >
            <ListItemIcon>
              <Iconify icon="bx:key" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Mở khóa" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
