import React, { forwardRef } from 'react';
import { TextField, inputLabelClasses } from '@mui/material';

const CustomTextField = forwardRef(
  ({ id, label, color = 'primary', error = false, helperText = null,shrink, ...props }, ref) => (
    <TextField
      inputRef={ref}
      id={id}
      label={label}
      size='small'
      color={color}
      InputLabelProps={{
        sx: {
          [`&.${inputLabelClasses.shrink}`]: {
            color: '#00769e'
          },
          [`&.${inputLabelClasses.root}`]: {
            fontSize: '14px'
          }
        },
        shrink: shrink && true
      }}
      InputProps={{
        sx: {
          width: '100%',
          paddingRight: '0px',
          height: '38px',
          fontSize: '14px'
        }
      }}
      fullWidth
      {...props}
      error={error}
      helperText={helperText}
    />
  )
);

export default CustomTextField;
