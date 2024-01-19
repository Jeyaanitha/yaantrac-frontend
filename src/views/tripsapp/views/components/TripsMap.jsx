import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { createUseStyles } from 'react-jss';
import GoogleMapComponent from '../../../components/maps/GoogleMapComponent';
import GoogleDirections from '../../components/GoogleDirections';
import { TripsMapService } from '../services/OrderDetailsServies';

const useStyles = createUseStyles({
  root: {
    position: 'relative'
  },
  map: {
    height: `calc(90vh - 65px)`,
    width: '100%'
  }
});

const TripsMap = () => {
  // component styles
  const styles = useStyles();

  // component state
  const [locations, setLocations] = useState([]);

  // function to get TripsMap details

  const getTripsMapData = async () => {
    let res = await TripsMapService({ tripid: '2' });
    setLocations(res?.data?.data);
  };
  var waypts = [];
  var checkboxArray = locations;
  for (var i = 1; i < checkboxArray.length - 1; i++) {
    waypts.push({
      location: checkboxArray[i],
      stopover: false
    });
  }

  useEffect(() => {
    getTripsMapData();
  }, []);

  return (
    <Box className={styles.root}>
      <Box className={styles.map}>
        <GoogleMapComponent>
          <GoogleDirections
            locations={locations}
            origin={locations[0]}
            destination={locations[locations.length - 1]}
            waypoints={waypts}
          />
        </GoogleMapComponent>
      </Box>
    </Box>
  );
};

export default TripsMap;
