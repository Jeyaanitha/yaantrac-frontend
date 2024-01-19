import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  FormHelperText,
  CardContent,
  Grid,
  inputLabelClasses
} from '@mui/material';
import { createUseStyles } from 'react-jss';
import GoogleMapComponent from '../../../components/maps/GoogleMapComponent';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getEpoch } from '../../../../utils/CommonFunctions';
import {
  DeviceListService,
  RoutePlaybackService,
  getHistoricalVehicleReportService
} from '../services/MapsServices';
import RoutePlayback from '../../../components/analytics/RoutePlayback';
import { useDispatch } from 'react-redux';
import { updateCenter, updateMarkers } from '../../../../app/redux/action/action';
import { PolylineF } from '@react-google-maps/api';
import GoogleMapMarker from '../../../components/maps/GoogleMapMarker';
import { updateToast } from '../../../../app/redux/action/action';
import CustomButton from '../../../components/buttons/CustomButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomIconButton from '../../../components/buttons/CustomIconButton';
import CustomSquareButton from '../../../components/buttons/CustomSquareButton';
import Calendar from '../../../components/customized/Calendar';
import dayjs from 'dayjs';
import CustomTextField from '../../../components/customized/CustomTextField';
import CustomSelect from '../../../components/customized/CustomSelect';

const useStyles = createUseStyles(theme => ({
  root: {
    position: 'relative'
  },
  map: {
    height: `calc(100vh - 65px)`,
    width: '100%'
  },
  button: {
    display: 'flex',
    justifyContent: 'center !important',
    alignItems: 'center !important',
    marginTop: '10px !important'
  },
  actions: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    margin: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiButtonBase-root': {
      padding: 1
    }
  },
  filter: {
    position: 'absolute',
    zIndex: 1000,
    left: 5,
    bottom: 5,
    width: '30%',
    minWidth: '200px',
    height: 'fit-content',
    marginTop: '100px'
  },
  filter2: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0,
    width: '40%',
    height: `calc(100vh - 150px)`,
    overflowY: 'scroll',
    margin: 5
  },
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00769E',
    color: '#FFF'
  }
}));

const HistoricVehicleTracking = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // component states
  const [center, setCenter] = useState({
    lat: 12.912667777777779,
    lng: 80.21793777777778
  });
  const [zoom, setZoom] = useState(10);
  const [selected, setSelected] = useState(null);
  const [devices, setDevices] = useState([]);
  const [getStartDate, setGetStartDate] = useState(null);
  const [getEndDate, setGetEndDate] = useState(null);
  const [getStartTime, setGetStartTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routePlayback, setRoutePlayback] = useState([]);
  const [FD, setFD] = useState(null);
  const [ED, setED] = useState(null);
  const [m, setm] = useState(null);
  const [isHistoric, setIsHistoric] = useState(false);

  const {
    control: controlPlayback,
    formState: { errors: errorsPlayback },
    handleSubmit: handleSubmitPlayback
  } = useForm();

  //search filter validation schema
  const searchFilterSchema = yup.object().shape({
    selectVehicle: yup.string().required('Vehicle Number is required'),
    hikeSpeed: yup.string().required('Hike speed is required'),
    fromDate: yup.string().required('From date is required'),
    toDate: yup.string().required('To date is required')
  });

  const {
    control: controlSearchFilter,
    handleSubmit: submitSearchFilter,
    formState: { errors: errorsSearchFilter },
    getValues,
    setValue,
    reset: resetSearchFilter,
    register
  } = useForm({ resolver: yupResolver(searchFilterSchema) });

  const getAllHistoricVehicleReport = async payload => {
    setIsHistoric(true);
    setIsLoading(true);
    let res = await getHistoricalVehicleReportService(payload);
    if (res?.status === 200) {
      const latLngInfo = res?.data?.data[0]?.latAndLngInfo;
      const latLngDevice = res?.data?.data[0]?.vehicleNo;
      const overSpeedLimit = res.data?.data[0]?.overspeedLimit;

      if (latLngInfo?.length > 0) {
        const latLngInfo2 = latLngInfo.map((item, index) => ({
          id: index + 1,
          info: [
            `Vehicle No.: ${latLngDevice?.toUpperCase()}`,
            `Speed: ${overSpeedLimit} `
          ],
          deviceType:
            overSpeedLimit > 0 && overSpeedLimit <= 40
              ? 'greenFlg'
              : overSpeedLimit > 40 && overSpeedLimit < 70
              ? 'orangeFlg'
              : overSpeedLimit >= 70 && 'redFlg',
          lat: item?.latitude,
          lng: item?.longitude
        }));

        if (latLngInfo2?.length > 0) {
          dispatch(updateCenter({ lat: latLngInfo2[0]?.lat, lng: latLngInfo2[0]?.lng }));
          dispatch(updateMarkers(latLngInfo2));
        }
        dispatch(
          updateToast({
            show: true,
            message: 'Data fetched successfully!',
            severity: 'success'
          })
        );
      } else {
        dispatch(updateCenter({ lat: 13.08268, lng: 80.270721 }));
        dispatch(updateMarkers([]));
        setRoutePlayback([]);
        dispatch(
          updateToast({
            show: true,
            message: 'No Data Found!',
            severity: 'error'
          })
        );
      }
    } else {
      dispatch(
        updateToast({
          show: true,
          message: 'Network error!',
          severity: 'error'
        })
      );
    }
    setIsLoading(false);
  };

  const onSubmit = async params => {
    let searchFilterPayload = {
      deviceid: params?.selectVehicle,
      speed: parseFloat(params?.hikeSpeed).toFixed(1),
      starttime: getEpoch(params?.fromDate),
      endtime: getEpoch(params?.toDate)
    };
    let playbackPayload = {
      deviceID: params?.selectVehicle,
      startDate: params?.fromDate,
      endDate: params?.toDate
    };

    submitPlayback(playbackPayload);
    getAllHistoricVehicleReport(searchFilterPayload);
  };

  // funtion to change the user action
  const changeUserAction = action => setSelected(action);

  // function to get device list
  const getDeviceList = async () => {
    let { data, status } = await DeviceListService();
    if (status === 200) {
      setDevices(data);
    }
  };

  const submitPlayback = async params => {
    setIsLoading(true);
    let { deviceID, startDate, endDate } = params;
    let payload = {
      deviceID,
      startDate: getEpoch(startDate),
      endDate: getEpoch(endDate)
    };
    let res = await RoutePlaybackService(payload);
    if (res?.status) {
      let {
        data: { data },
        status,
        message
      } = res;
      if (status === 200) {
        dispatch(
          updateToast({
            show: true,
            message: 'Data fetched successfully!',
            severity: 'success'
          })
        );
        if (data?.length > 0) {
          let trackingData = data?.map(
            ({ latitude, longitude, speedKPH, timestamp }) => ({
              lat: latitude,
              lng: longitude,
              speed: speedKPH,
              timestamp
            })
          );
          setRoutePlayback(trackingData);
        }
      } else {
        dispatch(
          updateToast({
            show: true,
            message,
            severity: 'error'
          })
        );
      }
    } else {
      dispatch(
        updateToast({
          show: true,
          message: 'Network error!',
          severity: 'error'
        })
      );
    }
    setSelected('route playback');
    setIsLoading(false);
  };

  // User Actions component
  const UserActions = () => (
    <Box className={styles.actions}>
      <CustomSquareButton
        category='Find Speed'
        selected={selected}
        onClick={() => changeUserAction('filter')}
      />

      {/* The below button was commented because of the API throws 400 error */}

      <CustomSquareButton
        category='Route Playback'
        selected={selected}
        onClick={() => {
          changeUserAction('playback');
          setRoutePlayback([]);
          dispatch(updateMarkers([]));
        }}
      />
    </Box>
  );

  // Filter component
  const filter = () => {
    const startTime = dayjs()
      .set('hour', getStartTime)
      .startOf('hour')
      .set('minute', m + 1)
      .startOf('minute');
    return (
      <Card className={styles.filter}>
        <Box className={styles.filterHeader} px={2}>
          <Typography component='h6' variant='p'>
            {`Search Details`}
          </Typography>

          <CustomIconButton
            category='White Close'
            onClick={() => {
              dispatch(updateMarkers([]));
              setRoutePlayback([]);
              changeUserAction(null);
              resetSearchFilter();
              setIsLoading(false);
            }}
          />
        </Box>

        <CardContent>
          <Box component='form' onSubmit={submitSearchFilter(onSubmit)}>
            <Box>
              <Box>
                <CustomSelect
                  margin='dense'
                  label='Select Vehicle'
                  defaultValue={getValues('selectVehicle') ?? ''}
                  error={Boolean(errorsSearchFilter?.selectVehicle)}
                  items={devices}
                  onChange={e => {
                    setValue('selectVehicle', e.target.value);
                  }}
                  helperText={errorsSearchFilter?.selectVehicle?.message}
                  {...register('selectVehicle')}
                />
              </Box>
              <Box>
                <FormControl margin='dense' fullWidth>
                  <Controller
                    control={controlSearchFilter}
                    name='hikeSpeed'
                    inputProps={{ inputmode: 'numeric', pattern: '[0-9]*' }}
                    rules={{ required: 'Hikespeed is required!' }}
                    render={({ field: { onChange, value } }) => (
                      <CustomTextField
                        label='Hike Speed'
                        type='text'
                        inputProps={{ min: 0, max: 200 }}
                        value={value ? value : 0}
                        onChange={e => {
                          var value = parseInt(e.target.value, 0);
                          if (value > 200) value = 200;
                          if (value < 0) value = 0;
                          onChange(value);
                        }}
                        error={Boolean(errorsSearchFilter?.hikeSpeed)}
                        helperText={errorsSearchFilter?.hikeSpeed?.message}
                      />
                    )}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl margin='dense' fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Calendar
                          label='From'
                          value={value ?? null}
                          disableFuture
                          onChange={date => {
                            if (date) {
                              setGetStartDate(date.$d);
                              setGetStartTime(date.$H);
                              onChange(date.$d);
                              setFD(date.$D);
                              setm(date.$m);

                              if (getEndDate) {
                                setGetEndDate(null);
                                resetSearchFilter(formValues => ({
                                  ...formValues,
                                  toDate: null
                                }));
                              }
                            }
                          }}
                          onAccept={e => {
                            let selectedDate =
                              new Date() > new Date(e?.$d)
                                ? new Date().setMinutes(new Date().getMinutes() + 10)
                                : e?.$d;

                            setGetStartDate(prev => ({ ...prev, selectedDate }));
                          }}
                          renderInput={params => <CustomTextField {...params} />}
                          error={Boolean(errorsSearchFilter?.fromDate)}
                          helperText={errorsSearchFilter?.fromDate?.message}
                        />
                      )}
                      name='fromDate'
                      defaultValue={null}
                      control={controlSearchFilter}
                      rules={{ required: 'Please choose a date!' }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Box>
              <Box>
                <FormControl margin='dense' fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <Calendar
                          label='To'
                          value={value ?? null}
                          disableFuture
                          onChange={date => {
                            if (date) {
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
                                onChange(date.$d);
                                setGetEndDate(date.$d);
                                setED(date.$D);
                              }
                            }
                          }}
                          minDate={getStartDate}
                          minTime={FD === ED ? startTime : null}
                          renderInput={params => <CustomTextField {...params} />}
                          error={Boolean(errorsSearchFilter?.toDate)}
                          helperText={errorsSearchFilter?.toDate?.message}
                        />
                      )}
                      name='toDate'
                      defaultValue={null}
                      control={controlSearchFilter}
                      rules={{ required: 'Please choose a date!' }}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Box>
              <Grid item md={12} sm={12} className={styles.button}>
                <CustomButton type='submit' category='Search' loading={isLoading} />
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Route Playback component
  const playback = () => (
    <Card className={styles.filter}>
      <Box className={styles.filterHeader} px={2}>
        <Typography component='h5' variant='p'>
          {`Route Playback`}
        </Typography>
        <CustomIconButton
          category='White Close'
          onClick={() => {
            changeUserAction(null);
            setIsLoading(false);
          }}
        />
      </Box>
      <CardContent>
        <Box component='form' onSubmit={handleSubmitPlayback(submitPlayback)}>
          <Box>
            <Box>
              <FormControl
                margin='dense'
                error={Boolean(errorsPlayback?.deviceID)}
                size='small'
                fullWidth
              >
                <InputLabel
                  id='select-label'
                  InputLabelProps={{
                    sx: {
                      [`&.${inputLabelClasses.shrink}`]: {
                        color: '#00769e'
                      }
                    }
                  }}
                >
                  <Typography component='h5'>Select Device</Typography>
                </InputLabel>
                <Controller
                  control={controlPlayback}
                  name='deviceID'
                  defaultValue=''
                  rules={{ required: 'Please select!' }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      id='select-device'
                      size='small'
                      value={value ? value : ''}
                      label='Select Device'
                      onChange={onChange}
                      InputLabelProps={{
                        sx: {
                          [`&.${inputLabelClasses.shrink}`]: {
                            color: '#00769e'
                          }
                        }
                      }}
                    >
                      {devices?.map((device, index) => (
                        <MenuItem key={index} value={device}>
                          {device?.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errorsPlayback?.deviceID?.message}</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl margin='dense' fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Calendar
                        label='From'
                        value={value ? value : ''}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        inputFormat='DD/MM/YYYY hh:mm A'
                        disableFuture
                        onChange={date => {
                          setGetStartDate(date.$d);
                          onChange(date.$d);
                        }}
                        renderInput={params => <CustomTextField {...params} />}
                        error={Boolean(errorsPlayback?.startDate)}
                        helperText={errorsPlayback?.startDate?.message}
                      />
                    )}
                    name='startDate'
                    defaultValue={null}
                    control={controlPlayback}
                    rules={{ required: 'Please choose a date!' }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
            <Box>
              <FormControl margin='dense' fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    render={({ field: { onChange, value } }) => (
                      <Calendar
                        label='To'
                        disableFuture
                        value={value ? value : ''}
                        views={['year', 'month', 'day', 'hours', 'minutes']}
                        inputFormat='DD/MM/YYYY hh:mm A'
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
                            onChange(date.$d);
                          }
                        }}
                        minDate={getStartDate}
                        renderInput={params => <CustomTextField {...params} />}
                        error={Boolean(errorsPlayback?.endDate)}
                        helperText={errorsPlayback?.endDate?.message}
                      />
                    )}
                    name='endDate'
                    defaultValue={null}
                    control={controlPlayback}
                    rules={{ required: 'Please choose a date!' }}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
            <Grid item md={12} sm={12} className={styles.button}>
              <CustomButton
                size='small'
                type='submit'
                loading={isLoading}
                category='Submit'
              />
            </Grid>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  useEffect(() => {
    dispatch(updateMarkers([]));
    getDeviceList();
    return () => dispatch(updateMarkers([]));
  }, []);

  return (
    <Box className={styles.root}>
      <Box className={styles.map}>
        <GoogleMapComponent center={center} zoom={zoom}>
          <PolylineF
            path={routePlayback}
            strokeColor='#FF0000'
            strokeOpacity={1.0}
            strokeWeight={2}
          />
          {selected === 'route playback' && (
            <RoutePlayback
              routePlayback={routePlayback}
              center={center}
              setCenter={setCenter}
              setZoom={setZoom}
            />
          )}
          <GoogleMapMarker isHistoric={isHistoric} />;
        </GoogleMapComponent>
      </Box>
      <UserActions />
      {selected === 'filter' ? filter() : selected === 'playback' ? playback() : null}
    </Box>
  );
};

export default HistoricVehicleTracking;
