import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  DialogActions
} from '@mui/material';
import DataTables from '../../components/customized/DataTables';
import {
  AddGeofenceService,
  AllGeofencesService,
  DeactivateGeofenceService,
  UpdateGeofenceService
} from './services/GeofenceServices';
import { createUseStyles } from 'react-jss';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import CustomButton from '../../components/buttons/CustomButton';
import { DrawingManager, Polygon } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { updateMarkers, updateToast, updateZoom } from '../../../app/redux/action/action';
import { useDispatch } from 'react-redux';
import { updateCenter } from '../../../app/redux/action/action';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import CustomTextField from '../../components/customized/CustomTextField';
import { calculateCenter, calculateZoom } from '../../../utils/CommonFunctions';

const useStyles = createUseStyles({
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  }
});

const PolygonGeofence = () => {
  // component styles
  const styles = useStyles();

  // element reference
  const drawingManagerRef = useRef();
  const polygonRefs = useRef([]);
  const activePolygonIndex = useRef();

  // function to dispatch state
  const dispatch = useDispatch();

  // initial state for polygon
  const initialPolygonOptions = {
    fillColor: '#000',
    strokeColor: '#000',
    fillOpacity: 0.5,
    strokeWeight: 2,
    editable: true,
    draggable: true,
    zindex: 1
  };

  // component state
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isDrawPolygon, setIsDrawPolygon] = useState(false);
  const [polygons, setPolygons] = useState([]);
  const [mode, setMode] = useState('create');
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [isShowDeactivate, setIsShowDeactivate] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [polygonOptions, setPolygonOptions] = useState(initialPolygonOptions);

  // state for form validation
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setValue
  } = useForm();

  // drawing manager options
  const drawingManagerOptions = {
    polygonOptions,
    drawingControl: true,
    drawingControlOptions: {
      position: window.google?.maps?.ControlPosition?.TOP_CENTER,
      drawingModes: [window.google?.maps?.drawing?.OverlayType?.POLYGON]
    }
  };

  // function to click on edit
  const handleEditClick = data => {
    let { latAndLongDetails, shapeColor, geozoneID } = data;
    setPolygons([latAndLongDetails]);
    setPolygonOptions(prev => ({
      ...prev,
      fillColor: shapeColor,
      editable: true,
      draggable: true
    }));
    setMode('update');
    setSelectedPolygon(geozoneID);

    let totalLat = 0.0;
    let totalLng = 0.0;

    let avgLat = latAndLongDetails.map(x => x.lat);
    let avgLng = latAndLongDetails.map(x => x.lng);

    avgLat.pop();
    avgLng.pop();

    for (let i = 0; i < avgLat.length; i++) {
      totalLat += avgLat[i];
    }
    for (let i = 0; i < avgLng.length; i++) {
      totalLng += avgLng[i];
    }

    let devideLat = totalLat / avgLng.length;
    let devideLng = totalLng / avgLng.length;

    dispatch(updateCenter(latAndLongDetails[0]));
    dispatch(updateCenter({ lat: devideLat, lng: devideLng }));

    let zoom = calculateZoom(latAndLongDetails);
    dispatch(updateZoom(zoom));
    setValue('shapeColor', shapeColor);
    setIsOpen(true);
  };

  // function to deactivate polygon geofence
  const handleDeactivate = useCallback(async () => {
    setIsShowDeactivate(false);
    let { status, message } = await DeactivateGeofenceService({
      ...selectedPolygon,
      category: 'polygon'
    });
    if (status === 200)
      dispatch(updateToast({ show: true, message, severity: 'success' }));
    else dispatch(updateToast({ show: true, message, severity: 'error' }));
    getAllPolygonGeofences();
  });

  // action component
  const Actions = ({ row }) => (
    <Box sx={{ width: '40%', display: 'flex', justifyContent: 'space-evenly' }}>
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
          setSelectedPolygon({ geozoneID });
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
      minWidth: 250,
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
      field: '',
      headerName: 'Action',
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: Actions
    }
  ];

  // function to click on view
  const handleViewClick = data => {
    let { geozoneID, latAndLongDetails, shapeColor } = data;
    let zoom = calculateZoom(latAndLongDetails);
    dispatch(updateZoom(zoom));
    let center = calculateCenter(latAndLongDetails);
    dispatch(updateCenter(center));
    setMode('view');
    setPolygonOptions(prev => ({
      ...prev,
      fillColor: shapeColor,
      draggable: false,
      editable: false
    }));
    setPolygons([latAndLongDetails]);
    setSelectedPolygon(geozoneID);
    setIsOpen(true);
  };

  // function to get all polygon geofences
  const getAllPolygonGeofences = useCallback(async () => {
    setIsLoading(true);
    let {
      data: { data },
      status
    } = await AllGeofencesService({ type: 'polygon' });
    if (status === 200 && data?.length > 0) {
      let polygonGeofences = data?.map((geofence, index) => ({
        ...geofence,
        id: index + 1
      }));
      setRows(polygonGeofences);
    }
    setIsLoading(false);
  });

  // function to load drawing manager
  const onLoad = drawingManager => (drawingManagerRef.current = drawingManager);

  // callback function when completed draw the polygon
  const onOverlayComplete = $overlayEvent => {
    drawingManagerRef.current.setDrawingMode(null);
    if ($overlayEvent.type === window.google.maps.drawing.OverlayType.POLYGON) {
      const newPolygon = $overlayEvent.overlay
        .getPath()
        .getArray()
        .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay?.setMap(null);
      setPolygons([...polygons, newPolygon]);
    }
  };

  // get paths when draw the polygon
  const getPaths = polygon => {
    let polygonBounds = polygon.getPath();
    let bounds = [];
    for (let i = 0; i < polygonBounds.length; i++) {
      let point = {
        lat: polygonBounds.getAt(i).lat(),
        lng: polygonBounds.getAt(i).lng()
      };
      bounds.push(point);
    }
    polygons.push(bounds);
    setIsDrawPolygon(false);
  };

  // function to load polygon
  const onLoadPolygon = (polygon, index) => (polygonRefs.current[index] = polygon);

  // function to handle click on the polygon
  const onClickPolygon = index => (activePolygonIndex.current = index);

  // function to edit polygon
  const onEditPolygon = index => {
    const polygonRef = polygonRefs.current[index];
    if (polygonRef) {
      const coordinates = polygonRef
        .getPath()
        .getArray()
        .map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }));
      const allPolygons = [...polygons];
      allPolygons[index] = coordinates;
      setPolygons(allPolygons);
    }
  };

  // function to submit geofence form
  const onSubmitGeofence = async payload => {
    setIsLoading(true);
    payload = {
      ...payload,
      geoType: 'polygon',
      latAndLong: polygons[0]
    };
    if (mode === 'create') {
      let {
        status,
        data: { message }
      } = await AddGeofenceService(payload);
      if (status === 201)
        dispatch(updateToast({ show: true, message, severity: 'success' }));
      else dispatch(updateToast({ show: true, message, severity: 'error' }));
      setPolygonOptions(initialPolygonOptions);
      setPolygons([]);
      setIsDrawPolygon(false);
    } else {
      let {
        status,
        data: { message }
      } = await UpdateGeofenceService({ ...payload, geozoneID: selectedPolygon });
      if (status === 201) {
        dispatch(updateToast({ show: true, message, severity: 'success' }));
        setMode('create');
        setPolygonOptions(initialPolygonOptions);
        setPolygons([]);
        setIsDrawPolygon(false);
      } else {
        dispatch(updateToast({ show: true, message, severity: 'error' }));
        setMode('create');
        setPolygonOptions(initialPolygonOptions);
        setPolygons([]);
        setIsDrawPolygon(false);
      }
    }
    getAllPolygonGeofences();
    setIsLoading(false);
    setIsOpen(false);
  };

  useEffect(() => {
    getAllPolygonGeofences();
    return () => {
      dispatch(updateMarkers([]));
      dispatch(updateCenter({ lat: 13.0827, lng: 80.2707 }));
    };
  }, []);

  return (
    <Box sx={{ height: '100vh' }} p={1}>
      <Box sx={{right:5 ,position:'fixed',zIndex:99}}>
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
            {mode === 'create'
              ? 'Create Polygon Geofence'
              : mode === 'view' || mode === 'update'
              ? selectedPolygon
              : null}
          </Typography>
          <CustomIconButton
            category='Close'
            size='small'
            variant='circular'
            onClick={() => {
              setIsOpen(false);
              setMode('create');
              setPolygonOptions(initialPolygonOptions);
              setPolygons([]);
              setIsDrawPolygon(false);
            }}
          />
        </DialogTitle>
        <DialogContent sx={{ height: '100vh', width: '100%', position: 'relative' }}>
          <GoogleMapComponent>
            {mode !== 'view' && (
              <Card sx={{ position: 'absolute', top: '10%', left: '1%', padding: 1 }}>
                {mode === 'create' && (
                  <CustomButton
                    category='Plot Lat/Lng'
                    onClick={() => {
                      setPolygons([]);
                      setIsDrawPolygon(true);
                    }}
                  />
                )}

                {polygons?.length > 0 && mode !== 'view' && (
                  <Box component='form' onSubmit={handleSubmit(onSubmitGeofence)}>
                    <Grid
                      container
                      sx={{
                        fontSize: '12px !important'
                      }}
                    >
                      {mode === 'create' && (
                        <Grid item lg={12} md={12} sm={12} xs={12} py={1}>
                          <CustomTextField
                            type='text'
                            label='Geofence ID'
                            {...register('geozoneID', {
                              required: true
                            })}
                          />
                        </Grid>
                      )}
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <CustomTextField
                          type='color'
                          {...register('shapeColor')}
                          onChange={e =>
                            setPolygonOptions(prev => ({
                              ...prev,
                              fillColor: e.target.value
                            }))
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
                          disabled={!isValid}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Card>
            )}

            {isDrawPolygon && (
              <DrawingManager
                onLoad={onLoad}
                onOverlayComplete={onOverlayComplete}
                drawingMode='polygon'
                options={drawingManagerOptions}
                onPolygonComplete={value => getPaths(value)}
              />
            )}

            {polygons?.length > 0 &&
              polygons?.map((iterator, index) => (
                <Polygon
                  key={index}
                  onLoad={event => onLoadPolygon(event, index)}
                  onMouseDown={() => onClickPolygon(index)}
                  onMouseUp={() => onEditPolygon(index)}
                  onDragEnd={() => onEditPolygon(index)}
                  options={polygonOptions}
                  paths={iterator}
                />
              ))}
          </GoogleMapComponent>
        </DialogContent>
      </Dialog>

      <Dialog open={isShowDeactivate} onClose={() => setIsShowDeactivate(false)}>
        <DialogTitle>
          <Typography component='h6'>
            {`Are you sure want to ${isActive ? 'deactivate' : 'activate'} `}
            <b>{selectedPolygon?.geozoneID}</b> {`?`}
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

export default PolygonGeofence;
