import React, { forwardRef } from 'react';
import { CalendarMonth } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import CustomButton from '../buttons/CustomButton';
import CustomTextField from './CustomTextField';

const Calendar = forwardRef(
  (
    {
      label,
      value,
      error,
      helperText,
      onChange,
      disableFuture = true,
      disablePast = false,
      inputFormat = 'DD/MM/YYYY hh:mm A',
      views = ['year', 'month', 'day', 'hours', 'minutes'],
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
      <MobileDateTimePicker
        inputRef={ref}
        {...props}
        label={label}
        value={value}
        views={views}
        closeOnSelect
        disableFuture={disableFuture}
        disablePast={disablePast}
        onChange={onChange}
        inputFormat={inputFormat}
        renderInput={params => (
          <CustomTextField
            {...params}
            size='small'
            error={error}
            helperText={helperText}
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
          />
        )}
        components={{ ActionBar: ActionBar }}
      />
    );
  }
);

export default Calendar;
