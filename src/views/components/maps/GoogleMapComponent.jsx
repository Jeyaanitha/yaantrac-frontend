import React, { useCallback, useRef, memo, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Box } from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import TerrainIcon from '@mui/icons-material/Terrain';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import Maploader from '../loaders/Maploader';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { createUseStyles } from 'react-jss';
import { calculateCenter, calculateZoom } from '../../../utils/CommonFunctions';

const libraries = ['places', 'drawing'];
const containerStyle = {
  width: '100%',
  height: '100%'
};

const useStyles = createUseStyles({
  button: {
    '& .css-n8s172-MuiButtonBase-root-MuiFab-root-MuiSpeedDial-fab': {
      height: '40px !important',
      width: '40px !important',
      backgroundColor: '#00769E',
      boxShadow: 'aliceblue'
    },
    '& .css-ov2dmt-MuiSpeedDial-root': {
      bottom: '12px',
      right: '3px'
    }
  }
});

const GoogleMapComponent = ({ children, handleMapClick }) => {
  const {
    center = { lat: 13.0827, lng: 80.2707 },
    zoom = 10,
    markers
  } = useSelector(state => state.reducers);
  const ref = useRef(null);
  const styles = useStyles();
  const [defaultZoom, setDefaultZoom] = useState(zoom);
  const [defaultCenter, setDefaultCenter] = useState(center);
  const [mapOptions, setMapOptions] = useState('roadmap');
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [icon, setIcon] = useState(true);

  //state for terrain and hybrid
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries
  });

  const cameraOptions = {
    tilt: 0,
    heading: 0,
    minZoom: 1,
    maxZoom: 20
  };

  // speedial menu
  const speedDialActions = [
    icon
      ? { icon: <SatelliteAltIcon />, name: 'Satellite', id: `satellite` }
      : { icon: <MyLocationIcon />, name: 'Map', id: `roadmap` },
    icon
      ? { icon: <TerrainIcon />, name: 'Terrain', id: 'terrain' }
      : { icon: <PhotoAlbumIcon />, name: 'Labels', id: 'hybrid' }
  ];

  // handle SpeedDial open and close
  const handleSpeedDial = () => setSpeedDialOpen(!speedDialOpen);

  // function to handle map style change
  const handleMapStyleChange = mapId => {
    if (
      (mapId === 'satellite' && mapOptions === 'roadmap') ||
      (mapId === 'satellite' && mapOptions === 'terrain') ||
      (mapId === 'hybrid' && mapOptions === 'hybrid')
    ) {
      setMapOptions('satellite');
      setIcon(false);
    }
    if (mapId === 'terrain' && mapOptions === 'roadmap') {
      setMapOptions('terrain');
    }
    if (
      (mapId === 'terrain' && mapOptions === 'terrain') ||
      (mapId === 'roadmap' && mapOptions === 'satellite') ||
      (mapId === 'roadmap' && mapOptions === 'hybrid')
    ) {
      setMapOptions('roadmap');
      setIcon(true);
    }
    if (mapId === 'hybrid' && mapOptions === 'satellite') {
      setMapOptions('hybrid');
    }
  };

  // function to update center when dragging map
  const onDragEnd = useCallback(() => {
    if (ref?.current) {
      let newCenter = {
        lat: ref?.current?.state?.map?.center?.lat(),
        lng: ref?.current?.state?.map?.center?.lng()
      };
      setDefaultCenter(newCenter);
    }
  }, []);

  // function to update zoom level
  const onZoomChanged = useCallback(
    throttle(() => {
      if (ref?.current) {
        const newZoom = ref?.current?.state?.map?.getZoom();
        const newCenter = ref?.current?.state?.map?.getCenter();
        setDefaultZoom(newZoom);
        setDefaultCenter(newCenter);
      }
    }, 200),
    []
  );

  useEffect(() => {
    if (markers?.length > 0) {
      calculateCenter(markers);
      calculateZoom(markers);
    }
  }, []);

  if (!isLoaded) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Maploader />
      </Box>
    );
  }

  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      ref={ref}
      mapContainerStyle={containerStyle}
      options={{
        ...cameraOptions,
        zoom: defaultZoom,
        center: defaultCenter,
        streetViewControl: false,
        mapId: 'a972a9916abeacdb',
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        mapTypeId: mapOptions,
        mapTypeControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        }
      }}
      onDragEnd={onDragEnd}
      onZoomChanged={onZoomChanged}
      onClick={handleMapClick}
    >
      <SpeedDial
        className={styles.button}
        ariaLabel='SpeedDial for Map Options'
        sx={{ position: 'absolute', bottom: '10px', right: '1px', size: 'medium' }}
        icon={<SpeedDialIcon openIcon={<VisibilityIcon />} />}
        open={speedDialOpen}
        onOpen={handleSpeedDial}
        onClose={handleSpeedDial}
      >
        {speedDialActions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleMapStyleChange(action.id)}
          />
        ))}
      </SpeedDial>
      {children}
    </GoogleMap>
  );
};

export default memo(GoogleMapComponent);
