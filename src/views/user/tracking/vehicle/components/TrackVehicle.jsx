import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import CustomIconButton from '../../../../components/buttons/CustomIconButton';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';
import { updateCenter, updateMarkers } from '../../../../../app/redux/action/action';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../../components/buttons/CustomButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { convertToLocalDateAndTime } from '../../../../../utils/CommonFunctions';
import { VehicleDashboardDeviceListService } from '../../../dashboard/services/DashboardServices';
import CustomSelect from '../../../../components/customized/CustomSelect';

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

const TrackVehicle = ({ changeUserAction }) => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // component state
  const [isSeachFilterLoading, setIsSearchFilterLoading] = useState(false);
  const [devicesList, setDeviceList] = useState([]);
  const [eVehicle, seteVehicle] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  let center = { lat: 12.912667777777779, lng: 80.21793777777778 };

  // validation schema
  const schema = yup.object().shape({
    vehicle: yup.string().required('Enter vehicle number')
  });

  //form control for Filter
  const {
    getValues,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit
  } = useForm({ resolver: yupResolver(schema) });

  // function to submit form
  const onFilterSubmit = useCallback(() => {
    setIsSearchFilterLoading(true);
    const token = localStorage.getItem('token');
    const ws = new WebSocket(
      `wss://s6ok4dutt7.execute-api.ap-south-1.amazonaws.com/dev?devId=${eVehicle}&token=${token}`
    );
    setSocket(ws);
    setIsDisabled(true);
  }, [eVehicle]);

  // function to get device list
  const getDeviceList = async () => {
    let res = await VehicleDashboardDeviceListService();
    if (res && res?.status === 200) setDeviceList(res?.data?.data[0]?.movingDevices);
  };

  useEffect(() => {
    dispatch(updateCenter(center));
    getDeviceList();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log(`device ${eVehicle} connected`);
      };

      socket.onmessage = event => {
        console.log('event', event);
        let {
          vehicle_number,
          latitude,
          longitude,
          speed,
          ignition_offTime,
          ignition_onTime,
          ignition_status,
          total_distance,
          update_time
        } = JSON.parse(event?.data);

        let newData = [
          {
            id: 1,
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
            info: [
              `V.R. Number: ${vehicle_number.toUpperCase()}`,
              `speed: ${speed}`,
              `Ignition Status: ${ignition_status}`,
              `${
                ignition_status === 'OFF'
                  ? `Ignition Off Time: ${convertToLocalDateAndTime(ignition_offTime)}`
                  : `Ignition On Time: ${convertToLocalDateAndTime(ignition_onTime)}`
              }`,
              `Total Distance: ${total_distance}`,
              `Update Time ${convertToLocalDateAndTime(update_time)}`
            ],
            deviceType: 'car'
          }
        ];
        dispatch(updateMarkers(newData));
        setIsSearchFilterLoading(false);
      };

      socket.onclose = () => {
        console.log('connection closed');
        setSocket(null);
        socket.close();
      };
    }

    return () => {
      socket?.close();
      dispatch(updateMarkers([]));
    };
  }, [socket]);

  return (
    <Box>
      <Card className={styles.filter}>
        <Box className={styles.filterHeader} px={2}>
          <Typography component='h6' variant='p'>
            Track Vehicle
          </Typography>
          <CustomIconButton
            category='White Close'
            onClick={() => {
              dispatch(updateMarkers([]));
              changeUserAction(null);
            }}
          />
        </Box>
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
          <CustomSelect
            sx={{ textTransform: 'none', fontSize: '12px', marginY: 2 }}
            error={Boolean(errors?.vehicle)}
            label='Select Moving Vehicle'
            id='demo-simple-select'
            defaultValue={getValues('vehicle') ?? ''}
            value={eVehicle ?? ''}
            onChange={e => {
              setSocket(null);
              setValue('vehicle', e.target.value);
              clearErrors('vehicle');
              seteVehicle(e.target.value);
            }}
            helperText={errors?.vehicle?.message}
            items={devicesList}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <CustomButton
              category='Search'
              size='small'
              type='submit'
              loading={isSeachFilterLoading}
              disabled={isDisabled}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TrackVehicle;
