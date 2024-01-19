import React from 'react';
import VehicleDashboard from './components/VehicleDashboard';
import { Box } from '@mui/material';

const Dashboard = () => (
  <Box sx={{ height: `calc(100vh - 64px)`, overflow: 'auto' }}>
    <VehicleDashboard />
  </Box>
);

export default Dashboard;
