import React, { forwardRef } from 'react';
import { CalendarMonth } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import CustomButton from '../buttons/CustomButton';
import CustomTextField from './CustomTextField';

const Calendar2 = forwardRef(
  (
    {
      label,
      error,
      helperText,
      onChange,
      disableFuture = true,
      disablePast = false,
      ...props
    },
    ref
  ) => {
    // component to customized buttons
    const ActionBar = ({ onCancel, onAccept }) => (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} p={2}>
        <Box mr={2}>
          <CustomButton category='Cancel' color='error' size='small' onClick={onCancel} />
        </Box>
        <Box>
          <CustomButton category='Ok' color='success' size='small' onClick={onAccept} />
        </Box>
      </Box>
    );

    //   final date picker component
    return (
      <MobileDatePicker
        inputRef={ref}
        {...props}
        label={label}
        views={['year', 'month', 'day']}
        disableFuture={disableFuture}
        disablePast={disablePast}
        onChange={onChange}
        inputFormat='DD/MM/YYYY'
        renderInput={params => (
          <CustomTextField
            {...params}
            size='small'
            error={error}
            InputProps={{
              sx: {
                height: '38px',
                fontSize: '14px'
              },
              endAdornment: (
                <InputAdornment position='end'>
                  <CalendarMonth color='primary' />
                </InputAdornment>
              )
            }}
            helperText={helperText}
          />
        )}
        components={{ ActionBar: ActionBar }}
      />
    );
  }
);

export default Calendar2;
