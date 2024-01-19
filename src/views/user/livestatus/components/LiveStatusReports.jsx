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
  inputLabelClasses
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller, useForm } from 'react-hook-form';
import DataTables from '../../../components/customized/DataTables';
import { convert2, getMinDate, getEpochValue } from '../../../../utils/CommonFunctions';
import { updateToast } from '../../../../app/redux/action/action';
import Calendar from '../../../components/customized/Calendar';
import Button from '../../../components/buttons/CustomButton';
import { getReport } from '../../report-utils/services/ReportFunctions';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

const LiveStatusReports = ({ title, details, isCalendar = false, selectedDevice }) => {
  // component state
  const [getStartDate, setGetStartDate] = useState(null);
  const [isChangeFrom, setChangeFrom] = useState(false);
  const [isChangeTo, setChangeTo] = useState(false);
  const [report, setReport] = useState('Idle Report');
  const [rowDef, setRowDef] = useState([]);
  const [columnDef, setColumnDef] = useState([]);
  const [isReportLoading, setIsReportLoading] = useState(true);
  const startDate = getMinDate(new Date());
  const endDate = new Date();

  // function to dispatch state
  const dispatch = useDispatch();

  // state for form control
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm();

  const reports = [
    // 'KM Report',
    // 'Stoppage Report',
    // 'Engine Report',
    'Idle Report',
    'Movement Report',
    'Parking Report',
    'Overall Report',
    'Overspeed Report'
  ];

  // function to get the selected report
  const onSubmit = async ({ report, startDate, endDate }) => {
    setIsReportLoading(true);
    let reportFunc = await getReport(report);
    let { snack, rows, columns } = await reportFunc({
      deviceID: selectedDevice,
      startDate: getEpochValue(startDate),
      endDate: getEpochValue(endDate)
    });
    setRowDef(rows);
    setColumnDef(columns);
    dispatch(updateToast(snack));
    reset(formValues => ({
      ...formValues,
      startDate: '',
      endDate: ''
    }));
    setIsReportLoading(false);
    if (rows.length === 0) setRowDef([]);
  };

  useEffect(() => {
    onSubmit({ report, startDate, endDate });
    setValue('startDate', startDate);
    setValue('deviceID', 'selectAll');
    setValue('endDate', endDate);
  }, []);

  useEffect(() => {
    setValue('deviceID', '');
    setValue('endDate', '');
    setValue('startDate', '');
    reset();
  }, [rowDef]);

  return (
    <Box p={1}>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: {
            lg: 'flex-start !important',
            md: 'flex-start !important',
            sm: 'center !important',
            xs: 'center !important'
          },
          alignItems: 'center'
        }}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        my={1}
      >
        <Grid
          item
          md={2.5}
          sm={4}
          xs={12}
          sx={{
            paddingTop: '0 !important'
          }}
        >
          <FormControl margin='dense' error={Boolean(errors?.report)} fullWidth>
            <InputLabel id='select-report' size='small'>
              <Typography component='h5'>{'Select report'}</Typography>
            </InputLabel>
            <Controller
              control={control}
              name='report'
              defaultValue={report}
              rules={{ required: 'Please select report' }}
              render={({ field: { onChange, value } }) => (
                <Select
                  id='select-device'
                  value={value ? value : ''}
                  label='Select Report'
                  InputLabelProps={{
                    sx: {
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: '#00769e'
                      }
                    }
                  }}
                  onChange={e => {
                    onChange(e);
                    setReport(value);
                  }}
                  size='small'
                >
                  {reports?.map((report, index) => (
                    <MenuItem key={index} value={report}>
                      {report}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors?.report?.message}</FormHelperText>
          </FormControl>
        </Grid>

        {!isCalendar && (
          <Grid item md={2.5} sm={3.9} xs={12} sx={{ paddingTop: '0 !important' }}>
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
                        setChangeFrom(true);
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
          </Grid>
        )}

        {!isCalendar && (
          <Grid item md={2.5} sm={3.9} xs={12} sx={{ paddingTop: '0 !important' }}>
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
                        setChangeTo(true);
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
          </Grid>
        )}
        {!isCalendar && (
          <Grid
            item
            lg={1.7}
            md={2.4}
            sm={4.2}
            xs={12}
            sx={{ paddingTop: '0 !important', paddingLeft: '8px !important' }}
          >
            <Button category='Get Report' type='submit' />
          </Grid>
        )}
      </Grid>

      {details && (
        <Typography
          component='h5'
          sx={{ fontSize: '14px', color: '#00769E !important', textAlign: 'center' }}
          py={2}
        >
          {`${title} from ${convert2(details?.startDate)} to ${convert2(
            details?.endDate
          )}`}
        </Typography>
      )}

      <DataTables
        rows={rowDef}
        columns={columnDef}
        loading={isReportLoading}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default LiveStatusReports;
