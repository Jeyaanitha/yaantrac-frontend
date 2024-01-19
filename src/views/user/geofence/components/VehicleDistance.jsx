import React, { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  DeviceListService,
  LiveVehicleRouteDistanceService
} from '../services/GeofenceServices';
import CustomButton from '../../../components/buttons/CustomButton';
import * as yup from 'yup';
import { updateCenter, updateToast } from '../../../../app/redux/action/action';
import { yupResolver } from '@hookform/resolvers/yup';
import Tables from '../../../components/customized/Tables';
import { useDispatch } from 'react-redux';
import CustomSelect from '../../../components/customized/CustomSelect';

const VehicleDistance = ({
  setLocationToMeasure,
  setIsEnableMarker,
  setIsShowRouteDistance,
  setIsShowRouteMeasure,
  setRouteMeasure,
  data = null
}) => {
  // component state

  const [fromVehicle, setFromVehicle] = useState('');
  const [toVehicle, setToVehicle] = useState('');
  const [devices, setDevices] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // validation schema
  const schema = yup.object().shape({
    fromvehicle: yup.string().required('Select From Vehicle'),
    tovehicle: yup.string().required('Select To Vehicle')
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue
  } = useForm({ resolver: yupResolver(schema) });

  // get data for the table
  let { origin, destination, distance, duration } = data;
  distance = parseFloat(distance / 1000).toFixed(3);
  duration = parseFloat(duration / 60).toFixed(2);

  // row & column definition for the table
  let result = [
    { key: 'Origin', value: origin },
    { key: 'Destination', value: destination },
    { key: 'Distance', value: `${distance} KM` },
    { key: 'Duration', value: `${duration} Mins` }
  ];

  // function to get the vehicle route distance
  const getLiveVehicleRoutingDistance = async payload => {
    setIsLoading(true);
    let {
      data: { data },
      status
    } = await LiveVehicleRouteDistanceService(payload);
    if (status === 200 && data?.length > 0) {
      let source = { lat: data[0]?.latitude, lng: data[0]?.longitude };
      let destination = { lat: data[1]?.latitude, lng: data[1]?.longitude };
      setLocationToMeasure({ source, destination });
      setIsEnableMarker(true);
      setIsShowRouteDistance(true);
      setIsShowRouteMeasure(true);
    }
    setIsLoading(false);
  };

  // function to get device list
  const getDeviceList = async () => {
    let { data, status } = await DeviceListService();
    if (status === 200) setDevices(data);
  };

  //Submit handle data
  const onSubmit = params => {
    setLocationToMeasure(null);
    setIsEnableMarker(false);
    dispatch(updateCenter({ fromVehicle, toVehicle }));
    const payload = { fromvehicle: params.fromvehicle, tovehicle: params.tovehicle };
    if (payload.fromvehicle === payload.tovehicle) {
      dispatch(
        updateToast({
          show: true,
          message: 'Please Select Different Vehicle',
          severity: 'error'
        })
      );
    } else {
      getLiveVehicleRoutingDistance(payload);
    }
  };

  useEffect(() => {
    getDeviceList();
    setIsEnableMarker(false);
    setRouteMeasure({
      origin: null,
      destination: null,
      distance: null,
      duration: null
    });
  }, []);

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '358px' }}>
      <Card sx={{ boxShadow: 'none' }}>
        <Box p={2}>
          <Box
            component='form'
            sx={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box>
              <CustomSelect
                label='From Vehicle'
                {...register('fromvehicle')}
                error={Boolean(errors?.fromvehicle)}
                value={fromVehicle ? fromVehicle : ''}
                onChange={e => {
                  setValue('fromvehicle', e.target.value);
                  clearErrors('fromvehicle');
                  setFromVehicle(e.target.value);
                }}
                items={devices}
                helperText={errors?.fromvehicle?.message}
              />
            </Box>

            <Box mt={2}>
              <CustomSelect
                label='To Vehicle'
                {...register('tovehicle')}
                error={Boolean(errors?.tovehicle)}
                value={toVehicle ? toVehicle : ''}
                onChange={e => {
                  setValue('tovehicle', e.target.value);
                  clearErrors('tovehicle');
                  setToVehicle(e.target.value);
                }}
                items={devices}
                helperText={errors?.tovehicle?.message}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <CustomButton
                type='submit'
                size='small'
                category='Search'
                loading={loading}
              />
            </Box>
          </Box>

          {data && <Tables data={result} />}
        </Box>
      </Card>
    </Box>
  );
};

export default VehicleDistance;
