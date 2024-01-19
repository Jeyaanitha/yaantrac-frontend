import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  inputLabelClasses
} from '@mui/material';
import CustomIconButton from '../../../../components/buttons/CustomIconButton';
import GoogleSearchBox from '../../../../components/maps/GoogleSearchBox';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../../../../app/redux/action/action';
import { updateCenter, updateMarkers } from '../../../../../app/redux/action/action';
import { useForm } from 'react-hook-form';
import {
  SearchnearbyAllDeviceService,
  SearchnearbyDeviceIDService,
  DeviceListService
} from '../../services/MapsServices';
import CustomButton from '../../../../components/buttons/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomTextField from '../../../../components/customized/CustomTextField';

const useStyles = createUseStyles({
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
  }
});

const SearchNearby = ({ changeUserAction }) => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // component state
  const [address, setAddress] = useState('');
  const [isSeachFilterLoading, setIsSearchFilterLoading] = useState(false);
  const [devicesList, setDeviceList] = useState([]);
  const [isLocationFilter, setIsLocationFilter] = useState(false);
  const [autoCompleteLatLng, setAutoCompleteLatLng] = useState({});
  const [eVehicle, seteVehicle] = useState('');
  const [radiusValue, setRadiusValue] = useState('');
  let center = { lat: 12.912667777777779, lng: 80.21793777777778 };

  // validation schema
  const schema = yup.object().shape({
    radius: yup
      .string()
      .required('Enter radius')
      .min(1, 'Minimum radius is 1')
      .max(10, 'Maximum radius is 10'),
    searchbox: yup.string().when('vehicle', {
      is: 'All',
      then: sch => sch.required('Enter Location'),
      otherwise: sch => sch
    }),
    vehicle: yup.string().required('Enter vehicle number')
  });

  //form control for Filter
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
    reset
  } = useForm({ resolver: yupResolver(schema) });

  //search nearby devices by device
  const searchNearbyDeviceID = async payload => {
    let {
      data: { data },
      status
    } = await SearchnearbyDeviceIDService(payload);
    if (status === 200) {
      if (data?.length > 0) {
        let newDataSingle = data?.map((item, index) => ({
          id: index,
          lat: item?.latitude,
          lng: item?.longitude,
          info: [`V.R. Number : ${item?.rtoNumber?.toUpperCase()}`],
          deviceType: item?.deviceType
        }));
        let center = { lat: newDataSingle[0]?.lat, lng: newDataSingle[0]?.lng };
        dispatch(updateCenter(center));
        dispatch(updateMarkers(newDataSingle));
        dispatch(
          updateToast({
            show: true,
            message: 'Vehicles Found!',
            severity: 'success'
          })
        );
      } else {
        dispatch(updateCenter(center));
        dispatch(updateMarkers([]));
        dispatch(
          updateToast({
            show: true,
            message: 'No Vehicles Found!',
            severity: 'error'
          })
        );
      }
    }
  };

  // search devices by a location
  const searchAllDevices = async payload => {
    setIsSearchFilterLoading(true);
    let {
      data: { data },
      status
    } = await SearchnearbyAllDeviceService(payload);
    if (status === 200 && data?.length > 0) {
      let newData = data?.map((item, index) => ({
        id: index,
        lat: item?.latitude,
        lng: item?.longitude,
        info: [`V.R. Number : ${item?.rtoNumber?.toUpperCase()}`],
        deviceType: item?.deviceType
      }));
      let center = { lat: newData[0]?.lat, lng: newData[0]?.lng };
      dispatch(updateCenter(center));
      dispatch(updateMarkers(newData));
      setIsSearchFilterLoading(false);
      dispatch(
        updateToast({
          show: true,
          message: 'Vehicles Found!',
          severity: 'success'
        })
      );
    } else {
      dispatch(updateMarkers([]));
      dispatch(
        updateToast({
          show: true,
          message: 'No Vehicles Found!',
          severity: 'error'
        })
      );
      setIsSearchFilterLoading(false);
    }
  };

  // function to submit form
  const onFilterSubmit = params => {
    if (isLocationFilter) {
      let payload = {
        vehiclename: params?.vehicle,
        radius: params?.radius * 1000,
        latitude: autoCompleteLatLng.lat,
        longitude: autoCompleteLatLng.lng
      };
      searchAllDevices(payload);
    } else {
      let payload = {
        vehiclename: params?.vehicle,
        radius: params?.radius * 1000
      };
      searchNearbyDeviceID(payload);
    }
  };

  // function to get device list
  const getDeviceList = async () => {
    let { data, status } = await DeviceListService();
    if (status === 200 && data?.length > 0) {
      setDeviceList(data);
    }
  };

  useEffect(() => {
    dispatch(updateCenter(center));
    getDeviceList();
    return () => {
      dispatch(updateCenter(center));
      dispatch(updateMarkers([]));
    };
  }, []);

  return (
    <Box>
      <Card className={styles.filter}>
        <Box className={styles.filterHeader} px={2}>
          <Typography component='h6' variant='p'>
            Search Nearby Vehicle
          </Typography>
          <CustomIconButton
            category='White Close'
            onClick={() => {
              dispatch(updateMarkers([]));
              changeUserAction(null);
            }}
          />
        </Box>

        {isLocationFilter && (
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.89)'
            }}
            p={2}
          >
            <FormControl
              fullWidth
              onChange={e => {
                setValue('searchbox', e.target.value);
                clearErrors('searchbox');
              }}
            >
              <GoogleSearchBox
                sx={{
                  width: '100% !important',
                  position: 'relative'
                }}
                setAddress={setAddress}
                address={address ? address : ''}
                setAutoCompleteLatLng={setAutoCompleteLatLng}
                {...register('searchbox')}
                error={Boolean(errors?.searchbox)}
                helperText={errors?.searchbox?.message}
              />
            </FormControl>
          </Box>
        )}

        <Box
          component='form'
          px={2}
          onSubmit={handleSubmit(onFilterSubmit)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <FormControl
            fullWidth
            size='small'
            sx={{ textTransform: 'none', fontSize: '12px', marginY: 2 }}
            {...register('vehicle')}
            error={Boolean(errors?.vehicle)}
          >
            <InputLabel
              sx={{
                [`&.${inputLabelClasses.shrink}`]: {
                  color: '#00769e',
                  fontSize: '15px'
                }
              }}
            >
              {'Select vehicle'}
            </InputLabel>
            <Select
              label='Select vehicle'
              size='small'
              id='demo-simple-select'
              value={eVehicle}
              onChange={e => {
                setValue('vehicle', e.target.value);
                clearErrors('vehicle');
                seteVehicle(e.target.value);
              }}
            >
              <MenuItem value='All' onClick={() => setIsLocationFilter(true)}>
                All
              </MenuItem>
              {devicesList.map((device, index) => (
                <MenuItem
                  key={index}
                  value={device}
                  onClick={() => {
                    setAddress('');
                    reset();
                    setIsLocationFilter(false);
                  }}
                >
                  {device?.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.vehicle?.message}</FormHelperText>
          </FormControl>

          <CustomTextField
            sx={{ textTransform: 'none', fontSize: '12px' }}
            label='Radius(KM)'
            value={radiusValue}
            inputProps={{ min: 0, max: 10 }}
            {...register('radius')}
            onChange={e => {
              var value = parseInt(e.target.value, 10);
              if (isNaN(value)) setRadiusValue('');
              else {
                if (value > 10) value = 10;
                setRadiusValue(value);
                clearErrors('radius');
              }
              setValue('radius', value);
            }}
            error={Boolean(errors?.radius)}
            helperText={errors?.radius?.message}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <CustomButton
              category='Search'
              size='small'
              type='submit'
              loading={isSeachFilterLoading}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default SearchNearby;
