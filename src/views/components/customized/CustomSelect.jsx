import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FormControl, MenuItem } from '@mui/material';
import CustomTextField from './CustomTextField';

const CustomSelect = forwardRef(
  ({ id, label, items = [], defaultValue = '', ...rest }, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
      value: () => {
        return inputRef.current.value;
      }
    }));

    const notFound = label => {
      if (
        label === 'From Vehicle' ||
        label === 'To Vehicle' ||
        label === 'Select Vehicle' ||
        label === 'Select Moving Vehicle' ||
        label === 'Select option'
      )
        return 'No Vehicle found';
      else if (label === 'Select MyOffice') return 'No Office found';
      else if (label === 'Geofence ID') return 'No Geofence ID found';
      else return 'Not found';
    };

    return (
      <FormControl ref={ref} fullWidth>
        <CustomTextField
          select
          id={id}
          label={label}
          inputRef={inputRef}
          defaultValue={defaultValue}
          {...rest}
        >
          {items?.length > 0 ? (
            items?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item?.toUpperCase()}
              </MenuItem>
            ))
          ) : (
            <MenuItem>{notFound(label)}</MenuItem>
          )}
        </CustomTextField>
      </FormControl>
    );
  }
);

export default CustomSelect;
