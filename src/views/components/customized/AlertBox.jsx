import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';
import { updateToast } from '../../../app/redux/action/action';

const AlertBox = () => {
  // get toast state from redux state
  const { toast } = useSelector(state => state.reducers);

  // function to update toast state
  const dispatch = useDispatch();

  // function to close the toast
  const handleClose = () => {
    dispatch(updateToast({ ...toast, show: false }));
  };

  return (
    <Snackbar
      open={toast?.show}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert
        onClose={handleClose}
        severity={toast?.severity}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {toast?.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBox;
