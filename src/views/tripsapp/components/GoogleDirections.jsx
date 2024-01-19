import React, { useEffect, useState } from 'react';
import { DirectionsRenderer, InfoWindow, Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../../app/redux/action/action';
import Geocode from 'react-geocode';
import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import './styles.scss';
import { createUseStyles } from 'react-jss';

// geocode API key
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const useStyles = createUseStyles({
  statusIcon: {
    fontSize: '30px',
    marginRight: '10px',
    opactity: '0.8'
  },
  orderId: {
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '600',
    letterSpacing: '0.01em',
    marginBottom: '0',
    textAlign: 'left'
  },
  deliveryStatus: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '14.52px',
    marginBottom: '0',
    paddingBottom: '5px'
  },
  quantity: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '13px',
    color: '#474747',
    margin: '0 0 5px 0',
    lineHeight: '19px'
  },
  location: {
    fontFamily: 'Inter',
    fontSize: '13px',
    fontWeight: '400',
    margin: '0',
    lineHeight: '17px',
    letterSpacing: '0.01em',
    textAlign: 'left',
    color: '#474747'
  }
});

const GoogleDirections = ({ origin, destination, waypoints, locations }) => {
  // function to dispatch
  const dispatch = useDispatch();
  const styles = useStyles();

  // component state
  const [directions, setDirections] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState([]);

  const concatenateNoWithStreet = inputArray => {
    if (inputArray.length < 2) return inputArray;

    const concatenatedString = inputArray[0] + inputArray[1];
    const newArray = [concatenatedString];
    newArray.push(...inputArray.slice(2));

    return newArray;
  };

  const handleReverseGeocode = async (lat, lng, info) => {
    const response = await Geocode.fromLatLng(lat, lng);
    const address = await response.results[0].formatted_address;
    const addressArray = await address.split(',');
    const resultArray = concatenateNoWithStreet(addressArray);
    setDeviceInfo([...info, ...resultArray]);
  };

  const handleMarkerClick = ({ id, lat, lng, info }) => {
    setSelectedDevice(id);
    handleReverseGeocode(lat, lng, info);
  };

  const findRoute = async () => {
    try {
      const directionsService = new window.google.maps.DirectionsService();
      const routes = await directionsService.route({
        origin,
        destination,
        waypoints,
        optimizeWaypoints: true,
        travelMode: window.google.maps.TravelMode.DRIVING
      });
      setDirections(routes);
    } catch (error) {
      dispatch(
        updateToast({
          show: true,
          message: 'Please choose another locations',
          severity: 'error'
        })
      );
    }
  };

  //for origin marker
  let waypointsAll = [];
  waypointsAll.unshift({
    id: 0,
    lat: origin?.lat,
    lng: origin?.lng,
    info: []
  });

  //for waypoints marker
  for (var i = 0; i < waypoints?.length; i++) {
    waypointsAll.push({
      id: i + 1,
      lat: waypoints[i].location?.lat,
      lng: waypoints[i].location?.lng,
      info: []
    });
  }

  //for destination marker
  waypointsAll.push({
    id: waypointsAll.length,
    lat: destination?.lat,
    lng: destination?.lng,
    info: []
  });

  useEffect(() => {
    findRoute();
  }, []);

  useEffect(() => {
    setSelectedDevice(null);
    setDeviceInfo([]);
  }, [waypoints]);

  return (
    <>
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true
          }}
        />
      )}
      {waypoints &&
        waypointsAll?.map((waypoint, index) => {
          let { id, lat, lng, info } = waypoint;
          let title = info[0]?.split(' ')?.pop();
          return (
            <Marker
              key={index}
              title={title}
              // position={{ lat, lng }}
              position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
              label={{
                text:
                  index === 0 || index === waypointsAll?.length - 1
                    ? 'A'
                    : index.toString(),
                color: 'White',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
              onClick={() => handleMarkerClick(waypoint)}
            >
              {selectedDevice === id && (
                <InfoWindow onCloseClick={() => setSelectedDevice(null)}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      boxShadow: '0px 20px 50px 0px #DCE0F980',
                      borderRadius: '12px',
                      minWidth: '300px',
                      maxWidth: '300px'
                    }}
                    className='customKhubstyle'
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Icon
                        className={styles.statusIcon}
                        style={{
                          color:
                            (index === 0 || index === waypointsAll?.length - 1
                              ? '#485CF0'
                              : '') ||
                            (locations[index]?.status === 'PENDING'
                              ? '#ffa000'
                              : '#0EBC93')
                        }}
                        icon={
                          index === 0 || index === waypointsAll?.length - 1
                            ? 'ic:round-warehouse'
                            : 'carbon:circle-filled'
                        }
                      />
                      <Box>
                        <Typography paragraph className={styles.orderId}>
                          {index === 0 || index === waypointsAll?.length - 1
                            ? `Warehouse`
                            : `Order ID : ${locations[index]?.orderId}`}
                        </Typography>
                        <Typography
                          paragraph
                          className={styles.deliveryStatus}
                          sx={{
                            color:
                              (index === 0 || index === waypointsAll?.length - 1
                                ? '#485CF0'
                                : '') ||
                              (locations[index]?.status === 'PENDING'
                                ? '#ffa000'
                                : '#0EBC93')
                          }}
                        >
                          {index === 0 || index === waypointsAll?.length - 1
                            ? `Source`
                            : `${locations[index]?.status}`}
                        </Typography>
                      </Box>
                    </Box>
                    {index !== 0 && index !== waypointsAll?.length - 1 && (
                      <Box>
                        {' '}
                        <Typography paragraph className={styles.quantity}>
                          Quantity :
                          <span style={{ fontWeight: '700' }}>
                            {locations[index]?.noOfItems}
                          </span>
                        </Typography>
                        <Typography paragraph className={styles.quantity}>
                          Customer Name :
                          <span style={{ fontWeight: '700' }}>
                            {locations[index]?.customerName}
                          </span>
                        </Typography>
                        <Typography paragraph className={styles.quantity}>
                          MobileNo:
                          <span style={{ fontWeight: '700' }}>
                            {locations[index]?.mobileNumber}
                          </span>
                        </Typography>
                      </Box>
                    )}
                    {deviceInfo?.map(item => (
                      <Typography paragraph key={item} className={styles.location}>
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
    </>
  );
};

export default GoogleDirections;
