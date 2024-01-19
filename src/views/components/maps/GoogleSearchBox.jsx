import React, { forwardRef, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { updateCenter } from '../../../app/redux/action/action';
import CustomTextField from '../customized/CustomTextField';
import { Tooltip } from '@mui/material';

const GoogleSearchBox = forwardRef(
  ({ setAddress, address, setAutoCompleteLatLng, focus, ...rest }) => {
    const addressRef = useRef(null);
    const dispatch = useDispatch();

    const onPlaceChanged = () => {
      if (addressRef.current !== null) {
        const {
          geometry: { location },
          name
        } = addressRef.current.getPlace();
        setAddress(name);
        let lat = location?.lat();
        let lng = location?.lng();
        setAutoCompleteLatLng({ lat, lng });
        dispatch(updateCenter({ lat, lng }));
      }
    };

    return (
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={ref => {
          addressRef.current = ref;
        }}
      >
        <Tooltip
          title='Type some text then "select" a location from the below list of the locations'
          followCursor
        >
          <CustomTextField
            autoFocus={focus}
            type='text'
            defaultValue={address}
            placeholder=''
            label='Search your Location'
            style={{
              width: `367px`,
              borderRadius: `10px`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: 'relative'
            }}
            {...rest}
          />
        </Tooltip>
      </Autocomplete>
    );
  }
);

export default GoogleSearchBox;
