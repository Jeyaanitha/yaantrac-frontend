import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../components/maps/GoogleMapMarker';
import { useDispatch } from 'react-redux';
import { updateMarkers, updateToast } from '../../../app/redux/action/action';
import { EagleViewService } from './services/EagleViewServices';

const interval = parseInt(process.env.REACT_APP_API_INTERVAL);

const EagleView = () => {
  // function to dispatch
  const dispatch = useDispatch();

  let renderCount = 0;

  // function to get eagle view data
  const getEagleViewData = async () => {
    let res = await EagleViewService();
    if (res?.status === 200) {
      let eagleView = res?.data?.data;
      if (eagleView?.length > 0) {
        let eagleViewData = eagleView?.map((item, index) => ({
          id: item?.deviceId,
          lat: item?.lastValidLatitude,
          lng: item?.lastValidLongitude,
          info: [`Vehicle No. : ${item?.deviceId.toUpperCase()}`],
          deviceType: item?.deviceType
        }));
        dispatch(updateMarkers(eagleViewData));
      }
    } else {
      if (renderCount === 0)
        dispatch(
          updateToast({ show: true, message: 'Network error!', severity: 'error' })
        );
    }
    renderCount++;
  };

  useEffect(() => {
    getEagleViewData();

    const timer = setInterval(() => {
      getEagleViewData();
    }, interval);

    return () => {
      clearInterval(timer);
      dispatch(updateMarkers([]));
    };
  }, []);

  return (
    <Box sx={{ height: `calc(100vh - 64px)`, width: '100%' }}>
      <GoogleMapComponent>
        <GoogleMapMarker />
      </GoogleMapComponent>
    </Box>
  );
};

export default EagleView;
