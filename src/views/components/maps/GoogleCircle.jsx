import React, { useEffect, useRef, useState } from 'react';
import { Circle } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { updateCenter, updateCircularGeofence } from '../../../app/redux/action/action';

const GoogleCircle = ({ mode }) => {
  const {
    circularGeofence: { center, color, radius }
  } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  const ref = useRef(null);

  const initialOptions = {
    strokeColor: '#000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    draggable: true,
    editable: false,
    radius
  };

  const [options, setOptions] = useState(initialOptions);
  const [getCenter, setGetCenter] = useState(center);

  useEffect(() => {
    setOptions(prev => ({ ...prev, fillColor: color }));
  }, [color]);

  useEffect(() => {
    setOptions(prev => ({ ...prev, radius: radius }));
  }, [radius]);

  useEffect(() => {
    dispatch(updateCenter(center));
    setGetCenter(center);
  }, [center]);

  useEffect(() => {
    if (mode === 'view')
      setOptions(prev => ({ ...prev, editable: false, draggable: false }));
  }, [mode]);

  return (
    <Circle
      ref={ref}
      onLoad={circleRef => {
        ref.current = circleRef;
      }}
      options={options}
      center={getCenter}
      onDragEnd={() => {
        let newCenter = {
          lat: ref.current.center.lat(),
          lng: ref.current.center.lng()
        };
        dispatch(updateCircularGeofence({ center: newCenter, color, radius }));
      }}
    />
  );
};

export default GoogleCircle;
