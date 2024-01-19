import React from 'react';
import { Box, Card, Fab } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import GoogleMapComponent from '../../../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../../../components/maps/GoogleMapMarker';

const DashboardMap = ({ getDashboardDeviceList }) => (
  <Box
    sx={{ height: '100vh', width: '100%', position: 'relative' }}
    component={Card}
    elevation={6}
  >
    <Box sx={{ position: 'absolute', right: 5, top: 5 }}>
      <Fab
        size='small'
        sx={{
          backgroundColor: '#00769E',
          '&:hover': {
            backgroundColor: '#00769E',
            color: 'white'
          }
        }}
        onClick={getDashboardDeviceList}
      >
        <FilterAltIcon sx={{ color: '#FFF' }} />
      </Fab>
    </Box>
    <GoogleMapComponent>
      <GoogleMapMarker />
    </GoogleMapComponent>
  </Box>
);

export default DashboardMap;
