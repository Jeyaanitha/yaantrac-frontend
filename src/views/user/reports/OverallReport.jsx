import React, { useEffect, useState, useCallback } from 'react';
import { DeviceListService } from './services/ReportServices';
import Report from './components/Report';
import { convert, getEpochValue, getMinDate } from '../../../utils/CommonFunctions';
import { getOverallReport } from '../report-utils/services/ReportFunctions';
import CustomIconButton from '../../components/buttons/CustomIconButton';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import GoogleMapComponent from '../../components/maps/GoogleMapComponent';
import GoogleMapMarker from '../../components/maps/GoogleMapMarker';
import { useDispatch } from 'react-redux';
import {
  updateCenter,
  updateInfoWindow,
  updateMarkers,
  updateToast
} from '../../../app/redux/action/action';

const OverallReport = () => {
  // function to update state
  const dispatch = useDispatch();

  // component state
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState();
  const [isMapView, setIsMapView] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [docPayload, setDocPayload] = useState(null);

  // function to handle map view
  const handleMapView = row => {
    setSelectedDevice(row);
    let {
      startTime,
      endTme,
      duration,
      distanceTravelled,
      hikeSpeed,
      averageSpeed,
      vehicleStatus,
      latitude: lat,
      longitude: lng
    } = row;
    let info = [
      `Vehicle Status : ${vehicleStatus}`,
      `Start Date & Time : ${startTime}`,
      `End Date & Time : ${endTme}`,
      `Duration : ${duration}`,
      `Distance Travelled : ${distanceTravelled}`,
      `Hike Speed : ${hikeSpeed}`,
      `Average Speed : ${averageSpeed}`
    ];
    dispatch(updateCenter({ lat, lng }));
    dispatch(updateMarkers([{ id: 1, lat, lng, info }]));
    setIsMapView(true);
  };

  // function to render icon button
  const Actions = ({ row }) => {
    return <CustomIconButton category='Map View' onClick={() => handleMapView(row)} />;
  };

  // function to get overall report
  const onSubmit = async data => {
    setIsLoading(true);
    let { deviceID = null } = data;
    let payload = {
      deviceID: deviceID === 'selectAll' ? null : deviceID,
      startDate: getEpochValue(data.startDate),
      endDate: getEpochValue(data.endDate),
      reportType: 'Overall'
    };
    setDocPayload(payload);
    setDetails({ ...payload });
    let {
      snack,
      rows = [],
      columns = [],
      pdfURL,
      excelURL
    } = await getOverallReport(payload);
    columns = [
      ...columns,
      {
        title: 'Actions',
        field: 'actions',
        headerName: 'Actions',
        renderCell: Actions,
        flex: 1,
        minWidth: 80
      }
    ];
    dispatch(updateToast(snack));
    setColumnDef(columns);
    setRowDef(rows);

    let urlData = {
      reportType: 'Overall',
      pdfURL: pdfURL,
      excelURL: excelURL
    };

    setDocPayload(urlData);
    setIsLoading(false);
  };

  // function to close map view
  const handleCloseViewMap = useCallback(() => {
    setIsMapView(false);
  }, []);

  useEffect(() => {
    DeviceListService()
      .then(({ data, status }) => {
        if (status === 200) {
          setDevices(data);
        }
      })
      .catch(() => setDevices([]));
  }, []);

  useEffect(() => {
    let payload = {
      startDate: convert(getMinDate(new Date())),
      endDate: convert(new Date())
    };
    onSubmit(payload);

    return () => {
      dispatch(updateCenter(null));
      dispatch(updateMarkers([]));
      dispatch(updateInfoWindow([]));
    };
  }, []);

  return (
    <>
      <Report
        title='Overall Report'
        rowDef={rowDef}
        columnDef={columnDef}
        onSubmit={onSubmit}
        isLoading={isLoading}
        details={details}
        devices={devices}
        docPayload={docPayload}
      />

      <Dialog
        open={isMapView}
        onClose={handleCloseViewMap}
        fullScreen
        sx={{ padding: '10px !important' }}
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
            component='p'
            className='primary'
          >{`Device ID : ${selectedDevice?.deviceID}`}</Typography>
          <CustomIconButton category='Close' onClick={() => setIsMapView(false)} />
        </DialogTitle>
        <DialogContent sx={{ height: '100vh', width: '100%' }}>
          <GoogleMapComponent>
            <GoogleMapMarker />
          </GoogleMapComponent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OverallReport;
