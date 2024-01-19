import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
  Zoom
} from '@mui/material';
import DataTables from '../../components/customized/DataTables';
import { createUseStyles } from 'react-jss';
import SignalStrength from './components/SignalStrength';
import { LiveStatusService } from './services/LiveStatusServices';
import vehicleOnline from '../../../app/images/caronline.png';
import vehicleParked from '../../../app/images/carparked.png';
import vehicleOffline from '../../../app/images/caroffline.png';
import vehicleMoving from '../../../app/images/route.png';
import vehcileIdle from '../../../app/images/caridle.png';
import { convertToLocalDateAndTime } from '../../../utils/CommonFunctions';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../components/maps/GoogleMapMarker';
import { useDispatch } from 'react-redux';
import { updateCenter, updateMarkers } from '../../../app/redux/action/action';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import LiveStatusReports from './components/LiveStatusReports';

const interval = parseInt(process.env.REACT_APP_API_INTERVAL);

const useStyles = createUseStyles({
  firstBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '15px'
  },
  firstBoxTitle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '5px'
  },
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  }
});

const LiveStatus = () => {
  // component styles
  const styles = useStyles();

  // function to dispatch state
  const dispatch = useDispatch();

  // component states
  const [rowDef, setRowDef] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [mapViewOpen, setMapViewOpen] = useState(false);
  const [reportViewOpen, setReportViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // function to get live status data
  const getLiveStatusData = async () => {
    let { data, status } = await LiveStatusService();
    if (status === 200) {
      let rows = [];
      let rowData = data?.data;
      rowData?.length > 0 &&
        rowData?.map((row, index) => {
          row = {
            ...row,
            id: index + 1,
            dayKM: parseFloat(row?.dayKM).toFixed(2),
            lastUpdate: convertToLocalDateAndTime(row?.lastUpdate)
          };
          rows.push(row);
          return rows;
        });
      setRowDef(rows);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getLiveStatusData();

    const timer = setInterval(() => {
      if (!mapViewOpen && !reportViewOpen) getLiveStatusData();
    }, interval);

    return () => clearInterval(timer);
  }, [mapViewOpen, reportViewOpen]);

  // function to render signal strength
  const signal = ({ value }) => <SignalStrength strength={value} />;

  // function to grid actions
  const actions = ({ row }) => {
    let {
      latitude,
      longitude,
      speedKPH,
      lastUpdate,
      vehicleName,
      vehicleStatus,
      deviceType
    } = row;
    const handleMapView = () => {
      dispatch(updateCenter({ lat: latitude, lng: longitude }));
      dispatch(
        updateMarkers([
          {
            lat: latitude,
            lng: longitude,
            info: [
              `V.R.No : ${vehicleName?.toUpperCase()} `,
              `Status : ${vehicleStatus}`,
              `Speed : ${speedKPH}`,
              `Updated At : ${lastUpdate}`
            ],
            deviceType
          }
        ])
      );
      setMapViewOpen(true);
    };

    const handleReportView = () => {
      setSelectedDevice(vehicleName);
      setReportViewOpen(true);
    };

    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
        <CustomIconButton category='Map View' onClick={handleMapView} />
        <CustomIconButton onClick={handleReportView} category='Report View' />
      </Box>
    );
  };

  const columnDef = [
    {
      title: 'Status',
      field: 'vehicleStatus',
      headerName: 'Status',
      align: 'center',
      renderCell: cellValues => {
        if (cellValues.row.vehicleStatus === 'offline') {
          return (
            <Tooltip title='Offline' placement='right' arrow TransitionComponent={Zoom}>
              <img src={vehicleOffline} style={{ height: '35px' }} alt='offline' />
            </Tooltip>
          );
        }
        if (cellValues.row.vehicleStatus === 'online') {
          return (
            <Tooltip title='Online' placement='right' arrow TransitionComponent={Zoom}>
              <img src={vehicleOnline} style={{ height: '35px' }} alt='online' />
            </Tooltip>
          );
        }
        if (cellValues.row.vehicleStatus === 'parked') {
          return (
            <Tooltip title='Parked' placement='right' arrow TransitionComponent={Zoom}>
              <img src={vehicleParked} style={{ height: '35px' }} alt='parked' />
            </Tooltip>
          );
        }
        if (cellValues.row.vehicleStatus === 'moving') {
          return (
            <Tooltip title='Moving' placement='right' arrow TransitionComponent={Zoom}>
              <img src={vehicleMoving} style={{ height: '35px' }} alt='moving' />
            </Tooltip>
          );
        }
        if (cellValues.row.vehicleStatus === 'idle') {
          return (
            <Tooltip title='Idle' arrow TransitionComponent={Zoom} placement='right'>
              <img src={vehcileIdle} style={{ height: '35px' }} alt='idle' />
            </Tooltip>
          );
        }
      },
      flex: 1,
      minWidth: 70
    },
    {
      title: 'V.R.Number',
      field: 'vehicleName',
      headerName: 'V.R.Number',
      flex: 1,
      minWidth: 110,
      renderCell: ({ row: { vehicleName } }) => vehicleName?.toUpperCase()
    },
    {
      title: 'Updated At',
      field: 'lastUpdate',
      headerName: 'Updated At',
      flex: 1,
      minWidth: 160
    },
    {
      title: 'Speed(Km/hr)',
      field: 'speedKPH',
      headerName: 'Speed(Km/hr)',
      flex: 1,
      minWidth: 120
    },
    {
      title: 'Signal',
      field: 'sim_status',
      headerName: 'Signal',
      renderCell: signal,
      flex: 1,
      minWidth: 70
    },
    {
      title: 'Km/Day',
      field: 'dayKM',
      headerName: 'Km/Day',
      flex: 1,
      minWidth: 100
    },
    {
      title: 'Running Time',
      field: 'running_HH_MM',
      headerName: 'Run Time',
      flex: 1,
      minWidth: 100
    },
    {
      title: 'Idle Time',
      field: 'idleTime_DD_HH_MM',
      headerName: 'Idle Time',
      flex: 1,
      minWidth: 100
    },
    {
      title: 'Actions',
      field: 'actions',
      headerName: 'Actions',
      renderCell: actions,
      flex: 1,
      minWidth: 120
    }
  ];

  return (
    <Box>
      <Box p={1}>
        <DataTables
          rows={rowDef}
          columns={columnDef}
          loading={isLoading}
          rowsPerPageOptions={[6]}
        />
      </Box>

      {/* dialog for map view */}
      <Dialog
        open={mapViewOpen}
        onClose={() => setMapViewOpen(false)}
        fullScreen
        className={styles.dialog}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography
            component='h5'
            className='primary'
            sx={{
              fontWeight: '700',
              textTransform: 'capitalize'
            }}
          >
            Vehicle Location on Map
          </Typography>
          <CustomIconButton
            category='Close'
            onClick={() => {
              setMapViewOpen(false);
              dispatch(updateMarkers([]));
            }}
          />
        </DialogTitle>
        <DialogContent
          sx={{ height: '100vh', width: '100%', position: 'relative !important' }}
        >
          <GoogleMapComponent>
            <GoogleMapMarker />
          </GoogleMapComponent>
        </DialogContent>
      </Dialog>

      {/* dialog for report view */}
      <Dialog
        open={reportViewOpen}
        onClose={() => setReportViewOpen(false)}
        fullScreen
        className={styles.dialog}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='h5' className='primary' sx={{ fontWeight: 700 }}>
              View Reports
            </Typography>
            <CustomIconButton category='Close' onClick={() => setReportViewOpen(false)} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <LiveStatusReports selectedDevice={selectedDevice} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LiveStatus;
