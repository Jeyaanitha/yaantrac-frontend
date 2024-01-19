import React, { useEffect, useState } from 'react';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../../app/redux/action/action';

const GoogleDirections = ({ origin, destination }) => {
  // function to dispatch state
  const dispatch = useDispatch();

  // component state
  const [directions, setDirections] = useState(null);

  // function to get routes
  const findRoute = async () => {
    try {
      const directionsService = new window.google.maps.DirectionsService();
      const routes = await directionsService.route({
        origin,
        destination,
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
    findRoute();
  }, []);

  return directions && <DirectionsRenderer directions={directions} />;
};

export default GoogleDirections;
