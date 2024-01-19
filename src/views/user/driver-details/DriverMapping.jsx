import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateToast } from '../../../app/redux/action/action';
import DataTables from '../../components/customized/DataTables';
import CustomButton from '../../components/buttons/CustomButton';
import CustomSelect from '../../components/customized/CustomSelect';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import {
  Box,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import {
  AddDriverMappingService,
  GetDriverMappingService,
  UpdateDriverMappingService,
  DeleteDriverMappingService,
  GetDriverIDsDropdownService,
  GetVehicleNoDropdownService
} from './services/driverServices';

const useStyles = createUseStyles({
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    },
    '& .css-tlc64q-MuiPaper-root-MuiDialog-paper': {
      maxWidth: '350px !important'
    }
  },
  button: {
    display: 'flex',
    justifyContent: 'end'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'end'
  }
});

const DriverMapping = () => {
  // component styles
  const styles = useStyles();

  //function to dispatch
  const dispatch = useDispatch();

  // component states
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [driverIDsList, setDriverIDsList] = useState([]);
  const [vehicleNoList, setVehicleNoList] = useState([]);
  const [isButtonLoad, setIsButtonLoad] = useState(false);
  const [selectedDriverMap, setSelectedDriverMap] = useState(null);
  const [isDeactivateDriverMap, setIsDeactivateDriverMap] = useState(false);

  // schema for form validation
  const schema = yup.object().shape({
    driverID: yup
      .string()
      .required('Enter the Driver name')
      .min(3, 'Driver name should be at least 3 characters'),
    vehicleNumber: yup.string().required('Enter the vehicle address')
  });

  // form state
  const {
    reset,
    setValue,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  // Function to reset the form:
  const onReset = () => {
    reset();
    setIsOpen(false);
    setSelectedDriverMap(null);
  };

  // Function to Get Driver Mapping Details:
  const getDriverMapping = async () => {
    setIsLoading(true);
    let res = await GetDriverMappingService();

    if (res && res?.status === 200) {
      let driverRow = res?.data?.data?.map((row, index) => ({ ...row, sNo: index + 1 }));
      setRows(driverRow);
    }
    setIsLoading(false);
  };

  // Function to Get Driver ID's Dropdown List Details:
  const getDriverIDsDropdown = async () => {
    setIsLoading(true);
    let res = await GetDriverIDsDropdownService();

    if (res && res?.status === 200) {
      setDriverIDsList(res?.data?.data);
    }
    setIsLoading(false);
  };

  // Function to Get Vehicle No Dropdown List Details:
  const getVehicleNoDropdown = async () => {
    setIsLoading(true);
    let res = await GetVehicleNoDropdownService();

    if (res && res?.status === 200) {
      setVehicleNoList(res?.data?.data);
    }
    setIsLoading(false);
  };

  // Function to submit the Form
  const onSubmit = async params => {
    setIsButtonLoad(true);
    let { driverID, vehicleNumber } = params;

    if (!selectedDriverMap) {
      // Adding the Driver Mapping Details:
      let addRes = await AddDriverMappingService({ driverID, vehicleNumber });

      if (addRes?.status === 200 || addRes?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: 'Driver Mapping added successfully',
            severity: 'success'
          })
        );
      } else {
        if (addRes?.response?.status === 400) {
          dispatch(
            updateToast({
              show: true,
              message: 'Error while adding Driver Mapping',
              severity: 'error'
            })
          );
        } else if (addRes?.response?.status === 409) {
          dispatch(
            updateToast({
              show: true,
              message: ' Already the driver has been mapped',
              severity: 'error'
            })
          );
        } else {
          dispatch(
            updateToast({ show: true, message: 'Network Error', severity: 'error' })
          );
        }
      }
    } else {
      // Updating the Driver Mapping Details:
      let updateRes = await UpdateDriverMappingService({ driverID, vehicleNumber });

      if (updateRes?.status === 200 || updateRes?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: 'Driver Mapping updated successfully',
            severity: 'success'
          })
        );
      } else {
        if (updateRes?.response?.status === 400) {
          dispatch(
            updateToast({
              show: true,
              message: 'Error while updating Driver Mapping',
              severity: 'error'
            })
          );
        } else if (updateRes?.response?.status === 409) {
          dispatch(
            updateToast({
              show: true,
              message: 'Already the driver has been mapped',
              severity: 'error'
            })
          );
        } else {
          dispatch(
            updateToast({ show: true, message: 'Network Error', severity: 'error' })
          );
        }
      }
    }
    onReset();
    await getDriverMapping();
    setIsButtonLoad(false);
  };

  // function to update the form
  const handleUpdateDriverMap = data => {
    let { driverID, vehicleNumber } = data;

    setValue('driverID', driverID);
    setValue('vehicleNumber', vehicleNumber);
    clearErrors();
    setSelectedDriverMap(data);
    setIsOpen(true);
  };

  // function to delete the driver mapping details:
  const handleDeleteDriverMap = async () => {
    setIsButtonLoad(true);
    let deactivateRes = await DeleteDriverMappingService({
      vehicleNumber: selectedDriverMap?.vehicleNumber
    });

    if (deactivateRes?.status === 200 || deactivateRes?.status === 201) {
      dispatch(
        updateToast({
          show: true,
          message: `Deactivated the mapped vehicle number successfully`,
          severity: 'success'
        })
      );
    } else {
      if (deactivateRes?.response?.status === 400) {
        dispatch(
          updateToast({
            show: true,
            message: `Error while deactivating the mapped vehicle number`,
            severity: 'error'
          })
        );
      } else {
        dispatch(
          updateToast({ show: true, message: 'Network Error', severity: 'error' })
        );
      }
    }

    setIsDeactivateDriverMap(false);
    setSelectedDriverMap(null);
    await getDriverMapping();
    setIsButtonLoad(false);
  };

  // column definition
  const columns = [
    {
      field: 'driverID',
      headerName: 'Driver ID',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false
    },
    {
      field: 'vehicleNumber',
      headerName: 'Vehicle No.',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 200,
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-evenly' }}>
          <CustomIconButton
            category='Edit'
            disabled={row?.isActive === 0}
            onClick={() => {
              handleUpdateDriverMap(row);
              getVehicleNoDropdown();
              getDriverIDsDropdown();
            }}
          />
          <CustomIconButton
            category='Delete'
            onClick={() => {
              setSelectedDriverMap(row);
              setIsDeactivateDriverMap(true);
            }}
          />
        </Box>
      )
    }
  ];

  useEffect(() => {
    getDriverMapping();
  }, []);

  return (
    <Box p={1} sx={{ position: 'relative' }}>
      <Box
        sx={
          rows.length === 0
            ? {
                display: 'flex',
                justifyContent: 'end'
              }
            : {
                right: 5,
                position: 'absolute',
                zIndex: 99
              }
        }
        pb={1}
      >
        <CustomIconButton
          category='Add'
          size='small'
          variant='circular'
          onClick={() => {
            setIsOpen(true);
            getVehicleNoDropdown();
            getDriverIDsDropdown();
          }}
        />
      </Box>
      <DataTables
        loading={isLoading}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Dialog fullWidth open={isOpen} className={styles.dialog}>
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontWeight: '700', color: '#00769e', fontSize: '14px' }}>
            {selectedDriverMap ? 'Update Driver Mapping' : 'Add new Driver Mapping'}{' '}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <CustomSelect
              margin='dense'
              label='Driver ID'
              items={[selectedDriverMap?.driverID, ...driverIDsList]}
              defaultValue={selectedDriverMap?.driverID ?? ''}
              {...register('driverID')}
              error={errors?.driverID}
              helperText={errors?.driverID?.message}
            />

            <CustomSelect
              margin='dense'
              label='Vehicle No.'
              disabled={selectedDriverMap ? true : false}
              items={[selectedDriverMap?.vehicleNumber, ...vehicleNoList]}
              defaultValue={selectedDriverMap?.vehicleNumber ?? ''}
              {...register('vehicleNumber')}
              error={errors?.vehicleNumber}
              helperText={errors?.vehicleNumber?.message}
            />

            <Box className={styles.buttons} mt={1}>
              <CustomButton category='Cancel' onClick={onReset}></CustomButton>
              <Box px={1} />
              <CustomButton loading={isButtonLoad} category='Save' type='submit' />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeactivateDriverMap}>
        <DialogTitle className={styles.dialog}>
          <Typography component='h6'>
            {`Are you sure you want to delete `}
            <b>{selectedDriverMap?.driverID?.toUpperCase()}</b> {`?`}
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ p: '0px 24px 15px' }}>
          <CustomButton
            category='No'
            onClick={() => {
              setIsDeactivateDriverMap(false);
              setSelectedDriverMap(null);
            }}
          />
          <CustomButton
            category='Yes'
            onClick={handleDeleteDriverMap}
            loading={isButtonLoad}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriverMapping;
