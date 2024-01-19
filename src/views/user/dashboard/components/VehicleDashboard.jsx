import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import {
  Box,
  Button as MuiButton,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  inputLabelClasses,
  DialogContentText
} from '@mui/material';
import totalImg from '../../../../app/images/total.png';
import onlineImg from '../../../../app/images/online.png';
import offlineImg from '../../../../app/images/offline.png';
import movingImg from '../../../../app/images/moving.png';
import idleImg from '../../../../app/images/idle.png';
import parkedImg from '../../../../app/images/parked.png';
import Highcharts from 'highcharts';
import {
  FilterVehicleDashboardService,
  VehicleDashboardDeviceListService,
  VehicleDashboardService,
  VehicleDashboardByStatusService
} from '../services/DashboardServices';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  updateCenter,
  updateMarkers,
  updateToast
} from '../../../../app/redux/action/action';
import Loader from '../../../components/loaders/Loader';
import {
  Chart as ChartJs,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import GoogleMapComponent from '../../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../../components/maps/GoogleMapMarker';
import { Cancel } from '@mui/icons-material';
import CustomButton from '../../../components/buttons/CustomButton';
import CustomIconButton from '../../../components/buttons/CustomIconButton';
import DashboardMap from './components/DashboardMap';
import VehicleSpeedGraph from './components/VehicleSpeedGraph';
import RecentsEvents from './components/RecentEvents';

const interval = parseInt(process.env.REACT_APP_API_INTERVAL);

ChartJs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// component styles
const useStyles = createUseStyles({
  cardBox: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'capitalize'
  },
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cardImgBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardImg: {
    height: '50px',
    width: '50px',
    borderRadius: '50px'
  },
  cardTypography: {
    fontWeight: 'bold !important'
  },
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  },
  filterDashboard: {
    '& .css-tlc64q-MuiPaper-root-MuiDialog-paper': {
      width: '350px !important'
    }
  }
});

const VehicleDashboard = () => {
  // component styles
  const styles = useStyles();

  // function to update location state
  const dispatch = useDispatch();

  const initialOptions = {
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      max: 10,
      title: {
        text: 'KMPH'
      }
    },
    chart: {
      type: 'spline'
    },
    title: {
      text: null
    },
    series: []
  };

  // component state
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [vehicleDashboardData, setVehicleDashboardData] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceList, setDeviceList] = useState({});
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isShowMap, setIsShowMap] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [mode, setMode] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const [speedData, setSpeedData] = useState([]);

  // state for filter vehicle dashboard data form error handling
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    clearErrors
  } = useForm();

  // column definition for vehicle dashboard recent events component
  const columns = [
    {
      field: 'vehicleName',
      headerName: 'Vehicle No',
      title: 'Vehicle',
      flex: 1,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'timeStamp',
      headerName: 'Updated',
      title: 'Time Stamp',
      flex: 1
    },
    { field: 'message', headerName: 'Status', title: 'Message', flex: 1 }
  ];

  // function to get vehicle dashboard data
  const getVehicleDashboardData = async () => {
    let { data, status } = await VehicleDashboardService();
    if (status === 200) setVehicleDashboardData(data?.data[0]);
    setIsLoading(false);
  };

  // function to get vehicle dashboard map view by status
  const handleClick = async id => {
    setMode('status');
    setSelectedStatus(id);
    setIsShowMap(true);
    await getVehicleDashboardByStatusData(id, 'toast');
  };

  // function to get vehicle dashboard filtered data
  const getVehicleDashboardByStatusData = async (id, toast = null) => {
    let {
      data: { data },
      status
    } = await VehicleDashboardByStatusService(id);
    if (status === 200 && data) {
      if (data?.length > 0) {
        let dataByStatus = data?.map((item, index) => {
          let {
            speed,
            todayDistance,
            totalDistance,
            vehicleName,
            vehicleType: deviceType
          } = item?.vehicleDashboardVehicleDetails;
          return {
            id: index,
            lat: item?.latitude,
            lng: item?.longitude,
            info: [
              `Vehicle Number : ${vehicleName?.toUpperCase()}`,
              `Speed : ${speed?.toFixed(2)} KMPH`,
              `Today Distance : ${todayDistance?.toFixed(2)} KM`,
              `Total Distance : ${totalDistance?.toFixed(2)} KM`
            ],
            deviceType
          };
        });

        dispatch(updateMarkers(dataByStatus));
        if (toast === 'toast') {
          dispatch(
            updateToast({ show: true, message: 'Vehicles found!', severity: 'success' })
          );
        }
      } else {
        dispatch(updateMarkers([]));
        if (toast === 'toast') {
          dispatch(
            updateToast({ show: true, message: 'No vehicles found!', severity: 'error' })
          );
        }
      }
    } else {
      if (toast === 'toast')
        dispatch(
          updateToast({ show: true, message: 'Network Error !', severity: 'error' })
        );
    }
  };

  // function to get vehicle dashboard device list
  const getVehicleDashboardDeviceList = useCallback(async () => {
    let {
      data: { data },
      status
    } = await VehicleDashboardDeviceListService();
    if (status === 200) setDeviceList(data[0]);
  }, []);

  // function to handle click filter dashboard
  const handleFilterDashboard = () => {
    setIsFilterLoading(true);
    filterVehicleDashboard('toast');
    setIsOpenFilter(false);
    setMode('filter');
    setIsFilterLoading(false);
  };

  // function to filter dashboard
  const filterVehicleDashboard = async (toast = null) => {
    let { deviceID } = getValues();
    let res = await FilterVehicleDashboardService(deviceID);
    if (res?.status === 200) {
      setVehicleDashboardData(res?.data?.data[0]);
      if (toast === 'toast') {
        dispatch(
          updateToast({
            show: true,
            message: 'Dashboard filtered successfully!',
            severity: 'success'
          })
        );
      }
    } else {
      if (toast === 'toast') {
        dispatch(
          updateToast({
            show: true,
            message: 'Network error!',
            severity: 'error'
          })
        );
      }
    }
    setSelectedDevices([]);
    setDevices([]);
  };

  // condition for select & de-select all devices
  const handleSelectAll = () => {
    if (selectedDevices?.length) {
      setSelectedDevices([]);
      setValue('deviceID', null);
    } else {
      setSelectedDevices(devices);
      setValue('deviceID', devices);
      clearErrors();
    }
  };

  // condition for delete select devices
  const handleDelete = val => {
    const filteredItems = selectedDevices.filter(item => item !== val);
    setSelectedDevices(filteredItems);
    setValue('deviceID', filteredItems);
  };

  // function to handle multiple select option
  const handleDeviceChange = event => {
    const {
      target: { value }
    } = event;
    setSelectedDevices(typeof value === 'string' ? value.split(',') : value);
  };

  const getDashboardDeviceList = () => {
    setIsOpenFilter(true);
    getVehicleDashboardDeviceList();
  };

  const getDataByMode = async () => {
    if (mode === 'dashboard' && !isOpenFilter) await getVehicleDashboardData();
    if (mode === 'status' && !isOpenFilter)
      await getVehicleDashboardByStatusData(selectedStatus);
    if (mode === 'filter' && !isOpenFilter) await filterVehicleDashboard();
  };

  useEffect(() => {
    // reset the form when filter opens
    if (isOpenFilter) reset();

    // call function initially depends on user's mode
    getDataByMode();

    // call function on every 7 seconds depends on user's mode
    const timer = setInterval(() => {
      getDataByMode();
    }, interval);

    return () => clearInterval(timer);
  }, [mode, isOpenFilter]);

  useEffect(() => {
    if (
      vehicleDashboardData &&
      vehicleDashboardData?.liveDeviceLatitudeAndLongitudeValue?.length > 0 &&
      vehicleDashboardData?.liveDeviceSpeedValue?.length > 0
    ) {
      let mapData = vehicleDashboardData?.liveDeviceLatitudeAndLongitudeValue?.map(
        (device, index) => ({
          id: index,
          info: [device?.deviceID],
          lat: parseFloat(device?.latitude),
          lng: parseFloat(device?.longitude),
          deviceType: device?.deviceType
        })
      );

      if (speedData?.length > 5) {
        let data = speedData;
        data?.shift();
        setSpeedData([...data, vehicleDashboardData?.liveDeviceSpeedValue]);
      } else setSpeedData(prev => [...prev, vehicleDashboardData?.liveDeviceSpeedValue]);

      let recentEvents = vehicleDashboardData?.recentEvents?.map((item, index) => ({
        ...item,
        id: index + 1,
        message: item?.message == null ? 'No event found' : item?.message
      }));

      setRows(recentEvents);

      if (mapData?.length > 0 && (mode === 'dashboard' || mode === 'filter')) {
        dispatch(updateCenter({ lat: mapData[0]?.lat, lng: mapData[0]?.lng }));
        dispatch(updateMarkers(mapData));
      }

      if (options?.xAxis?.categories?.length > 5) {
        let getTimeStamps = options?.xAxis?.categories;
        getTimeStamps?.shift();
        getTimeStamps?.push(new Date().toLocaleTimeString());
        setOptions(prev => ({
          ...prev,
          xAxis: {
            categories: getTimeStamps
          }
        }));
      } else {
        setOptions(prev => ({
          ...prev,
          xAxis: {
            categories: [...options?.xAxis?.categories, new Date().toLocaleTimeString()]
          }
        }));
      }
    }
    return () => {
      dispatch(updateMarkers([]));
    };
  }, [vehicleDashboardData]);

  useEffect(() => {
    let { max, ...rest } = options?.yAxis;
    let speed = speedData?.flat();

    const maxSpeed = speed.reduce((max, entry) => {
      return Math.max(max, entry.liveSpeed);
    }, 0);

    const uniqueDeviceIDs = [...new Set(speed.map(entry => entry.deviceID))];

    const deviceLiveSpeeds = uniqueDeviceIDs.map(deviceID => {
      return {
        name: deviceID,
        data: speed.filter(item => item.deviceID === deviceID).map(item => item.liveSpeed)
      };
    });

    setOptions(prev => ({
      ...prev,
      series: deviceLiveSpeeds,
      yAxis: { ...rest, max: maxSpeed === 0 ? 10 : maxSpeed }
    }));
  }, [speedData]);

  // vehicle dashboard card container component
  const CardContainer = () => (
    <Grid container spacing={1}>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('total')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Total</Typography>

            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='rgba(0, 0, 0, 0.72)'
              >
                {vehicleDashboardData?.count?.[0]?.total}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={totalImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('online')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Online</Typography>

            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='rgba(0, 255, 0, 0.72)'
              >
                {vehicleDashboardData?.count?.[0]?.online}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={onlineImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('offline')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Offline</Typography>

            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='#FF0000'
              >
                {vehicleDashboardData?.count?.[0]?.offline}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={offlineImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('moving')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Moving</Typography>

            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='#FFAE42'
              >
                {vehicleDashboardData?.count?.[0]?.moving}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={movingImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('idle')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>Idle</Typography>

            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='#073863'
              >
                {vehicleDashboardData?.count?.[0]?.idle}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={idleImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
      <Grid item lg={2} md={2} sm={4} xs={6}>
        <Card
          component={MuiButton}
          className={styles.card}
          onClick={() => handleClick('parked')}
        >
          <Box className={styles.cardBox}>
            <Typography component='h5'>parked</Typography>

            {isLoading ? (
              <Skeleton animation='wave' variant='circular' width={30} height={30} />
            ) : (
              <Typography
                component='h4'
                className={styles.cardTypography}
                color='rgba(255, 215, 0, 0.72)'
              >
                {vehicleDashboardData?.count?.[0]?.parked}
              </Typography>
            )}
          </Box>
          <Box className={styles.cardImgBox} p={1}>
            <Box component='img' src={parkedImg} className={styles.cardImg} />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Box p={1}>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <CardContainer />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <DashboardMap getDashboardDeviceList={getDashboardDeviceList} />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <VehicleSpeedGraph
            isLoading={isLoading}
            Highcharts={Highcharts}
            options={options}
          />
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12}>
          <RecentsEvents isLoading={isLoading} rows={rows} columns={columns} />
        </Grid>
      </Grid>

      <Dialog open={isOpenFilter} fullWidth className={styles.filterDashboard}>
        <Box
          mt={1}
          pl={2}
          pr={2}
          pt={1.6}
          pb={1.5}
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
              setSelectedDevices([]);
              setDevices([]);
              setMode('dashboard');
              setIsOpenFilter(false);
              reset();
            }}
          />
        </Box>
        <DialogContentText pl={2} pr={2} pb={1.5}>
          <Box
            component='form'
            onSubmit={handleSubmit(handleFilterDashboard)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FormControl
              size='small'
              error={Boolean(errors?.status)}
              margin='dense'
              fullWidth
            >
              <InputLabel id='select-device-status-label'>Status</InputLabel>
              <Controller
                control={control}
                name='status'
                rules={{ required: 'Select vehicle status' }}
                render={({ field: { onChange } }) => (
                  <Select
                    labelId='select-device-status-label'
                    id='select-device-status'
                    label='Status'
                    size='small'
                    InputLabelProps={{
                      sx: {
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: '#00769e'
                        }
                      }
                    }}
                    defaultValue=''
                    onChange={e => {
                      onChange(e);
                      setDevices(deviceList[e?.target?.value]);
                      setSelectedDevices([]);
                    }}
                  >
                    <MenuItem value='offlineDevices'>Offline</MenuItem>
                    <MenuItem value='onlineDevices'>Online</MenuItem>
                    <MenuItem value='movingDevices'>Moving</MenuItem>
                    <MenuItem value='idleDevices'>Idle</MenuItem>
                    <MenuItem value='parkedDevices'>Parked</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText>{errors?.status?.message}</FormHelperText>
            </FormControl>

            <FormControl
              size='small'
              error={Boolean(errors?.deviceID)}
              margin='dense'
              fullWidth
            >
              <InputLabel id='select-device-label'>Vehicle</InputLabel>
              <Controller
                control={control}
                name='deviceID'
                rules={{ required: 'Select vehicle' }}
                render={({ field: { onChange } }) => (
                  <Select
                    labelId='select-device-label'
                    id='select-device'
                    multiple
                    open={isOpen}
                    value={selectedDevices}
                    label='Device'
                    InputLabelProps={{
                      sx: {
                        [`&.${inputLabelClasses.shrink}`]: {
                          color: '#00769e'
                        }
                      }
                    }}
                    size='small'
                    onChange={e => {
                      onChange(e);
                      handleDeviceChange(e);
                    }}
                    input={
                      <OutlinedInput
                        id='selected-chips'
                        label='Vehicle'
                        size='small'
                        onClick={() => setIsOpen(!isOpen)}
                      />
                    }
                    renderValue={selected => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected?.map((val, index) => (
                          <Chip
                            key={index}
                            label={val?.toUpperCase()}
                            clickable
                            deleteIcon={
                              <Cancel onMouseDown={event => event.stopPropagation()} />
                            }
                            onDelete={() => {
                              handleDelete(val);
                            }}
                            size='small'
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {devices?.length > 0 && (
                      <MenuItem key='selectAll' onClick={handleSelectAll}>
                        Select All
                      </MenuItem>
                    )}

                    {devices?.length > 0 ? (
                      devices?.map((device, index) => (
                        <MenuItem value={device} key={index}>
                          {device?.toUpperCase()}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No Vehicle</MenuItem>
                    )}
                  </Select>
                )}
              />
              <FormHelperText>{errors?.deviceID?.message}</FormHelperText>
            </FormControl>
            <Box mt={0.7} mb={0.8}>
              <CustomButton type='submit' category='Submit' loading={isFilterLoading} />
            </Box>
          </Box>
        </DialogContentText>
      </Dialog>

      <Dialog fullScreen className={styles.dialog} open={isShowMap}>
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#00769e',
              textTransform: 'capitalize'
            }}
          >
            {selectedStatus}
          </Typography>
          <CustomIconButton
            category='Close'
            onClick={() => {
              setIsShowMap(false);
              setMode('dashboard');
              dispatch(updateMarkers([]));
            }}
          />
        </DialogTitle>
        <DialogContent sx={{ height: '100vh', width: '100%' }}>
          <GoogleMapComponent>
            <GoogleMapMarker />
          </GoogleMapComponent>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VehicleDashboard;
