import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Calendar from '../../components/customized/Calendar';
import { updateToast } from '../../../app/redux/action/action';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DataTables from '../../components/customized/DataTables';
import React, { useState, useEffect, useCallback } from 'react';
import CustomButton from '../../components/buttons/CustomButton';
import { convertToLocalDateAndTime, getEpoch } from '../../../utils/CommonFunctions';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import CustomTextField from '../../components/customized/CustomTextField';
import {
  Box,
  Grid,
  Stack,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material';
import {
  AddDriverService,
  UpdateDriverService,
  DriverprofileService,
  DeactivateDriverService
} from './services/driverServices';

const Driver = () => {
  //function to dispatch
  const dispatch = useDispatch();

  // Component state
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isShowDeactivate, setIsShowDeactivate] = useState(false);
  const [mode, setMode] = useState('create');
  const [selectedData, setSelectedData] = useState({
    driverID: null,
    deviceID: null,
    birthDate: null
  });
  const [expire, setExpire] = useState('');

  // schema for form validation
  const schema = yup.object().shape({
    driverName: yup
      .string()
      .required('Enter the Driver name')
      .min(4, 'Driver name should be at least 4 characters'),
    contactEmail: yup
      .string()
      .required('Enter the Email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter valid email')
      .email('Enter valid email'),
    contactPhone: yup
      .string()
      .required('Enter the mobile number')
      .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
      .min(10, 'Enter valid mobile number')
      .max(10, 'Enter valid mobile number'),
    dutyStatus: yup.string().required('Enter the Duty status'),
    driverStatus: yup.string().required('Enter the Active status'),
    licenseExpire: yup.string().required('Enter License Expire'),
    licenseNumber: yup.string().required('Enter license number'),
    licenseType: yup.string().required('Enter the License Type')
  });

  // get methods to form validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    clearErrors
  } = useForm({ resolver: yupResolver(schema) });

  // close the for driver adding and editing
  const handleClose = () => {
    reset();
    setExpire('');
    clearErrors();
    setIsOpen(false);
    setSelectedData(prev => ({
      ...prev,
      licenseExpire: ''
    }));
  };

  // function to get all driver details
  const getAlldriverdetails = useCallback(async () => {
    setIsLoading(true);
    let {
      data: { data },
      status
    } = await DriverprofileService();
    if ((status === 200) & (data?.length > 0)) {
      let row = data?.map((items, index) => ({
        ...items,
        id: index + 1
      }));
      setRows(row);
    }
    setIsLoading(false);
  });

  // function to edit the driver details
  const handleEditClick = data => {
    setSelectedData(data);
    setValue('driverID', data.driverID);
    setValue('driverName', data.driverName);
    setValue('contactEmail', data.contactEmail);
    setValue('contactPhone', data.contactPhone);
    setValue('licenseNumber', data.licenseNumber);
    setValue('licenseExpire', data.licenseExpire);
    setValue('licenseType', data.licenseType);
    setValue('dutyStatus', data.dutyStatus === 1 ? 'onduty' : 'offduty');
    setValue('driverStatus', data.driverStatus);
    setIsOpen(true);
    setMode('update');
  };

  // function to create or update driver details
  const onSubmit = async params => {
    setIsLoading(true);
    let {
      driverID,
      driverName,
      contactEmail,
      contactPhone,
      licenseNumber,
      licenseType,
      licenseExpire,
      dutyStatus,
      driverStatus
    } = params;

    let payload = {
      driverID,
      driverName,
      contactEmail,
      contactPhone,
      licenseNumber,
      licenseType,
      licenseExpire,
      dutyStatus,
      driverStatus
    };

    if (mode === 'create') {
      let res = await AddDriverService(payload);
      if (res?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: 'Driver Added Successfully',
            severity: 'success'
          })
        );
      } else {
        dispatch(
          updateToast({
            show: true,
            message: 'Failed to create driver',
            severity: 'error'
          })
        );
      }
    } else {
      let res = await UpdateDriverService(payload);
      if (res?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: res?.message,
            severity: 'success'
          })
        );
      } else {
        dispatch(
          updateToast({
            show: true,
            message: res?.message,
            severity: 'error'
          })
        );
      }
    }
    handleClose();
    await getAlldriverdetails();
    setIsLoading(false);
  };

  // function to deactivate the driver details
  const handleDeactivate = async () => {
    setIsLoading(true);

    let deactivateRes = await DeactivateDriverService({
      driverID: selectedData?.driverID,
      deviceID: selectedData?.deviceID
    });

    if (deactivateRes?.status === 200 || deactivateRes?.status === 201) {
      dispatch(
        updateToast({
          show: true,
          message: `Driver ${
            selectedData?.isActive === 1 ? ' deactivated ' : ' activated '
          }successfully`,
          severity: 'success'
        })
      );
    } else {
      if (deactivateRes?.response?.status === 400) {
        dispatch(
          updateToast({
            show: true,
            message: `Error while deactivating the Driver`,
            severity: 'error'
          })
        );
      } else {
        dispatch(
          updateToast({ show: true, message: 'Network Error', severity: 'error' })
        );
      }
    }
    setIsShowDeactivate(false);
    setSelectedData(null);
    await getAlldriverdetails();
    setIsLoading(false);
  };

  // action component
  const Actions = ({ row }) => (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly'
      }}
    >
      <CustomIconButton
        category='Edit'
        disabled={row?.isActive === 0}
        onClick={() => handleEditClick(row)}
      />
      <CustomIconButton
        category={row?.isActive === 1 ? 'Deactivate' : 'Activate'}
        onClick={() => {
          setSelectedData(row);
          setIsShowDeactivate(true);
        }}
      />
    </Box>
  );

  // column definition
  const columns = [
    {
      field: 'driverID',
      headerName: 'Driver Id',
      flex: 1,
      minWidth: 170,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'driverName',
      headerName: 'Driver Name',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: ({ value }) =>
        value
          ?.toLowerCase()
          .split(' ')
          .map(data => data.charAt(0).toUpperCase() + data.substring(1))
          .join(' ')
    },
    {
      field: 'contactPhone',
      headerName: 'Contact Phone',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'contactEmail',
      headerName: 'Contact Email',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => value?.toLowerCase()
    },
    {
      field: 'licenseNumber',
      headerName: 'License No',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'licenseType',
      headerName: 'License Type',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'licenseExpire',
      headerName: 'License Expires',
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: ({ value }) => convertToLocalDateAndTime(value)
    },
    {
      field: 'dutyStatus',
      headerName: 'Duty Status',
      flex: 1,
      minWidth: 110,
      sortable: false,
      renderCell: ({ value }) => (value === 1 ? 'On Duty' : 'Off Duty')
    },
    {
      field: '',
      headerName: 'Action',
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: Actions
    }
  ];

  useEffect(() => {
    getAlldriverdetails();
    setExpire('');
  }, []);

  return (
    <Box sx={{ height: '100vh' }} p={1}>
      <Box sx={{ right: 5, zIndex: 99, position: 'absolute' }}>
        <CustomIconButton
          category='Add'
          size='small'
          variant='circular'
          onClick={() => {
            setExpire('');
            setIsOpen(true);
            setMode('create');
          }}
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

      <Dialog open={isOpen} maxWidth='md'>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component='h5' sx={{ fontWeight: '700', color: '#00769e' }}>
            {mode === 'create' ? `Add Driver Details` : `Edit Driver Details`}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid component='form' container spacing={1} onSubmit={handleSubmit(onSubmit)}>
            <Grid item md={6} sm={12} xs={12}>
              <CustomTextField
                margin='normal'
                label='Driver Name'
                {...register('driverName')}
                error={Boolean(errors?.driverName)}
                helperText={errors?.driverName?.message}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <CustomTextField
                margin='normal'
                label='Contact Phone'
                inputProps={{ maxLength: 10 }}
                {...register('contactPhone')}
                error={Boolean(errors?.contactPhone)}
                helperText={errors?.contactPhone?.message}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <CustomTextField
                margin='normal'
                label='Contact Email'
                {...register('contactEmail')}
                error={Boolean(errors?.contactEmail)}
                helperText={errors?.contactEmail?.message}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <CustomTextField
                margin='normal'
                label='License Number'
                {...register('licenseNumber')}
                error={Boolean(errors?.licenseNumber)}
                helperText={errors?.licenseNumber?.message}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <CustomTextField
                margin='normal'
                label='License Type'
                {...register('licenseType')}
                error={Boolean(errors?.licenseType)}
                helperText={errors?.licenseType?.message}
              />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <FormControl
                margin='normal'
                fullWidth
                error={Boolean(errors?.licenseExpire)}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Calendar
                    label='License Expire'
                    disableFuture={false}
                    value={expire ? expire : selectedData?.licenseExpire}
                    {...register('licenseExpire')}
                    onChange={e => {
                      setExpire(e);
                    }}
                    onAccept={e => {
                      setValue('licenseExpire', getEpoch(e?.$d));
                      clearErrors('licenseExpire');
                    }}
                    error={Boolean(errors?.licenseExpire)}
                    helperText={errors?.licenseExpire?.message}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <FormControl error={Boolean(errors?.dutyStatus)}>
                <FormLabel>Duty Status</FormLabel>
                <RadioGroup
                  row
                  name='dutyStatus'
                  defaultValue={selectedData?.dutyStatus === 1 ? 'onduty' : 'offduty'}
                >
                  <FormControlLabel
                    value='onduty'
                    control={<Radio {...register('dutyStatus')} />}
                    label='On Duty'
                  />
                  <FormControlLabel
                    value='offduty'
                    control={<Radio {...register('dutyStatus')} />}
                    label='Off Duty'
                  />
                </RadioGroup>
                <FormHelperText>{errors?.dutyStatus?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
              <FormControl error={Boolean(errors?.driverStatus)}>
                <FormLabel>Active</FormLabel>
                <RadioGroup
                  row
                  name='driverStatus'
                  defaultValue={selectedData?.driverStatus === 1 ? 'yes' : 'no'}
                >
                  <FormControlLabel
                    value='yes'
                    control={<Radio {...register('driverStatus')} />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='no'
                    control={<Radio {...register('driverStatus')} />}
                    label='No'
                  />
                </RadioGroup>
                <FormHelperText>{errors?.driverStatus?.message}</FormHelperText>
              </FormControl>
            </Grid>

            <Stack
              mt={2}
              direction='row'
              justifyContent='flex-end'
              spacing={2}
              width='100%'
            >
              <CustomButton category='Cancel' onClick={handleClose} />
              <CustomButton
                type='submit'
                category={mode === 'create' ? 'Submit' : 'Update'}
              />
            </Stack>
          </Grid>
        </DialogContent>
      </Dialog>

      <Dialog open={isShowDeactivate}>
        <DialogTitle>
          <Typography component='h6'>
            Are you sure you want to
            {selectedData?.isActive === 1 ? ' deactivate ' : ' activate '}
            <b>{selectedData?.deviceID?.toUpperCase()}</b> {`?`}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <CustomButton
            category='No'
            onClick={() => {
              setIsShowDeactivate(false);
              setSelectedData(null);
            }}
          />
          <CustomButton category='Yes' onClick={handleDeactivate} loading={isLoading} />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Driver;
