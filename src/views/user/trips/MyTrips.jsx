import React, { useEffect, useState } from 'react';
import {
  AddTripService,
  DeactivateTripService,
  GetTripDeviceListService,
  MyTripsService,
  ShareTripService,
  UpdateTripService
} from './services/MyTripsServices';
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography
} from '@mui/material';
import DataTables from '../../components/customized/DataTables';
import { Close } from '@mui/icons-material';
import { createUseStyles } from 'react-jss';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import { useDispatch } from 'react-redux';
import { updateCenter, updateMarkers } from '../../../app/redux/action/action';
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Calendar from '../../components/customized/Calendar';
import CustomButton from '../../components/buttons/CustomButton';
import { convertToLocalDateAndTime, getEpoch } from '../../../utils/CommonFunctions';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Geocode from 'react-geocode';
import GoogleDirections from '../../components/maps/GoogleDirections';
import { updateToast } from '../../../app/redux/action/action';
import Tables from '../../components/customized/Tables';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import dayjs from 'dayjs';
import GoogleDistance from '../../components/maps/GoogleDistance';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CustomTextField from '../../components/customized/CustomTextField';
import CustomSelect from '../../components/customized/CustomSelect';
import GoogleMapMarker from '../../components/maps/GoogleMapMarker';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const interval = parseInt(process.env.REACT_APP_API_INTERVAL);

const useStyles = createUseStyles({
  fab: {
    margin: '2px !important',
    backgroundColor: '#00769E !important',
    color: '#FFF !important',
    '&:hover': {
      backgroundColor: '#00769E !important',
      color: '#FFF !important'
    }
  },
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  },
  dialogTitle: {
    display: 'flex !important',
    flexDirection: 'row !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important'
  },
  dialogContent: {
    height: '100vh !important',
    width: '100% !important',
    position: 'relative !important'
  },
  icons: {
    '& .css-1laqsz7-MuiInputAdornment-root': {
      position: 'absolute !important',
      right: '0 !important'
    },
    '& .css-660b2p-MuiInputBase-root-MuiOutlinedInput-root': {
      paddingRight: '20px'
    }
  },
  iconsBtn: {
    color: '#00769e',
    backgroundColor: '#fff'
  },
  iconsBtnHover: {
    backgroundColor: '#fff',
    '& .css-78trlr-MuiButtonBase-root-MuiIconButton-root.Mui-disabled': {
      backgroundColor: '#fff'
    },
    '& :hover': {
      backgroundColor: '#d2e6ed'
    }
  }
});

const MyTrips = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // schema for add or update form validation
  const schema = yup.object().shape({
    deviceID: yup.string().required('Select a vehicle'),
    startTimestamp: yup.string().required('Choose a start date'),
    endTimestamp: yup.string().required('Choose a end date'),
    source: yup.object().required('Plot a source location'),
    destination: yup.object().required('Plot a destination locaiton')
  });

  // schema for share trip form validation
  const shareTripSchema = yup.object().shape({
    message: yup
      .string()
      .required('Enter message')
      .min(10, 'Message should have minimum length of 10 characters')
      .max(100, 'Message should have maximum length of 100 characters'),
    mobile: yup
      .string()
      .required('Enter mobile number')
      .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
      .min(10, 'Enter valid mobile number')
      .max(10, 'Enter valid mobile number')
  });

  // get methods to add or update form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset
  } = useForm({ resolver: yupResolver(schema) });

  // get methods to share trip form validation
  const {
    register: shareTripRegister,
    handleSubmit: handleShareTripSubmit,
    formState: { errors: shareTripErrors },
    reset: resetShareTrip
  } = useForm({ resolver: yupResolver(shareTripSchema) });

  // component states
  const [isRendered, setIsRendered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTripLoading, setIsTripLoading] = useState(false);
  const [isGetTrips, setIsGetTrips] = useState(true);
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShareTrip, setIsShareTrip] = useState(false);
  const [mode, setMode] = useState('add');
  const [devices, setDevices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [tripPathLatAndLngDetails, setTripPathLatAndLngDetails] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [viewTrip, setViewTrip] = useState([]);
  const [isDeactivateTrip, setIsDeactivateTrip] = useState(false);
  const [isShowRouteMeasure, setIsShowRouteMeasure] = useState(false);
  const [minDateTime, setMinDateTime] = useState(null);
  const [maxDateTime, setMaxDateTime] = useState(null);
  const [edit, setEdit] = useState('');

  const [routeMeasure, setRouteMeasure] = useState({
    origin: null,
    destination: null,
    distance: null,
    duration: null
  });

  const [tripData, setTripData] = useState({
    fromDate: '',
    toDate: '',
    source: '',
    destination: ''
  });

  // function to find the address
  const findAddress = async (lat, lng) => {
    const { results } = await Geocode.fromLatLng(lat, lng);
    return results[0]?.formatted_address;
  };

  // function to update source
  const handleUpdateSource = async () => {
    if (locations?.length === 2) setLocations([locations[1]]);
    else if (locations?.length === 1) setLocations([locations[0]]);
    else setLocations([]);
    setTripData(prev => ({ ...prev, source: '' }));
    setValue('source', null);
    setEdit('source');
  };

  // function to update source
  const handleUpdateDestination = async () => {
    setLocations([locations[0]]);
    setTripData(prev => ({ ...prev, destination: '' }));
    setValue('destination', null);
    setEdit('destination');
  };

  // function to update trip
  const handleUpdateTrip = async row => {
    setIsGetTrips(false);
    setSelectedTrip(row);
    setMode(row?.tripID);
    setValue('deviceID', row?.vehicle);
    setValue('source', { lat: row?.startLatitude, lng: row?.startLongitude });
    setValue('destination', { lat: row?.endLatitude, lng: row?.endLongitude });
    setValue('startTimestamp', row?.startTime);
    setValue('endTimestamp', row?.endTime);
    let source = await findAddress(row?.startLatitude, row?.startLongitude);
    let destination = await findAddress(row?.endLatitude, row?.endLatitude);
    setTripData(prev => ({
      ...prev,
      fromDate: new Date(row?.startTime * 1000),
      toDate: new Date(row?.endTime * 1000),
      source,
      destination
    }));
    setLocations([
      { lat: row?.startLatitude, lng: row?.startLongitude },
      { lat: row?.endLatitude, lng: row?.endLongitude }
    ]);
    setMinDateTime(dayjs(new Date(row?.startTime * 1000).getTime()));
    setMaxDateTime(dayjs(new Date(row?.endTime * 1000).getTime()));
    setIsShowRouteMeasure(true);
    setIsOpen(true);
  };

  // function to view trip
  const handleViewTrip = async row => {
    setIsGetTrips(false);
    setSelectedTrip(row);
    let { startLatitude, startLongitude, endLatitude, endLongitude, startTime, endTime } =
      row;
    setMode('view');
    let source = await findAddress(startLatitude, startLongitude);
    let destination = await findAddress(endLatitude, endLongitude);
    let data = [
      { key: 'Source', value: source },
      { key: 'Destination', value: destination },
      { key: 'Start Date & Time', value: convertToLocalDateAndTime(startTime) },
      { key: 'End Date & Time', value: convertToLocalDateAndTime(endTime) }
    ];
    setLocations([
      { lat: startLatitude, lng: startLongitude },
      { lat: endLatitude, lng: endLongitude }
    ]);
    setViewTrip(data);
    setIsOpen(true);
  };

  // function to deactivate trip
  const handleDeactivateTrip = row => {
    setIsGetTrips(false);
    setSelectedTrip(row);
    setIsDeactivateTrip(true);
  };

  // action component
  const Actions = ({ row }) => (
    <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-evenly' }}>
      <CustomIconButton category='View' onClick={() => handleViewTrip(row)} />
      <CustomIconButton
        category='Edit'
        disabled={row?.isActive === 0}
        onClick={() => handleUpdateTrip(row)}
      />
      <CustomIconButton
        category={row?.isActive === 1 ? 'Deactivate' : 'Activate'}
        onClick={() => handleDeactivateTrip(row)}
      />
    </Box>
  );

  // column definition
  const columns = [
    {
      field: 'vehicle',
      headerName: 'Vehicle No',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'startTime',
      headerName: 'Start Date & Time',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => convertToLocalDateAndTime(value)
    },
    {
      field: 'endTime',
      headerName: 'End Date & Time',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => convertToLocalDateAndTime(value)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: Actions
    }
  ];

  // function to get trip details
  const getMyTrips = async () => {
    let res = await MyTripsService();
    if (res?.status && res?.status === 200) {
      if (res?.data?.data?.length > 0) {
        let rowDef = res?.data?.data?.map((row, index) => ({ ...row, id: index + 1 }));
        setRows(rowDef);
      }
    } else setRows([]);
    await getTripsDeviceList();
  };

  // function to get trip device list
  const getTripsDeviceList = async () => {
    let res = await GetTripDeviceListService();
    if (res?.status === 200) {
      if (res?.data?.data?.length > 0) setDevices(res?.data?.data);
    }
  };

  // function to submit add or update the trip
  const onSubmit = async params => {
    setIsTripLoading(true);
    let {
      destination,
      deviceID: vehicleNumber,
      endTimestamp,
      source,
      startTimestamp
    } = params;
    let { lat: endLat, lng: endLng } = destination;
    let { lat: startLat, lng: startLng } = source;
    endTimestamp = parseInt(endTimestamp);
    startTimestamp = parseInt(startTimestamp);
    let payload = {
      vehicleNumber,
      startTimestamp,
      endTimestamp,
      startLat,
      startLng,
      endLat,
      endLng,
      tripPathLatAndLngDetails
    };
    if (mode === 'add') {
      let res = await AddTripService(payload);
      if (res?.status && res?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: res?.data?.message,
            severity: 'success'
          })
        );
      } else {
        dispatch(
          updateToast({
            show: true,
            message: res?.response?.data?.error,
            severity: 'error'
          })
        );
      }
    } else {
      let res = await UpdateTripService({ ...payload, tripID: mode });
      if (res?.status === 200) {
        dispatch(
          updateToast({
            show: true,
            message: res?.data?.message,
            severity: 'success'
          })
        );
      } else {
        dispatch(
          updateToast({
            show: true,
            message: res?.response?.data?.error,
            severity: 'error'
          })
        );
      }
    }
    handleCloseTrip();
    await getMyTrips();
    setIsTripLoading(false);
  };

  // function to share trip
  const onSubmitShareTrip = async params => {
    setIsTripLoading(true);
    let { tripID, vehicle: deviceID } = selectedTrip;
    params = { ...params, tripID, deviceID };
    let {
      status,
      data: { message }
    } = await ShareTripService(params);
    if (status === 202) {
      dispatch(
        updateToast({
          show: true,
          message,
          severity: 'success'
        })
      );
    }
    setIsTripLoading(false);
    setIsShareTrip(false);
    setIsGetTrips(true);
  };

  // function to deactivate trip
  const onSubmitDeactivateTrip = async () => {
    setIsTripLoading(true);
    let res = await DeactivateTripService({
      vehicleNumber: selectedTrip?.vehicle,
      tripID: selectedTrip?.tripID,
      tripcode: selectedTrip?.code,
      startTimestamp: selectedTrip?.startTime,
      endTimestamp: selectedTrip?.endTime
    });
    if (res?.status === 200) {
      dispatch(
        updateToast({
          show: true,
          message: 'Trip deactivated successfully',
          severity: 'success'
        })
      );
      await getMyTrips();
    } else {
      dispatch(
        updateToast({
          show: true,
          message: res?.response?.data?.error,
          severity: 'error'
        })
      );
      await getMyTrips();
    }
    setIsDeactivateTrip(false);
    setIsTripLoading(false);
    handleCloseTrip();
  };

  // function to handle click on map
  const handleMapClick = async ({ latLng }) => {
    if (mode !== 'view') {
      if (edit === 'source') {
        let lat = latLng?.lat();
        let lng = latLng?.lng();
        let add = await findAddress(lat, lng);
        setLocations(
          routeMeasure?.destination ? [{ lat, lng }, locations[0]] : [{ lat, lng }]
        );
        setRouteMeasure(prev => ({ ...prev, origin: { lat, lng } }));
        setTripData(prev => ({
          ...prev,
          source: add
        }));
        setEdit('');
        setValue('source', { lat, lng });
        clearErrors('source');
        setTripData(prev => ({ ...prev, fromDate: '' }));
        setValue('startTimestamp', null);
        setValue('endTimestamp', null);
        setMinDateTime(null);
        setMaxDateTime(null);
        setRouteMeasure(prev => ({ ...prev, duration: null }));
      } else if (edit === 'destination') {
        let lat = latLng?.lat();
        let lng = latLng?.lng();
        let add = await findAddress(lat, lng);
        if (locations[0]?.lat === lat && locations[0]?.lng === lng) {
          dispatch(
            updateToast({
              show: true,
              message: 'Please choose another locations',
              severity: 'error'
            })
          );
        } else {
          setLocations([locations[0], { lat, lng }]);
          setRouteMeasure(prev => ({ ...prev, destination: { lat, lng } }));
          setTripData(prev => ({
            ...prev,
            destination: add
          }));
          setEdit('');
          setValue('destination', { lat, lng });
          clearErrors('destination');
          setTripData(prev => ({ ...prev, fromDate: '' }));
          setValue('startTimestamp', null);
          setValue('endTimestamp', null);
          setMinDateTime(null);
          setMaxDateTime(null);
          setRouteMeasure(prev => ({ ...prev, duration: null }));
        }
      }
    }
  };

  // function to reset add or update trip form validation
  const handleCloseTrip = () => {
    dispatch(updateCenter({ lat: 13.0827, lng: 80.2707 }));
    dispatch(updateMarkers([]));
    setIsOpen(false);
    setIsGetTrips(true);
    setMode('add');
    setRouteMeasure(prev => ({
      ...prev,
      duration: null,
      source: null,
      destination: null
    }));
    setValue('startTimestamp', '');
    setValue('endTimestamp', '');
    setValue('destination', '');
    setValue('source', '');
    setValue('deviceID', '');
    setSelectedTrip(null);
    setMinDateTime(null);
    setMaxDateTime(null);
    setLocations([]);
    setEdit('');
  };

  // function to reset deactivate trip
  const resetDeactivateTrip = () => {
    setIsGetTrips(true);
    setIsDeactivateTrip(false);
    setSelectedTrip(null);
  };

  useEffect(() => {
    if (!isRendered) {
      setIsLoading(true);
      getMyTrips();
      setIsRendered(true);
      setIsLoading(false);
    }

    // call function on every 10 seconds depend on user's mode
    const timer = setInterval(() => {
      if (isGetTrips) getMyTrips();
    }, interval);

    return () => clearInterval(timer);
  }, [isGetTrips]);

  useEffect(() => {
    if (locations?.length > 0) {
      dispatch(updateCenter(locations));
      if (locations?.length === 1) {
        const locationPin = {
          id: 1,
          lat: locations[0].lat,
          lng: locations[0].lng,
          info: tripData?.destination
            ? [`Destination : ${tripData?.destination}`]
            : [`Source : ${tripData?.source}`],
          deviceType: tripData?.destination ? 'BLetterPin' : 'ALetterPin'
        };
        dispatch(updateMarkers([locationPin]));
      } else dispatch(updateMarkers([]));
    } else dispatch(updateMarkers([]));

    if (locations?.length === 2) {
      if (window.google) {
        const directionsService = new window.google.maps.DirectionsService();
        const request = {
          origin: locations[0],
          destination: locations[1],
          travelMode: window.google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const path = result.routes[0].overview_path;
            const coordinates = path.map(point => ({
              lat: point.lat(),
              lng: point.lng()
            }));
            setTripPathLatAndLngDetails(coordinates);
          }
        });
        setIsShowRouteMeasure(true);
      }
    }
  }, [locations]);

  useEffect(() => {
    if (tripData?.fromDate === undefined) setValue('startTimestamp', '');
    if (tripData?.toDate === undefined) setValue('endTimestamp', '');
  }, [tripData]);

  return (
    <Box p={1} sx={{ position: 'relative' }}>
      <Box sx={{ right: 5, position: 'absolute', zIndex: 99 }}>
        {!isLoading && (
          <CustomIconButton
            category='Add'
            size='small'
            variant='circular'
            onClick={() => {
              reset();
              setIsOpen(true);
              setIsGetTrips(false);
              setLocations([]);
              setTripData({ fromDate: '', toDate: '', source: '', destination: '' });
              dispatch(updateCenter({ lat: 13.0827, lng: 80.2707 }));
            }}
          />
        )}
      </Box>

      {rows?.length === 0 && <Box mt={5} />}

      <DataTables
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />

      <Dialog open={isOpen} className={styles.dialog} fullScreen>
        <DialogTitle className={styles.dialogTitle}>
          <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#00769e' }}>
            {mode === 'add' ? 'Add new trip' : `Trip ID : ${selectedTrip?.tripID}`}
          </Typography>
          <Fab
            size='small'
            variant='circular'
            className={styles.fab}
            onClick={handleCloseTrip}
          >
            <Close />
          </Fab>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          {mode === 'view' ? (
            <Card
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1000,
                cursor: 'move',
                width: '20%',
                minWidth: '200px',
                padding: 2
              }}
            >
              <Tables data={viewTrip} title={selectedTrip?.vehicle?.toUpperCase()} />
            </Card>
          ) : (
            <Card
              component='form'
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1000,
                cursor: 'move',
                width: '20%',
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                padding: 2
              }}
            >
              <CustomSelect
                margin='dense'
                {...register('deviceID')}
                error={Boolean(errors?.deviceID)}
                label='Select Vehicle'
                defaultValue={selectedTrip?.vehicle ? selectedTrip?.vehicle : ''}
                disabled={mode !== 'add'}
                items={devices}
                helperText={errors?.deviceID?.message}
              />

              <FormControl margin='dense' fullWidth>
                <Tooltip
                  title={
                    tripData?.source
                      ? tripData?.source
                      : 'Please click on the map to choose source'
                  }
                  followCursor
                >
                  <CustomTextField
                    label='Source'
                    className={styles.icons}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end' className={styles.iconsBtnHover}>
                          <IconButton
                            className={styles.iconsBtn}
                            disabled={edit === 'destination' ? true : false}
                            onClick={() => handleUpdateSource(tripData?.source)}
                          >
                            {tripData?.source ? (
                              <EditLocationAltIcon />
                            ) : (
                              <AddLocationAltIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    value={tripData?.source ?? ''}
                    disabled
                    error={Boolean(errors?.source)}
                    helperText={errors?.source?.message}
                    {...register('source')}
                  />
                </Tooltip>
              </FormControl>

              <FormControl margin='dense' fullWidth>
                <Tooltip
                  title={
                    tripData.destination
                      ? tripData.destination
                      : 'Please click on the map to choose destination'
                  }
                  followCursor
                >
                  <CustomTextField
                    label='Destination'
                    className={styles.icons}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end' className={styles.iconsBtnHover}>
                          <IconButton
                            className={styles.iconsBtn}
                            disabled={tripData?.source ? false : true}
                            onClick={() => handleUpdateDestination(tripData?.destination)}
                          >
                            {tripData?.destination ? (
                              <EditLocationAltIcon />
                            ) : (
                              <AddLocationAltIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    value={tripData?.destination ?? ''}
                    disabled
                    error={Boolean(errors?.destination)}
                    helperText={errors?.destination?.message}
                    {...register('destination')}
                  />
                </Tooltip>
              </FormControl>

              {routeMeasure?.duration && (
                <>
                  <FormControl
                    margin='dense'
                    fullWidth
                    error={Boolean(errors?.startTimestamp)}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Calendar
                        label='From'
                        value={tripData?.fromDate ?? ''}
                        disableFuture={false}
                        disablePast={true}
                        {...register('startTimestamp')}
                        onChange={e => {
                          if (e) {
                            if (tripData) {
                              setTripData(prev => ({
                                ...prev,
                                fromDate: e?.$d,
                                toDate: ''
                              }));
                              setValue('endTimestamp', '');
                            }
                            setMinDateTime(
                              dayjs(
                                new Date(e).getTime() +
                                  1000 * (routeMeasure?.duration + 600)
                              )
                            );
                            setMaxDateTime(
                              dayjs(
                                new Date(e).getTime() +
                                  1000 * (routeMeasure?.duration + 3600)
                              )
                            );
                            setValue('startTimestamp', getEpoch(e?.$d));
                            clearErrors('startTimestamp');
                          }
                        }}
                        minDateTime={dayjs()
                          .set('hour', new Date().getHours())
                          .set('minutes', new Date().getMinutes() + 10)
                          .startOf('minute')}
                        onAccept={e => {
                          let selectedDateTime =
                            new Date() > new Date(e?.$d)
                              ? new Date().setMinutes(new Date().getMinutes() + 10)
                              : e?.$d;
                          setMinDateTime(
                            dayjs(
                              new Date(selectedDateTime).getTime() +
                                1000 * (routeMeasure?.duration + 600)
                            )
                          );
                          setMaxDateTime(
                            dayjs(
                              new Date(selectedDateTime).getTime() +
                                1000 * (routeMeasure?.duration + 3600)
                            )
                          );
                          setTripData(prev => ({
                            ...prev,
                            fromDate: selectedDateTime
                          }));
                          setValue('startTimestamp', getEpoch(selectedDateTime));
                          clearErrors('startTimestamp');
                        }}
                        error={Boolean(errors?.startTimestamp)}
                        helperText={errors?.startTimestamp?.message}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  {minDateTime && maxDateTime && (
                    <FormControl
                      margin='dense'
                      fullWidth
                      error={Boolean(errors?.endTimestamp)}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Calendar
                          label='To'
                          value={tripData?.toDate ?? ''}
                          disableFuture={false}
                          disablePast={true}
                          {...register('endTimestamp')}
                          onChange={e => {
                            if (tripData) {
                              setTripData(prev => ({
                                ...prev,
                                toDate: e?.$d
                              }));
                            }
                          }}
                          onAccept={e => {
                            let selectedDateTime =
                              new Date(minDateTime) > new Date(e?.$d)
                                ? new Date(minDateTime)
                                : e?.$d;
                            setTripData(prev => ({
                              ...prev,
                              toDate: selectedDateTime
                            }));
                            setValue('endTimestamp', getEpoch(selectedDateTime));
                            clearErrors('endTimestamp');
                          }}
                          minDateTime={minDateTime}
                          maxDateTime={maxDateTime}
                          error={Boolean(errors?.endTimestamp)}
                          helperText={errors?.endTimestamp?.message}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  )}
                </>
              )}

              <CustomButton
                category={mode === 'add' ? 'Submit' : 'Update'}
                type='submit'
                loading={isTripLoading}
              />
            </Card>
          )}
          <GoogleMapComponent handleMapClick={handleMapClick}>
            {locations?.length === 2 && (
              <>
                <GoogleDirections origin={locations[0]} destination={locations[1]} />

                {isShowRouteMeasure && (
                  <GoogleDistance
                    locationToMeasure={{
                      source: locations[0],
                      destination: locations[1]
                    }}
                    setRouteMeasure={setRouteMeasure}
                    setIsShowRouteMeasure={setIsShowRouteMeasure}
                  />
                )}
              </>
            )}
            <GoogleMapMarker />
          </GoogleMapComponent>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareTrip} fullWidth>
        <DialogTitle className={styles.dialogTitle}>
          <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#00769e' }}>
            {`Share Trip`}
          </Typography>
          <Fab
            size='small'
            variant='circular'
            onClick={() => {
              setIsShareTrip(false);
              setIsGetTrips(true);
              resetShareTrip();
              setSelectedTrip(null);
            }}
            sx={{
              backgroundColor: '#00769E',
              color: '#fff',
              width: '35px',
              height: '35px',
              ':hover': {
                bgcolor: '#00769E',
                color: 'white'
              }
            }}
          >
            <Close />
          </Fab>
        </DialogTitle>
        <DialogContent>
          <Box
            component='form'
            onSubmit={handleShareTripSubmit(onSubmitShareTrip)}
            sx={{
              display: 'flex !important',
              flexDirection: 'column !important',
              alignItems: 'center !important'
            }}
          >
            <FormControl margin='dense' fullWidth>
              <CustomTextField
                sx={{ width: '100%' }}
                size='small'
                label='Mobile number'
                inputProps={{ maxLength: 10 }}
                error={Boolean(shareTripErrors?.mobile)}
                helperText={shareTripErrors?.mobile?.message}
                {...shareTripRegister('mobile')}
                onKeyDown={e => {
                  let NumberRegex = /^[a-z-A-Z’/`~!#*$@_%+=.,^&(){}[\]|;:'"”<>?\\]$/;
                  if (NumberRegex.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </FormControl>

            <FormControl margin='dense' fullWidth>
              <CustomTextField
                label='Message'
                multiline
                rows={5}
                error={Boolean(shareTripErrors?.message)}
                helperText={shareTripErrors?.message?.message}
                {...shareTripRegister('message')}
              />
            </FormControl>
            <CustomButton type='submit' category='Submit' loading={isTripLoading} />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeactivateTrip}>
        <DialogTitle component='h6'>
          {`Are you sure want to deactivate Trip ID `}
          <b>{selectedTrip?.tripID}</b> {`?`}
        </DialogTitle>
        <DialogActions>
          <CustomButton category='No' onClick={resetDeactivateTrip} />
          <CustomButton
            category='Yes'
            onClick={onSubmitDeactivateTrip}
            loading={isTripLoading}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyTrips;
