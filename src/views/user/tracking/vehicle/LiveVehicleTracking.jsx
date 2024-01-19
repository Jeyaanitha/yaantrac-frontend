import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GoogleMapComponent from '../../../components/maps/GoogleMapComponent';
import GoogleDirections from '../../../components/maps/GoogleDirections';
import GoogleMapMarker from '../../../components/maps/GoogleMapMarker';
import CustomSquareButton from '../../../components/buttons/CustomSquareButton';
import { createUseStyles } from 'react-jss';
import TrackVehicle from './components/TrackVehicle';
import SearchNearby from './components/SearchNearby';

const useStyles = createUseStyles(
  () => ({
    root: {
      position: 'relative'
    },
    map: {
      height: `calc(100vh - 65px)`,
      width: '100%'
    },
    actions: {
      position: 'absolute',
      zIndex: 1000,
      top: 0,
      right: 0,
      margin: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiButtonBase-root': {
        padding: 1
      }
    },
    typo: {
      fontSize: '12px !important'
    },
    ul: {
      marginBottom: '0px !important ',
      fontSize: '12px'
    }
  }),
  { index: 1 }
);

const LiveVehicleTracking = () => {
  // component styles
  const styles = useStyles();

  // component state
  const [selected, setSelected] = useState(null);
  const [isEnableMarker, setIsEnableMarker] = useState(false);

  const [markerPosition, setMarkerPosition] = useState({
    lat: 13.067439,
    lng: 80.237617
  });

  const [locationToMeasure, setLocationToMeasure] = useState({
    source: null,
    destination: null
  });

  // funtion to change the user action
  const changeUserAction = action => setSelected(action);

  // get coordinates when click on the map
  const handleMapClick = event => {
    if (
      selected === 'myoffice' ||
      selected === 'userlandmark' ||
      selected === 'locationdistance'
    ) {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  useEffect(() => {
    if (isEnableMarker) {
      if (!locationToMeasure?.source)
        setLocationToMeasure(prev => ({ ...prev, source: markerPosition }));
      else if (!locationToMeasure?.destination) {
        setLocationToMeasure(prev => ({ ...prev, destination: markerPosition }));
      } else setLocationToMeasure({ source: markerPosition, destination: null });
    }
  }, [markerPosition]);

  // User Actions component
  const UserActions = () => (
    <Box className={styles.actions}>
      <CustomSquareButton
        selected={selected}
        category='Track Vehicle'
        onClick={() => {
          changeUserAction('track');
          setIsEnableMarker(false);
          setLocationToMeasure({});
        }}
      />

      <CustomSquareButton
        selected={selected}
        category='Search Filter'
        onClick={() => {
          changeUserAction('filter');
          setIsEnableMarker(false);
          setLocationToMeasure({});
        }}
      />
    </Box>
  );

  return (
    <Box className={styles.root}>
      <Box className={styles.map}>
        <GoogleMapComponent handleMapClick={handleMapClick} zoom={10}>
          <GoogleMapMarker />

          {isEnableMarker &&
            locationToMeasure?.source &&
            locationToMeasure?.destination && (
              <GoogleDirections
                origin={locationToMeasure?.source}
                destination={locationToMeasure?.destination}
              />
            )}
        </GoogleMapComponent>
      </Box>

      <UserActions />

      {selected === 'track' ? (
        <TrackVehicle changeUserAction={changeUserAction} />
      ) : selected === 'filter' ? (
        <SearchNearby changeUserAction={changeUserAction} />
      ) : null}
    </Box>
  );
};

export default LiveVehicleTracking;
