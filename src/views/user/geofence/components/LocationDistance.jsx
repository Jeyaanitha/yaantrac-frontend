import React, { useEffect } from 'react';
import { Box, Card } from '@mui/material';
import Tables from '../../../components/customized/Tables';
import CustomButton from '../../../components/buttons/CustomButton';

const LocationDistance = ({
  setLocationToMeasure,
  setIsEnableMarker,
  data = null,
  setRouteMeasure
}) => {
  // get data for the table
  let { origin, destination, distance, duration } = data;
  distance = parseFloat(distance / 1000).toFixed(3);
  duration = parseFloat(duration / 60).toFixed(2);

  // row & column definition for the table
  let result = [
    { key: 'Origin', value: origin },
    { key: 'Destination', value: destination },
    { key: 'Distance', value: `${distance} KM` },
    { key: 'Duration', value: `${duration} Mins` }
  ];

  // function to handle marker
  const handleEnableMarker = () => setIsEnableMarker(true);

  useEffect(() => {
    setRouteMeasure({
      origin: null,
      destination: null,
      distance: null,
      duration: null
    });
  }, []);

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '358px' }}>
      <Card sx={{ boxShadow: 'none' }}>
        <Box p={1}>
          <CustomButton
            variant='contained'
            size='small'
            category='Plot Lat/Lng'
            onClick={() => {
              handleEnableMarker();
              setLocationToMeasure(null);
            }}
          />

          {data && <Tables data={result} />}
        </Box>
      </Card>
    </Box>
  );
};

export default LocationDistance;
