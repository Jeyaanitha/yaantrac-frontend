import React from 'react';
import { Box, Card, Skeleton } from '@mui/material';
import DataTables from '../../../../components/customized/DataTables';

const RecentsEvents = ({ isLoading, rows, columns }) => (
  <Box
    sx={{
      width: '100%',
      p: 1,
      height: '470px'
    }}
    component={Card}
    elevation={6}
    p={isLoading && 2}
  >
    {isLoading ? (
      rows?.length && (
        <Skeleton animation='wave' variant='rectangular' width='100%' height={200} />
      )
    ) : (
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataTables rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Box>
    )}
  </Box>
);

export default RecentsEvents;
