import React, { useEffect, useRef, useState } from 'react';
import {
  AddGeofenceService,
  AllGeofencesService,
  DeactivateGeofenceService,
  UpdateGeofenceService
} from './services/GeofenceServices';
import {
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Typography
} from '@mui/material';
import DataTables from '../../components/customized/DataTables';
import { Close } from '@mui/icons-material';
import { createUseStyles } from 'react-jss';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCenter,
  updateCircularGeofence,
  updateZoom,
  updateToast
} from '../../../app/redux/action/action';
import GoogleCircle from '../../components/maps/GoogleCircle';
import CustomButton from '../../components/buttons/CustomButton';
import { DrawingManager } from '@react-google-maps/api';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import CustomTextField from '../../components/customized/CustomTextField';
import { convertKmToMeter, convertMeterToKm } from '../../../utils/CommonFunctions';

const useStyles = createUseStyles({
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  }
});

const CircularGeofence = () => {
  // component styles
  const styles = useStyles();

  // get circular geofence state from store
  const {
    circularGeofence: { center, radius, color }
  } = useSelector(state => state.reducers);
  const dispatch = useDispatch();

  const drawingManagerRef = useRef();

  // validation schema
  const circularGeofenceSchema = yup.object().shape({
    geozoneID: yup
      .string()
      .required('Enter Geofence ID')
      .matches(/^[A-Za-z]/, 'Geofence ID should starts with alphabet')
      .min(4, 'Geofence ID should have minimum of length 5 characters')
      .max(50, 'Geofence ID should have maximum of length 50 characters'),
    radius: yup
      .number()
      .required('Enter radius')
      .typeError('Enter radius')
      .min(1, 'Radius should have minimum of radius 1 kilometre')
      .max(10, 'Radius should have maximum of radius 10 kilometres')
  });

  // get methods to form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({ resolver: yupResolver(circularGeofenceSchema) });

  // initial options for circular geofence
  const initialOptions = {
    fillColor: '#000',
    strokeColor: '#000',
    fillOpacity: 0.5,
    strokeWeight: 2,
    editable: true,
    draggable: true
  };

  // component states
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState('create');
  const [isDrawCircular, setIsDrawCircular] = useState(false);
  const [selectedCircular, setSelectedCircular] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [circularOptions, setCircularOptions] = useState(initialOptions);
  const [isPlotted, setIsPlotted] = useState(false);
  const [isShowDeactivate, setIsShowDeactivate] = useState(false);

  // function to view the geofence
  const handleViewClick = ({ geozoneID, latAndLongDetails, radius, shapeColor }) => {
    let newRadius = radius + radius / 2;
    let scale = newRadius / 500;
    let zoom = parseInt(16 - Math.log(scale) / Math.log(2));
    dispatch(updateZoom(zoom));
    setMode('view');
    setSelectedCircular(geozoneID);
    setCircularOptions(prev => ({ ...prev, editable: false, draggable: false }));
    let circular = { geozoneID, radius, color: shapeColor, center: latAndLongDetails[0] };
    dispatch(updateCircularGeofence(circular));
    dispatch(updateCenter(latAndLongDetails[0]));
    setIsOpen(true);
  };

  // function to edit the geofence
  const handleEditClick = data => {
    let { radius, latAndLongDetails, geozoneID, shapeColor } = data;
    setValue('geozoneID', geozoneID);
    setValue('shapeColor', shapeColor);
    setValue('radius', convertMeterToKm(radius));
    setMode('update');
    setIsPlotted(true);
    setIsOpen(true);
    setSelectedCircular(geozoneID);
    dispatch(
      updateCircularGeofence({
        center: latAndLongDetails[0],
        color: shapeColor,
        radius
      })
    );
    dispatch(updateCenter(latAndLongDetails[0]));
  };

  // drawing manager options
  const drawingManagerOptions = {
    circleOptions: circularOptions,
    drawingControl: false,
    drawingControlOptions: {
      position: window?.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window?.google?.maps?.drawing?.OverlayType?.CIRCLE]
    }
  };

  // callback function when load the drawing manager
  const onLoad = drawingManager => (drawingManagerRef.current = drawingManager);

  // callback function when complete draw the circle
  const onOverlayComplete = overlayEvent => {
    drawingManagerRef.current.setDrawingMode(null);
    if (overlayEvent.type === window.google.maps.drawing.OverlayType.CIRCLE) {
      let newCenter = {
        lat: overlayEvent.overlay.center.lat(),
        lng: overlayEvent.overlay.center.lng()
      };
      let newRadius = overlayEvent.overlay.radius;
      dispatch(updateCenter(newCenter));
      dispatch(
        updateCircularGeofence({ center: newCenter, radius: newRadius, color: '#000' })
      );
      setIsPlotted(true);
      overlayEvent.overlay.setMap(null);
    }
  };

  // component for action
  const Actions = ({ row }) => (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        justifyContent: 'space-evenly'
      }}
    >
      <CustomIconButton category='View' onClick={() => handleViewClick(row)} />
      <CustomIconButton
        category='Edit'
        disabled={row?.isActive === 0}
        onClick={() => handleEditClick(row)}
      />
      <CustomIconButton
        category={row?.isActive === 1 ? 'Deactivate' : 'Activate'}
        onClick={() => {
          let { geozoneID } = row;
          setSelectedCircular({ geozoneID });
          setIsShowDeactivate(true);
          setIsActive(row?.isActive === 1 ? true : false);
        }}
      />
    </Box>
  );

  // column definition
  const columns = [
    {
      field: 'geozoneID',
      headerName: 'Geofence ID',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'shapeColor',
      headerName: 'Color',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => (
        <Box
          sx={{
            backgroundColor: value ? value : '#000',
            height: '80%',
            width: '50%',
            borderRadius: '10px'
          }}
        />
      )
    },
    {
      field: 'radius',
      headerName: 'Radius (KM)',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: ({ value }) => (value ? convertMeterToKm(value) : 'Not Available')
    },
    {
      field: '',
      headerName: 'Action',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: Actions
    }
  ];

  // function to get all circular geofences
  const getAllCircularGeofences = async () => {
    setIsLoading(true);
    let {
      data: { data },
      status
    } = await AllGeofencesService({ type: 'circular' });

    if (status === 200 && data?.length > 0) {
      let circularGeofences = data?.map((geofence, index) => ({
        ...geofence,
        id: index + 1
      }));
      setRows(circularGeofences);
    }
    setIsLoading(false);
  };

  // function to submit add or update geofence
  const onSubmitGeofence = async payload => {
    setIsLoading(true);
    payload = {
      ...payload,
      radius,
      geoType: 'circular',
      latAndLong: [center]
    };

    if (mode === 'create') {
      let {
        status,
        data: { message }
      } = await AddGeofenceService(payload);
      if (status === 201) {
        dispatch(updateToast({ show: true, message, severity: 'success' }));
      } else {
        dispatch(updateToast({ show: true, message, severity: 'error' }));
      }
    } else {
      let {
        status,
        data: { message }
      } = await UpdateGeofenceService({ ...payload, geozoneID: selectedCircular });
      if (status === 201) {
        dispatch(updateToast({ show: true, message, severity: 'success' }));
      } else {
        dispatch(updateToast({ show: true, message, severity: 'error' }));
      }
    }
    setMode('create');
    reset();
    setIsOpen(false);
    setIsLoading(false);
    setIsPlotted(false);
    setIsDrawCircular(false);
    getAllCircularGeofences();
  };

  // function to deactivate geofence
  const handleDeactivate = async () => {
    setIsShowDeactivate(false);
    let { status, message } = await DeactivateGeofenceService({
      ...selectedCircular,
      category: 'circular'
    });
    if (status === 200) {
      dispatch(updateToast({ show: true, message, severity: 'success' }));
    } else {
      dispatch(updateToast({ show: true, message, severity: 'error' }));
    }
    getAllCircularGeofences();
  };

  useEffect(() => {
    getAllCircularGeofences();
  }, []);

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

      <Dialog open={isOpen} className={styles.dialog} fullScreen>
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography component='h5' sx={{ fontWeight: '700', color: '#00769e' }}>
            {mode === 'create' ? 'Create Circular Geofence' : selectedCircular}
          </Typography>
          <Fab
            className='fab'
            size='small'
            variant='circular'
            onClick={() => {
              setIsOpen(false);
              setSelectedCircular(null);
              setMode('create');
              setIsPlotted(false);
              setIsDrawCircular(false);
              reset();
            }}
          >
            <Close />
          </Fab>
        </DialogTitle>
        <DialogContent sx={{ height: '100vh', width: '100%', position: 'relative' }}>
          <GoogleMapComponent>
            {mode !== 'view' && (
              <Card sx={{ position: 'absolute', top: '10%', left: '1%', padding: 1 }}>
                {mode === 'create' && (
                  <CustomButton
                    category='Plot Lat/Lng'
                    onClick={() => setIsDrawCircular(true)}
                  />
                )}

                {isPlotted && (
                  <Box component='form' onSubmit={handleSubmit(onSubmitGeofence)}>
                    <Grid
                      container
                      sx={{
                        fontSize: '12px'
                      }}
                    >
                      {mode === 'create' && (
                        <Grid item lg={12} md={12} sm={12} xs={12} py={1}>
                          <CustomTextField
                            sx={{ width: '100%' }}
                            type='text'
                            label='Geofence ID'
                            error={Boolean(errors?.geozoneID)}
                            helperText={errors?.geozoneID?.message}
                            {...register('geozoneID', {
                              required: true
                            })}
                          />
                        </Grid>
                      )}

                      <Grid item lg={12} md={12} sm={12} xs={12} py={1}>
                        <CustomTextField
                          label='Radius (KM)'
                          autoComplete='off'
                          error={Boolean(errors?.radius)}
                          helperText={errors?.radius?.message}
                          {...register('radius', {
                            required: true,
                            valueAsNumber: true
                          })}
                          onKeyDown={e => {
                            let NumberRegex =
                              /^[a-z-A-Z’/`~!#*$@_%+=.,^&(){}[\]|;:'"”<>?\\]$/;
                            if (NumberRegex.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onChange={e => {
                            dispatch(
                              updateCircularGeofence({
                                center,
                                radius: convertKmToMeter(parseInt(e.target.value)),
                                color
                              })
                            );
                          }}
                        />
                      </Grid>

                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <CustomTextField
                          type='color'
                          {...register('shapeColor')}
                          onChange={e =>
                            dispatch(
                              updateCircularGeofence({
                                center,
                                radius,
                                color: e.target.value
                              })
                            )
                          }
                        />
                      </Grid>

                      <Grid
                        item
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        pt={1}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <CustomButton
                          type='submit'
                          category={mode === 'update' ? 'Update' : 'Save'}
                          loading={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Card>
            )}

            {isDrawCircular && (
              <DrawingManager
                onLoad={onLoad}
                onOverlayComplete={onOverlayComplete}
                drawingMode='circle'
                options={drawingManagerOptions}
              />
            )}

            {(isPlotted || mode === 'view') && <GoogleCircle mode={mode} />}
          </GoogleMapComponent>
        </DialogContent>
      </Dialog>

      <Dialog open={isShowDeactivate} onClose={() => setIsShowDeactivate(false)}>
        <DialogTitle>
          <Typography component='h6'>
            {`Are you sure want to ${isActive ? 'deactivate' : 'activate'} `}
            <b>{selectedCircular?.geozoneID}</b> {`?`}
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

export default CircularGeofence;
