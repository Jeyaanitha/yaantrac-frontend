import React from 'react';
import { Box, Card, Skeleton } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';

const VehicleSpeedGraph = ({ isLoading, Highcharts, options }) => (
  <Box
    sx={{
      p: 1,
      height: '470px'
    }}
    component={Card}
    elevation={6}
    className='dashboard'
  >
    {isLoading ? (
      <Skeleton animation='wave' variant='rectangular' width={550} height={500} />
    ) : (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        height='100%'
        width='100%'
        overflow='hidden'
      />
    )}
  </Box>
);

export default VehicleSpeedGraph;
