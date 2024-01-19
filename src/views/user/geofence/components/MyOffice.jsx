import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { createUseStyles } from 'react-jss';
import CustomIconButton from '../../../components/buttons/CustomIconButton';
import { useDispatch } from 'react-redux';
import {
  updateCenter,
  updateMarkers,
  updateToast
} from '../../../../app/redux/action/action';
import DataTables from '../../../components/customized/DataTables';
import CustomButton from '../../../components/buttons/CustomButton';
import { useForm } from 'react-hook-form';
import Geocode from 'react-geocode';
import SaveIcon from '@mui/icons-material/Save';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import GoogleSearchBox from '../../../components/maps/GoogleSearchBox';
import { Edit } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  DeleteMyOfficeLandmarkService,
  AddNewMyOfficeLandmarkService,
  getMyOfficeLandmarkDetailsService,
  UpdateMyOfficeLandmarkService
} from '../services/GeofenceServices';
import CustomTextField from '../../../components/customized/CustomTextField';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY);

const useStyles = createUseStyles({
  tabs: {
    '& .MuiTabs-indicatorSpan': {
      justifyContent: 'center !important',
      display: 'flex !important',
      maxWidth: '40px !important',
      width: '50% !important'
    }
  },
  tab: {
    textTransform: 'none !important',
    fontSize: '12px !important',
    fontWeight: '600 !important',
    '&.Mui-selected': {
      color: '#000 !important'
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
  filterHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00769E',
    color: '#FFF'
  },
  helpText: {
    fontSize: '12px !important'
  },
  searchBox: {
    width: '100% !important'
  }
});

const MyOffice = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // component state
  const [rows, setRows] = useState([]);
  const [address, setAddress] = useState('');
  const [autoCompleteLatLng, setAutoCompleteLatLng] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState(false);

  // form validation schema
  const schema = yup.object().shape({
    location: yup.string().required('Enter Location'),
    name: yup
      .string()
      .required('Enter Your Office Name')
      .min(4, 'Office name should be at least 4 characters')
      .max(50, 'Office name cannot exceed more than 50 characters')
  });

  // get methods from hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue
  } = useForm({ resolver: yupResolver(schema) });

  // function to handle view my office
  const handleView = ({ row }) => {
    const office = {
      id: 1,
      lat: row?.latitude,
      lng: row?.longitude,
      info: [`Office name : ${row?.officeName}`],
      deviceType: 'office'
    };
    dispatch(updateMarkers([office]));
    dispatch(updateCenter({ lat: office?.lat, lng: office?.lng }));
  };

  // component for my office action
  const Actions = params => (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
      <CustomIconButton category='View' onClick={() => handleView(params)} />
      <CustomIconButton
        category='Edit'
        onClick={() => {
          setIsUpdate(true);
          setSelectedOffice(params?.row);
          let {
            row: { officeName, latitude: lat, longitude: lng, location }
          } = params;
          setAddress(location);
          setAutoCompleteLatLng({ lat, lng });
          setValue('location', location);
          setValue('latitude', lat);
          setValue('longitude', lng);
          setValue('name', officeName);
          setIsAdd(true);
        }}
      />
      <CustomIconButton
        category='Delete'
        onClick={() => {
          setSelectedOffice(params?.row);
          setIsDelete(true);
        }}
      />
    </Box>
  );

  // my office data grid column definition
  const columns = [
    {
      field: 'officeName',
      headerName: 'My office Name',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      minWidth: 150
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      renderCell: Actions
    }
  ];

  // function to get my office details
  const getMyOfficeDetails = async () => {
    setIsLoading(true);
    let res = await getMyOfficeLandmarkDetailsService({ officeOrLandmark: 'office' });
    if (res?.status === 200) {
      let {
        data: { data }
      } = res;
      setRows(data);
    } else {
      dispatch(updateToast({ show: true, message: 'Network error', severity: 'error' }));
    }
    setIsLoading(false);
  };

  // function to delete a office
  const deleteMyoffice = async landmark => {
    setIsLoading(true);
    let res = await DeleteMyOfficeLandmarkService({
      landmark,
      officeOrLandmark: 'office'
    });
    if (res?.status === 200) {
      dispatch(
        updateToast({ show: true, message: 'Deleted succssfully', severity: 'success' })
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
    setIsDelete(false);
    resetOffice();
    setIsLoading(false);
  };

  // function to reset the form validation
  const resetOffice = () => {
    setAutoCompleteLatLng(null);
    setAddress('');
    setSelectedOffice(null);
    reset(formValues => ({ ...formValues, name: '' }));
    setIsAdd(false);
    setIsUpdate(false);
    getMyOfficeDetails();
  };

  // function to add or update office
  const onSubmit = async payload => {
    setIsLoading(true);
    payload = {
      ...payload,
      location: address,
      latitude: autoCompleteLatLng?.lat,
      longitude: autoCompleteLatLng?.lng
    };
    if (isUpdate) {
      let res = await UpdateMyOfficeLandmarkService({
        ...payload,
        officeOrLandmark: 'office'
      });

      if (res && res?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: 'Office updated successfully',
            severity: 'success'
          })
        );
      } else if (res && res?.status === 409) {
        dispatch(
          updateToast({
            show: true,
            message: 'New data should not be previous data',
            severity: 'error'
          })
        );
      } else {
        dispatch(
          updateToast({ show: true, message: 'Something went wrong', severity: 'error' })
        );
      }
    } else {
      let res = await AddNewMyOfficeLandmarkService({
        ...payload,
        officeOrLandmark: 'office',
        id: 1
      });
      if (res && res?.status === 201) {
        dispatch(
          updateToast({
            show: true,
            message: 'Office added successfully',
            severity: 'success'
          })
        );
      } else if (res && res?.status === 409) {
        dispatch(
          updateToast({
            show: true,
            message: 'New data should not be previous data',
            severity: 'error'
          })
        );
      } else {
        dispatch(
          updateToast({ show: true, message: 'Something went wrong', severity: 'error' })
        );
      }
    }
    resetOffice();
    setIsLoading(false);
  };

  // Prevent the default Enter key behavior for the google searchbox component
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    getMyOfficeDetails();
    return () => dispatch(updateMarkers([]));
  }, []);

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '378px' }}>
      {isAdd ? (
        <Box>
          <CustomIconButton
            category='Info'
            size='small'
            onClick={() => setIsHelp(true)}
          />
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              justifyContent: 'center'
            }}
            p={1}
          >
            <GoogleSearchBox
              setAddress={setAddress}
              onKeyPress={handleKeyPress}
              focus={focus}
              address={address ? address : ''}
              setAutoCompleteLatLng={setAutoCompleteLatLng}
              {...register('location')}
              className={styles.searchBox}
              onChange={e => {
                setValue('location', e.target.value);
                clearErrors('location');
                if (e.target.value.length < 1) {
                  setFocus(true);
                  setAutoCompleteLatLng(null);
                  setAddress(null);
                  reset(formValues => ({
                    ...formValues,
                    latitude: null,
                    longitude: null
                  }));
                }
              }}
              onClick={() => {
                setValue('location', address);
                clearErrors('location');
              }}
              error={Boolean(errors?.location)}
              helperText={errors?.location?.message}
            />

            <CustomTextField
              type='text'
              {...register('latitude')}
              inputProps={{ readOnly: true }}
              label='Latitude'
              value={autoCompleteLatLng?.lat ?? ''}
              error={Boolean(errors?.latitude)}
              helperText={errors?.latitude?.message}
            />

            <CustomTextField
              type='text'
              {...register('longitude')}
              inputProps={{ readOnly: true }}
              label='Longitude'
              value={autoCompleteLatLng?.lng ?? ''}
              error={Boolean(errors?.longitude)}
              helperText={errors?.longitude?.message}
            />

            <CustomTextField
              type='text'
              disabled={isUpdate}
              defaultValue={selectedOffice?.officeName ?? ''}
              {...register('name')}
              error={Boolean(errors?.name)}
              helperText={errors?.name?.message}
              label='Your office Name'
            />

            <Box sx={{ textAlign: 'center' }} mt={1}>
              <CustomButton
                category='Cancel'
                sx={{ marginRight: '10px' }}
                onClick={resetOffice}
              />
              <CustomButton
                category={isUpdate ? 'Update' : 'Save'}
                type='submit'
                loading={isLoading}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box p={1}>
            <CustomIconButton category='Add' onClick={() => setIsAdd(true)} />
          </Box>
          <Box sx={{ overflowY: 'scroll' }} pl={1}>
            <DataTables
              loading={isLoading}
              rows={rows}
              columns={columns}
              pageSize={3}
              rowsPerPageOptions={[3]}
            />
          </Box>
        </Box>
      )}

      <Dialog open={isHelp}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }} p={1}>
          <CustomIconButton
            category='Close'
            size='small'
            onClick={() => setIsHelp(false)}
          />
        </Box>
        <DialogContent>
          <Box sx={{ overflowY: 'scroll' }} p={1}>
            <Box>
              <Typography sx={{ fontSize: '13px', marginLeft: 1 }}>View</Typography>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    To <code>View</code> Click on the Create Tab under My Office
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '13px', marginLeft: 1 }}>Edit</Typography>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    To <code>Edit</code> My Office Details, by click
                    <Edit sx={{ width: '16px' }} /> Icon in the Table
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    To <code>Save</code> the Changed My Office Details, by click
                    <SaveIcon sx={{ width: '16px' }} /> Icon in the Table
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: '13px', marginLeft: 1 }}>Block</Typography>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    To <code>Block</code> My Office Details, by click
                    <BlockIcon sx={{ width: '16px' }} /> Icon in the Table
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '13px', p: 1, color: '#00769E' }}>
                To Create My Office:-
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    Press <code>Plot Lat/Lng</code> Button
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    Click on Map to plot the latitude and longitude
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon color='#00769E' sx={{ width: '15px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
                  <Typography className={styles.helpText}>
                    After Drawn <DeleteIcon sx={{ width: '16px' }} /> Icon will available
                    in map, you can <code>delete</code> by clicking it or To
                    <SaveIcon sx={{ width: '16px' }} /> Save the My Office, by clicking
                    <code>Save</code> Button
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={isDelete}>
        <DialogTitle>
          <Typography>
            {`Are you sure want to delete `}
            <b>{selectedOffice?.name}</b>
            {`?`}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <CustomButton
            category='No'
            onClick={() => {
              setIsDelete(false);
              resetOffice();
            }}
          />
          <CustomButton
            category='Yes'
            loading={isLoading}
            onClick={() => {
              deleteMyoffice(selectedOffice?.officeName);
            }}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyOffice;
