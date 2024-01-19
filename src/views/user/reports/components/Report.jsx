import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  Typography,
  Grid,
  InputLabel,
  FormHelperText,
  MenuItem,
  Select,
  inputLabelClasses,
  DialogContentText
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import DataTables from '../../../components/customized/DataTables';
import Dialog from '@mui/material/Dialog';
import Calendar from '../../../components/customized/Calendar';
import CustomButton from '../../../components/buttons/CustomButton';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../../../app/redux/action/action';
import CustomIconButton from '../../../components/buttons/CustomIconButton';

const Report = ({
  title,
  rowDef,
  columnDef,
  onSubmit,
  isLoading,
  details,
  devices = null,
  isAttendance = false,
  setSelectedDevice = null,
  isCalendar = false,
  docPayload
}) => {
  const [getStartDate, setGetStartDate] = useState(null);
  const [isChangeFrom, setChangeFrom] = useState('');
  const [isChangeTo, setChangeTo] = useState('');
  const [open, isOpen] = useState(false);

  const filterFunction = () => {
    isOpen(true);
  };

  const dispatch = useDispatch();

  const currentDate = new Date();
  const newDate = new Date(currentDate.getTime() - 10 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    setValue('startDate', newDate);
    setValue('deviceID', 'selectAll');
    setValue('endDate', currentDate);
    reset();
  }, []);

  // state for form control
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm();

  useEffect(() => {
    let checkErrorKeys = Object.keys(errors);
    if (checkErrorKeys?.length === 0) {
      isOpen(false);
    }
  }, [errors]);
  useEffect(() => {
    if (open) {
      setValue('startDate', isChangeFrom); // Assuming newDate is the desired default value
      setValue('deviceID', 'selectAll');
      setValue('endDate', isChangeTo);
    }
  }, [rowDef]);

  return (
    <Box
      p={2}
      sx={{
        height: '100vh',
        overflowY: 'scroll',
        marginBottom: '100px',
        paddingTop: '8px !important'
      }}
    >
      <Dialog open={open} fullWidth>
        <Box
          mt={1}
          pl={2}
          pr={2}
          pt={1.6}
          pb={1.2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography component='p' className='primary' sx={{ fontWeight: '700' }}>
            {`Filter Dashboard`}
          </Typography>
          <CustomIconButton
            size='small'
            category='Close'
            onClick={() => {
              isOpen(false);
            }}
          />
        </Box>
        <DialogContentText pl={4} pr={2} pb={1.3}>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            my={1}
          >
            <FormControl margin='dense' error={Boolean(errors?.deviceID)} fullWidth>
              <InputLabel id='select-label' size='small'>
                <Typography component='h5'>
                  {isAttendance ? 'Select option' : 'Select vehicle'}
                </Typography>
              </InputLabel>
              <Controller
                control={control}
                name='deviceID'
                defaultValue={''}
                rules={{ required: 'Please select!' }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    id='select-device'
                    value={value ? value : ''}
                    label={isAttendance ? 'Select option' : 'Select vehicle'}
                    InputLabelProps={{
                      sx: {
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: '#00769e'
                        }
                      }
                    }}
                    onChange={e => {
                      onChange(e);
                      if (setSelectedDevice) {
                        setSelectedDevice(e.target.value);
                      }
                    }}
                    size='small'
                  >
                    <MenuItem primary='Select All' value='selectAll'>
                      Select All
                    </MenuItem>
                    {devices?.map((device, index) => (
                      <MenuItem key={index} value={device}>
                        {device?.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors?.deviceID?.message}</FormHelperText>
            </FormControl>

            {!isCalendar && (
              <FormControl margin='dense' fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    defaultValue={''}
                    render={({ field: { onChange, value } }) => (
                      <Calendar
                        label='From'
                        InputLabelProps={{
                          sx: {
                            [`&.${inputLabelClasses.shrink}`]: {
                              color: '#00769e'
                            }
                          }
                        }}
                        value={isChangeFrom ? value : ''}
                        disableFuture={true}
                        disablePast={false}
                        setGetStartDate={setGetStartDate}
                        onChange={date => {
                          setGetStartDate(date?.$d);
                          onChange(date?.$d);
                          setChangeFrom(date?.$d);
                        }}
                        getStartDate={getStartDate}
                        error={Boolean(errors?.startDate)}
                        helperText={errors?.startDate?.message}
                      />
                    )}
                    name='startDate'
                    control={control}
                    rules={{ required: 'Please choose a date!' }}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
            {!isCalendar && (
              <FormControl margin='dense' fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    defaultValue={''}
                    render={({ field: { onChange, value } }) => (
                      <Calendar
                        label='To'
                        InputLabelProps={{
                          sx: {
                            [`&.${inputLabelClasses.shrink}`]: {
                              color: '#00769e'
                            }
                          }
                        }}
                        value={isChangeTo ? value : ''}
                        disableFuture={true}
                        disablePast={false}
                        setGetStartDate={setGetStartDate}
                        onChange={date => {
                          if (getStartDate === null) {
                            dispatch(
                              updateToast({
                                show: true,
                                message: 'Please select "From Date"',
                                severity: 'error'
                              })
                            );
                            return;
                          } else {
                            onChange(date?.$d);
                            setChangeTo(date?.$d);
                          }
                        }}
                        minDateTime={
                          getStartDate !== null
                            ? dayjs(new Date(getStartDate).getTime() + 1000 * 600)
                            : null
                        }
                        maxDateTime={dayjs()
                          .set('hour', new Date().getHours())
                          .set('minutes', new Date().getMinutes())
                          .startOf('minute')}
                        getStartDate={getStartDate}
                        error={Boolean(errors?.endDate)}
                        helperText={errors?.endDate?.message}
                      />
                    )}
                    name='endDate'
                    control={control}
                    rules={{ required: 'Please choose a date!' }}
                  />
                </LocalizationProvider>
              </FormControl>
            )}
            <Box mt={0.9}>
              {!isCalendar && <CustomButton category='Get Report' type='submit' />}
            </Box>
          </Grid>
        </DialogContentText>
      </Dialog>

      <DataTables
        details={details}
        Title={title}
        filterFunction={filterFunction}
        rows={rowDef}
        columns={columnDef}
        loading={isLoading}
        pageSize={4}
        rowsPerPageOptions={[5]}
        isDownload={true}
        title='Reports'
        pdfName='Reports.pdf'
        xlsxName='Reports.xlsx'
        docPayload={docPayload}
      />
    </Box>
  );
};

export default Report;
