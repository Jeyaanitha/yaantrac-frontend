import { Box } from '@mui/material';
import { createUseStyles } from 'react-jss';
import GoogleMapComponent from '../../../components/maps/GoogleMapComponent';
import { useDispatch } from 'react-redux';
import CustomerGoogleDirections from '../../components/CustomerGoogleDirections';
import { updateMarkers } from '../../../../app/redux/action/action';

const useStyles = createUseStyles({
  root: {
    position: 'relative'
  },
  map: {
    height: `calc(110vh - 65px)`,
    width: '100%'
  }
});

const OrderTracking = () => {
  // component styles
  const styles = useStyles();

  const dispatch = useDispatch();

  const locations = [
    {
      lat: 12.9165,
      lng: 79.1325
    },
    {
      lat: 12.9716,
      lng: 77.5946
    }
  ];

  const data = [];
  for (let i = 0; i < locations?.length; i++) {
    if (i === 0) {
      data.push({
        id: i + 1,
        lat: locations[i].lat,
        lng: locations[i].lng,
        info: [],
        deviceType: 'carTopView'
      });
    }
    if (i === 1) {
      data.push({
        id: i + 1,
        lat: locations[i].lat,
        lng: locations[i].lng,
        info: [],
        deviceType: 'youAreHere'
      });
    }
  }
  dispatch(updateMarkers(data));
  var waypts = [];
  var checkboxArray = data;
  for (let i = 1; i < locations?.length - 1; i++) {
    waypts.push({
      location: checkboxArray[i],
      stopover: false
    });
  }
  return (
    <Box className={styles.root}>
      <Box className={styles.map}>
        <GoogleMapComponent>
          <CustomerGoogleDirections
            origin={locations[0]}
            destination={locations[locations.length - 1]}
            waypoints={waypts}
          />
        </GoogleMapComponent>
      </Box>
    </Box>
  );
};

export default OrderTracking;
