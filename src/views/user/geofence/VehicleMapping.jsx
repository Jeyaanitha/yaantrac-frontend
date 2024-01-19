import React, { useCallback, useEffect, useState } from 'react';
import {
  AddDeviceMappingService,
  DeleteDeviceMappingService,
  DeviceMappingDetailsService,
  DeviceMappingDeviceListService,
  UpdateDeviceMappingService
} from './services/GeofenceServices';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import DataTables from '../../components/customized/DataTables';
import { createUseStyles } from 'react-jss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '../../components/buttons/CustomButton';
import { updateToast } from '../../../app/redux/action/action';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import { useDispatch } from 'react-redux';
import CustomSelect from '../../components/customized/CustomSelect';

const useStyles = createUseStyles({
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    },
    '& .css-tlc64q-MuiPaper-root-MuiDialog-paper': {
      maxWidth: '350px !important'
    }
  }
});

const VehicleMapping = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch
  const dispatch = useDispatch();

  // component state
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [geofences, setGeofences] = useState([]);
  const [devices, setDevices] = useState([]);
  const [mode, setMode] = useState('create');
  const [isShowDeactivate, setIsShowDeactivate] = useState(false);
  const [selectedData, setSelectedData] = useState({
    geozoneID: null,
    deviceID: null
  });

  // schema for form validation
  const schema = yup.object().shape({
    geozoneID: yup.string().required('Select a geofence'),
    deviceID: yup.string().required('Select a vehicle')
  });

  // form state
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors
  } = useForm({ resolver: yupResolver(schema) });

  // function to create or update device mapping
  const onSubmit = async params => {
    if (mode === 'create') await addDeviceMapping(params);
    else await updateDeviceMapping(params);
    await getDeviceMappingDetails();
    await getDeviceMappingDeviceList();
    setMode('create');
    reset();
  };

  // function to handle click on edit
  const handleEditClick = data => {
    setMode('update');
    setSelectedData(prev => ({
      ...prev,
      deviceID: data?.device,
      geozoneID: data?.geofence
    }));
    setValue('geozoneID', data?.geofence);
    setValue('deviceID', data?.device);
    clearErrors();
    setIsOpen(true);
  };

  // component for actions
  const Actions = ({ row }) => (
    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'space-evenly' }}>
      <CustomIconButton category='Edit' onClick={() => handleEditClick(row)} />
      <CustomIconButton
        category='Delete'
        onClick={() => {
          let { device, geofence } = row;
          setSelectedData(prev => ({ ...prev, deviceID: device, geozoneID: geofence }));
          setIsShowDeactivate(true);
        }}
      />
    </Box>
  );

  // column definition
  const columns = [
    {
      field: 'geofence',
      headerName: 'Geofence',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'device',
      headerName: 'Vehicle No',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: '',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: Actions
    }
  ];

  // function to get device mapping details
  const getDeviceMappingDetails = useCallback(async () => {
    setIsLoading(true);
    let { status, data } = await DeviceMappingDetailsService();
    if (status === 200) {
      let geofence = data[0]?.geozone;
      let device = data[1]?.device;
      if (geofence?.length === device?.length && geofence?.length > 0) {
        let row = geofence?.map((fence, index) => ({
          id: index,
          geofence: fence,
          device: device[index]
        }));
        setRows(row);
      } else setRows([]);
    }
    setIsLoading(false);
  });

  // function to get device mapping device list
  const getDeviceMappingDeviceList = useCallback(async () => {
    let { status, data } = await DeviceMappingDeviceListService();
    if (status === 200) {
      setDevices(data[1]?.device?.sort());
      setGeofences(data[0]?.geozone);
    }
  });

  // function to add device mapping
  const addDeviceMapping = useCallback(async data => {
    setIsLoading(true);
    let res = await AddDeviceMappingService(data);
    if (res?.status === 200) {
      dispatch(updateToast({ show: true, message: res?.message, severity: 'success' }));
    } else if (res?.response?.status === 400) {
      dispatch(
        updateToast({
          show: true,
          message: 'This vehicle is already mapped',
          severity: 'error'
        })
      );
    } else {
      dispatch(updateToast({ show: true, message: 'Network error!', severity: 'error' }));
    }
    setIsOpen(false);
    setIsLoading(false);
  });

  // function to update device mapping
  const updateDeviceMapping = useCallback(async data => {
    setIsLoading(true);
    let { deviceID: vehicleNumber, geozoneID } = data;
    let { status, message } = await UpdateDeviceMappingService({
      geozoneID,
      vehicleNumber
    });
    if (status === 200) {
      dispatch(updateToast({ show: true, message, severity: 'success' }));
    } else {
      dispatch(updateToast({ show: true, message, severity: 'error' }));
    }
    setIsOpen(false);
    setIsLoading(false);
  });

  // function to deactivate device mapping
  const handleDeactivate = useCallback(async () => {
    setIsLoading(true);
    let { status, message } = await DeleteDeviceMappingService({
      deviceID: selectedData?.deviceID
    });
    if (status === 200) {
      dispatch(updateToast({ show: true, message, severity: 'success' }));
    } else {
      dispatch(updateToast({ show: true, message, severity: 'error' }));
    }
    setIsShowDeactivate(false);
    setIsLoading(false);
    await getDeviceMappingDetails();
    await getDeviceMappingDeviceList();
  });

  useEffect(() => {
    getDeviceMappingDetails();
    getDeviceMappingDeviceList();
  }, []);

  useEffect(() => {
    if (isOpen && mode === 'create') reset();
  }, [isOpen]);

  return (
    <Box sx={{ height: '100vh' }} p={1}>
      <Box sx={{ right: 5, position: 'absolute', zIndex: 99 }}>
        <CustomIconButton
          category='Add'
          size='small'
          variant='circular'
          onClick={() => setIsOpen(true)}
        />
      </Box>
       {rows?.length === 0 && <Box mt={5} />}
      <DataTables
        loading={isLoading}
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Dialog open={isOpen} className={styles.dialog}  fullWidth>
      <Box mt={1} pl={2} pr={2} pt={1.6} pb={1.2}   sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Typography component='h5' sx={{ fontWeight: '700', color: '#00769e' }}>
            {mode === 'create' ? `Add Vehicle Mapping` : `Update Vehicle Mapping`}
          </Typography>
          <CustomIconButton
            size='small'
            category='Close'
            onClick={() => {
              setIsOpen(false);
              setMode('create');
            }}
          />
       </Box>
        <DialogContentText pl={4} pr={2} pb={1.6} >
        <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            my={1}
          >
            <CustomSelect
              margin='dense'
              error={errors?.geozoneID}
              label='Geofence ID'
              defaultValue={mode === 'update' ? selectedData?.geozoneID : ''}
              items={geofences}
              helperText={errors?.geozoneID?.message}
              {...register('geozoneID')}
            />
            <CustomSelect
              margin='dense'
              error={errors?.deviceID}
              label='Select Vehicle'
              defaultValue={mode === 'update' ? selectedData?.deviceID : ''}
              disabled={mode === 'update'}
              items={mode === 'update' ? [selectedData?.deviceID] : devices}
              helperText={errors?.deviceID?.message}
              {...register('deviceID')}
            />
            <Box mt={.7}  >
              <CustomButton type='submit' category='Save' loading={isLoading} />
            </Box>
          </Grid>
        </DialogContentText>
      </Dialog>

      <Dialog open={isShowDeactivate} onClose={() => setIsShowDeactivate(false)}>
        <DialogTitle>
          <Typography component='h6'>
            {`Are you sure want to delete `}
            <b>{selectedData?.deviceID?.toUpperCase()}</b> {`?`}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <CustomButton category='No' onClick={() => setIsShowDeactivate(false)} />
          <CustomButton category='Yes' onClick={handleDeactivate} loading={isLoading} />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VehicleMapping;
