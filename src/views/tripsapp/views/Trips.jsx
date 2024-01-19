import { useEffect, useState } from 'react';
import DataTables from '../components/DataTables';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import OrderDetails from './components/OrderDetails';
import { createUseStyles } from 'react-jss';
import { Close } from '@mui/icons-material';
import TripsMap from './components/TripsMap';
import { Icon } from '@iconify/react';
import { TripService } from './services/OrderDetailsServies';
import { dateConvert } from '../../../utils/CommonFunctions';

const useStyles = createUseStyles({
  fab: {
    margin: '2px !important',
    backgroundColor: '#00769E !important',
    color: '#FFF !important',
    '&:hover': {
      backgroundColor: '#00769E !important',
      color: '#FFF !important'
    }
  },
  dialog: {
    '& .MuiDialog-container': {
      padding: '10px !important'
    }
  },
  dialogTitle: {
    display: 'flex !important',
    flexDirection: 'row !important',
    alignItems: 'center !important',
    justifyContent: 'space-between !important'
  },
  dialogContent: {
    height: '100vh !important',
    width: '100% !important',
    position: 'relative !important',
    backgroundColor: '#f1f7f8'
  },
  actionIcons: {
    color: '#59758A',
    fontSize: '25px !important',
    fontWeight: '500'
  }
});

const Trips = () => {
  // component styles
  const styles = useStyles();

  //component state
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [row, setRow] = useState(null);
  const [rows, setRows] = useState([]);

  // function to handle click view orders
  const ViewOrder = ({ row }) => (
    <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-evenly' }}>
      <Tooltip arrow title='View' placement='right'>
        <IconButton onClick={() => handleViewOrder(row)}>
          <Icon
            icon='icon-park-outline:transaction-order'
            className={styles.actionIcons}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );

  // function to handle click track trip
  const TrackTrip = ({ row }) => (
    <Box sx={{ width: '50%', display: 'flex', justifyContent: 'space-evenly' }}>
      <Tooltip arrow title='Track' placement='right'>
        <IconButton
          onClick={() => {
            handleTrackTrip(row);
          }}
        >
          <Icon icon='bx:trip' className={styles.actionIcons} />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const columns = [
    {
      field: 'tripID',
      headerName: 'Trip ID',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'assignedTripId',
      headerName: 'Assigned Trip ID',
      minWidth: 150,
      flex: 1
    },
    {
      field: 'driverName',
      headerName: 'Driver',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'startTimestamp',
      headerName: 'Trip Start At',
      minWidth: 100,
      flex: 1,
      renderCell: ({ value }) => dateConvert(value)
    },
    {
      field: 'endTimestamp',
      headerName: 'Trip End At',
      minWidth: 100,
      flex: 1,
      renderCell: ({ value }) => dateConvert(value)
    },
    {
      field: 'tripTotalDistance_KM',
      headerName: 'Trip Distance(KM)',
      minWidth: 140,
      flex: 1
    },
    {
      field: 'tripTotalDuration_HRS_MIN',
      headerName: 'Trip Duration',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'vehicleNumber',
      headerName: 'Vehicle',
      minWidth: 100,
      flex: 1,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      field: 'orderTotal',
      headerName: 'Total Order',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'ordersDelivered',
      headerName: 'Delivered',
      textAlign: 'center !important',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 100,
      flex: 1
    },
    {
      field: 'viewOrders',
      headerName: 'View Orders',
      minWidth: 100,
      flex: 1,
      renderCell: ViewOrder
    },
    {
      field: 'trackTrip',
      headerName: 'Track Trip',
      minWidth: 100,
      flex: 1,
      renderCell: TrackTrip
    }
  ];

  // function to get trip details
  const getTripDetails = async () => {
    let res = await TripService();
    if (res?.status === 200) {
      let tripRow = res?.data?.data?.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setRows(tripRow);
    }
  };

  useEffect(() => {
    getTripDetails();
  }, []);

  // for view order
  const handleViewOrder = row => {
    setRow(row);
    setIsOpen(true);
    setMode('viewOrder');
  };

  // for track trip
  const handleTrackTrip = row => {
    setRow(row);
    setIsOpen(true);
    setMode('track');
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#EDF1F5', height: '100vh' }}>
      <Typography
        variant='h4'
        sx={{
          marginBottom: '1%',
          fontFamily: 'inter',
          fontWeight: '700',
          fontSize: '16px',
          color: '#26134B'
        }}
      >
        Delivery Tracking
      </Typography>
      <DataTables rows={rows} columns={columns} pageSize={7} rowsPerPageOptions={[7]} />
      <Dialog open={isOpen} className={styles.dialog} fullScreen>
        <DialogTitle className={styles.dialogTitle}>
          <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#00769e' }}>
            {`Trip ID : #${row?.tripID}`}
          </Typography>
          <Fab
            size='small'
            variant='circular'
            className={styles.fab}
            onClick={() => setIsOpen(false)}
          >
            <Close />
          </Fab>
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          {mode === 'viewOrder' ? <OrderDetails tripid={row?.tripID} /> : <TripsMap />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Trips;
