import { Box } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function Maploader() {
  return (
    <div>
      <Box className='maploader' />
      <Box p={2}>
        <SearchIcon className='blinking' />
        Fetching Data...
      </Box>
    </div>
  );
}

export default Maploader;
