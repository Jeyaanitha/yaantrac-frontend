import React, { useEffect, useState } from 'react';
import { DirectionsRenderer, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateToast } from '../../../app/redux/action/action';
import Geocode from 'react-geocode';
import { Icon } from '@iconify/react';
import { Box, Typography } from '@mui/material';
import './styles.scss';
import { createUseStyles } from 'react-jss';
import CloseIcon from '@mui/icons-material/Close';

// geocode API key
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const useStyles = createUseStyles({
  infoBox: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    backgroundColor: '#fff',
    margin: '10px',
    padding: '10px',
    boxShadow: '0px 20px 50px #DCE0F980',
    borderRadius: '10px'
  },
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
    textAlign: 'left',
    paddingBottom: '10px'
  },
  deliveryStatus: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '14.52px',
    marginBottom: '0'
  },
  quantity: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: '13px',
    color: '#474747',
    margin: '0 0 10px 0',
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
    color: '#474747',
    display: 'inline'
  },
  CloseIconBorder: {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    borderRadius: '8px',
    backgroundColor: '#E8E8E8',
    boxShadow: '0px 20px 60px 0px #0000000D',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    fontSize: '15px',
    color: '#000'
  },
  driverIcon: {
    color: '#019dd8',
    fontSize: '25px',
    marginRight: '10px'
  },
  driverNo: {
    color: '#333',
    fontWeight: '600',
    margin: '0'
  },
  driverAdd: {
    color: '#0EBC93',
    fontSize: '50px',
    marginRight: '10px'
  },
  customerAdd: {
    color: '#3239EA',
    fontSize: '50px',
    marginRight: '10px'
  },
  dot: {
    fontSize: '25px'
  }
});

const CustomerGoogleDirections = ({ origin, destination, waypoints }) => {
  // function to dispatch
  const dispatch = useDispatch();
  const styles = useStyles();

  // component state
  const [directions, setDirections] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState([]);
  let { markers = [] } = useSelector(state => state.reducers);

  //for markers
  const youAreHere = {
    icon: {
      path: window.google.maps.SymbolPath.CIRCLE,
      strokeColor: '#1D9BC7',
      fillColor: '#FFF',
      strokeOpacity: 0.6,
      fillOpacity: 1,
      scale: 14,
      strokeWeight: 12
    }
  };

  const carTopView = {
    icon: {
      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 7,
      strokeColor: '#FFFFFF',
      fillColor: '#0000FF',
      fillOpacity: 0.7,
      strokeWeight: 2,
      rotation: 0
    }
  };

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

  useEffect(() => {
    setSelectedDevice(null);
    setDeviceInfo([]);
  }, [waypoints]);

  useEffect(() => {
    findRoute();
  }, []);

  useEffect(() => {
    setSelectedDevice(null);
    setDeviceInfo([]);
  }, [markers]);

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
      {markers &&
        markers?.map((waypoint, index) => {
          let { id, lat, lng, info, deviceType } = waypoint;
          let title = info[0]?.split(' ')?.pop();
          return (
            <Marker
              key={index}
              title={title}
              position={{ lat, lng }}
              options={
                deviceType === 'carTopView'
                  ? carTopView
                  : deviceType === 'youAreHere' && youAreHere
              }
              onClick={() => handleMarkerClick(waypoint)}
            >
              {selectedDevice === id && (
                <Box className={styles.infoBox}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      boxShadow: '0px 20px 50px 0px #DCE0F980',
                      borderRadius: '12px',
                      minWidth: { xs: '100%', sm: '300px' },
                      maxWidth: '300px'
                    }}
                    className='customKhubstyle'
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #ccc'
                      }}
                    >
                      <Box>
                        <Typography paragraph className={styles.deliveryStatus}>
                          shipment number
                        </Typography>
                        <Typography
                          paragraph
                          className={styles.orderId}
                          sx={{
                            color: '#333'
                          }}
                        >
                          EV - 012987644
                        </Typography>
                      </Box>
                      <Box
                        className={styles.CloseIconBorder}
                        onClick={() => setSelectedDevice(null)}
                      >
                        <CloseIcon className={styles.closeIcon} />
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 0 0 0'
                      }}
                    >
                      <Icon className={styles.driverAdd} icon='carbon:circle-filled' />
                      <Box>
                        {deviceInfo?.map(item => (
                          <Typography paragraph key={item} className={styles.location}>
                            {item}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                    <Icon className={styles.dot} icon='pepicons-pencil:dots-y' />
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 0 10px 0'
                      }}
                    >
                      <Icon
                        className={styles.customerAdd}
                        icon='fluent:location-12-filled'
                      />
                      <Box>
                        <Typography paragraph className={styles.location}>
                          67/1 KG Halli D' Souza Layout Ashok Nagar Bengaluru Karnataka
                          560002 India
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        borderTop: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        paddingTop: '5px'
                      }}
                    >
                      <Icon className={styles.driverIcon} icon='bi:person-fill' />
                      <Box>
                        <Typography paragraph className={styles.location}>
                          Driver
                        </Typography>
                        <Typography paragraph className={styles.driverNo}>
                          +1 999 222 111
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Marker>
          );
        })}
    </>
  );
};

export default CustomerGoogleDirections;
