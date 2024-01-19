import { Box } from '@mui/material';
import React from 'react';
import logo from '../../../app/images/favicon.png';

function Loader() {
  return (
    <Box className='loader'>
      <img className='logo' src={logo} alt='logo' height='50px' width='50px' />
    </Box>
  );
}

export default Loader;
