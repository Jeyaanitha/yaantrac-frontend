import React, { useCallback, useRef } from 'react';
import { DistanceMatrixService } from '@react-google-maps/api';

const GoogleDistance = ({
  locationToMeasure,
  setRouteMeasure,
  setIsShowRouteMeasure
}) => {
  let count = useRef(0);

  const routeMeasure = useCallback((response, status) => {
    if (response !== null && count.current === 0) {
      if (status === 'OK') {
        count.current++;
        setRouteMeasure({
          origin: response?.originAddresses[0],
          destination: response?.destinationAddresses[0],
          distance: response?.rows[0]?.elements[0]?.distance?.value,
          duration: response?.rows[0]?.elements[0]?.duration?.value
        });
        setIsShowRouteMeasure(false);
      }
    }
  }, []);

  return (
    <DistanceMatrixService
      options={{
        destinations: [locationToMeasure?.destination],
        origins: [locationToMeasure?.source],
        travelMode: 'DRIVING'
      }}
      callback={(response, status) => routeMeasure(response, status)}
    />
  );
};

export default GoogleDistance;
