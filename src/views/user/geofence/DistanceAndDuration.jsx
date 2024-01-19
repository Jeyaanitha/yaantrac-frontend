import React, { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../components/maps/GoogleMapMarker';
import { createUseStyles } from 'react-jss';
import CustomSquareButton from '../../components/buttons/CustomSquareButton';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import VehicleDistance from './components/VehicleDistance';
import LocationDistance from './components/LocationDistance';
import GoogleDistance from '../../components/maps/GoogleDistance';
import GoogleDirections from '../../components/maps/GoogleDirections';
import { useDispatch } from 'react-redux';
import { updateCenter } from '../../../app/redux/action/action';

const useStyles = createUseStyles({
  root: {
    position: 'relative'
  },
  map: {
    height: `calc(100vh - 65px)`,
    width: '100%'
  },
  filterBar: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    margin: 8
  },
  filter: {
    position: 'absolute',
    zIndex: 1000,
    left: 5,
    bottom: 5,
    width: '30%',
    minWidth: '200px',
    minHeight: '280px',
    height: 'fit-content',
    marginTop: '100px'
  },
  '& .css-78trlr-MuiButtonBase-root-MuiIconButton-root:hover': {
    backgroundColor: 'none !important'
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00769E',
    color: '#FFF',
    width: '100%'
  },
  icon: {
    color: '#00769E',
    padding: '10px',
    display: 'inline-block',
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '5px',
    cursor: 'pointer',
    transition: 'all .2s ease'
  },
  bgIcon: {
    color: '#fff',
    backgroundColor: '#00769E',
    padding: '10px',
    display: 'inline-block',
    border: '1px solid #00769E',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'all .2s ease'
  }
});

const DistanceAndDuration = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // component state
  const [selected, setSelected] = useState('vehiclesdistance');
  const [isOpenDistanceAndDuration, setIsOpenDistanceAndDuration] = useState(false);
  const [isEnableMarker, setIsEnableMarker] = useState(false);
  const [isShowRouteMeasure, setIsShowRouteMeasure] = useState(false);
  const [isShowRouteDistance, setIsShowRouteDistance] = useState(false);
  const [locationToMeasure, setLocationToMeasure] = useState({
    source: null,
    destination: null
  });
  const [routeMeasure, setRouteMeasure] = useState({
    origin: null,
    destination: null,
    distance: null,
    duration: null
  });
  const [markerPosition, setMarkerPosition] = useState({
    lat: 13.067439,
    lng: 80.237617
  });

  // funtion to change the user action
  const changeUserAction = action => setSelected(action);

  // function to handle click on map
  const handleMapClick = event => {
    if (selected === 'locationdistance') {
      setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  useEffect(() => {
    if (isEnableMarker) {
      if (!locationToMeasure?.source)
        setLocationToMeasure(prev => ({ ...prev, source: markerPosition }));
      else if (!locationToMeasure?.destination) {
        setLocationToMeasure(prev => ({ ...prev, destination: markerPosition }));
        setIsShowRouteMeasure(true);
      } else setLocationToMeasure({ source: markerPosition, destination: null });
    }
    return () => dispatch(updateCenter({ lat: 13.0827, lng: 80.2707 }));
  }, [markerPosition]);

  useEffect(() => {
    setLocationToMeasure({
      source: null,
      destination: null
    });
    setIsEnableMarker(false);
  }, [selected]);

  return (
    <Box className={styles.root}>
      <Box className={styles.map}>
        <GoogleMapComponent handleMapClick={handleMapClick}>
          <GoogleMapMarker />
          {isEnableMarker &&
            locationToMeasure?.source &&
            locationToMeasure?.destination && (
              <GoogleDirections
                origin={locationToMeasure?.source}
                destination={locationToMeasure?.destination}
              />
            )}

          {isEnableMarker &&
            isShowRouteMeasure &&
            locationToMeasure?.source &&
            locationToMeasure?.destination && (
              <GoogleDistance
                locationToMeasure={locationToMeasure}
                setRouteMeasure={setRouteMeasure}
                setIsShowRouteMeasure={setIsShowRouteMeasure}
              />
            )}

          {isEnableMarker &&
            isShowRouteDistance &&
            locationToMeasure?.source &&
            locationToMeasure?.destination && (
              <GoogleDistance
                locationToMeasure={locationToMeasure}
                setRouteMeasure={setRouteMeasure}
                setIsShowRouteMeasure={setIsShowRouteMeasure}
              />
            )}
        </GoogleMapComponent>
      </Box>

      <Box className={styles.filterBar}>
        <CustomSquareButton
          category='Distance Duration'
          selected={isOpenDistanceAndDuration}
          onClick={() => setIsOpenDistanceAndDuration('distanceduration')}
        />
      </Box>

      {isOpenDistanceAndDuration === 'distanceduration' && (
        <Card className={styles.filter}>
          <Box className={styles.filterHeader} px={2}>
            <Typography component='h6' variant='p'>
              {`Distance and Duration`}
            </Typography>
            <CustomIconButton
              category='White Close'
              onClick={() => {
                setIsOpenDistanceAndDuration(null);
                setLocationToMeasure({ source: null, destination: null });
              }}
            />
          </Box>

          <Box>
            <CustomSquareButton
              selected={selected}
              category='Vehicles Distance'
              onClick={() => {
                changeUserAction('vehiclesdistance');
              }}
            />
            <CustomSquareButton
              selected={selected}
              category='Location Distance'
              onClick={() => {
                changeUserAction('locationdistance');
              }}
            />
          </Box>

          {selected === 'vehiclesdistance' ? (
            <VehicleDistance
              locationToMeasure={locationToMeasure}
              setLocationToMeasure={setLocationToMeasure}
              routeMeasure={routeMeasure}
              setIsEnableMarker={setIsEnableMarker}
              changeUserAction={changeUserAction}
              setIsShowRouteMeasure={setIsShowRouteMeasure}
              setIsShowRouteDistance={setIsShowRouteDistance}
              setRouteMeasure={setRouteMeasure}
              data={routeMeasure}
            />
          ) : selected === 'locationdistance' ? (
            <LocationDistance
              setIsEnableMarker={setIsEnableMarker}
              changeUserAction={changeUserAction}
              setLocationToMeasure={setLocationToMeasure}
              setRouteMeasure={setRouteMeasure}
              data={routeMeasure}
            />
          ) : null}
        </Card>
      )}
    </Box>
  );
};

export default DistanceAndDuration;
