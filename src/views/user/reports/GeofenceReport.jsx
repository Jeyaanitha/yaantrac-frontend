import React, { useEffect, useState } from 'react';
import { convert, convert2, getDates, getMinDate } from '../../../utils/CommonFunctions';
import { DeviceListService, KMReportService } from './services/ReportServices';
import Report from './components/Report';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../../app/redux/action/action';

const GeofenceReport = ({ isLive }) => {
  // component state
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState();
  const [selectedDevice, setSelectedDevice] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLive) {
      let data;
      if (data?.fromDate?.length) {
        onSubmit(data);
      } else {
        data = {
          fromDate: 'Fri Jan 01 2021 00:00:00 GMT+0530 (India Standard Time)',
          toDate: 'Fri Jan 10 2021 00:00:00 GMT+0530 (India Standard Time)'
        };
        onSubmit(data);
      }
    }
  }, []);

  //
  useEffect(() => {
    console.log('useEffect row', rowDef);
  }, [rowDef]);

  useEffect(() => {
    console.log('useEffect selectedDevice', selectedDevice);
  }, [selectedDevice]);

  // function to get Geofencereport data
  const getGeofenceReport = params => {
    setIsLoading(true);
    setDetails(params);
    let { startDate, endDate } = params;
    let param = `startdate=${startDate}&enddate=${endDate}`;

    KMReportService(param)
      .then(({ data, status }) => {
        if (status === 200) {
          let columns = [];
          let getData = data ? data?.data?.G : [];
          let cumulative = data ? data?.data?.cumulative : [];
          let dates = getDates(new Date(startDate), new Date(endDate));

          // assign data to cumulative array
          if (getData?.length > 0 && cumulative?.length > 0) {
            columns.push({
              title: 'Device ID',
              field: 'deviceID',
              headerName: 'Device ID',
              width: 200,
              renderCell: ({ value }) => value?.toUpperCase()
            });

            cumulative.map((item, index) => {
              getData.map(item2 => {
                if (item.deviceID === item2.deviceID) {
                  item[convert2(item2?.date)] = parseFloat(item2.distance).toFixed(2);
                }
                item['id'] = index + 1;
                item.total = parseFloat(item.total).toFixed(2);
                return getData;
              });
              return cumulative;
            });

            // assign '0.00' to missed value for specific date
            dates.map(date => {
              cumulative.map(cum => {
                if (!Object.keys(cum).includes(date)) {
                  cum[date] = '0.00';
                }
                return cumulative;
              });
              return dates;
            });

            // push dates to the columns array
            dates.map(date => {
              columns.push({
                title: date,
                field: date,
                headerName: date,
                width: 200
              });
              return columns;
            });

            // push 'total' to the last index of the columns array
            columns.push({
              title: 'Total',
              field: 'total',
              headerName: 'Total',
              width: 200
            });
            //Device list filter
            // let filterArr = cumulative?.filter(item => item?.deviceID === selectedDevice);

            // set data
            setColumnDef(columns);
            // setRowDef(filterArr);

            setRowDef([
              {
                id: 1
              }
            ]);

            // if (filterArr?.length === 0) {
            //   setSnack(prev => ({
            //     ...prev,
            //     show: true,
            //     message: 'No Data Found!',
            //     severity: 'warning'
            //   }));
            //   setColumnDef([]);
            // } else {
            //   setSnack(prev => ({
            //     ...prev,
            //     show: true,
            //     message: 'Data Fetched Successfully !',
            //     severity: 'success'
            //   }));
            // }
          } else {
            dispatch(
              updateToast({
                show: true,
                message: 'Something Went Wrong !',
                severity: 'warning'
              })
            );
            setColumnDef([]);
          }
        } else {
          dispatch(
            updateToast({
              show: true,
              message: data,
              severity: 'error'
            })
          );
          setColumnDef([]);
        }

        setIsLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    let payload = {
      deviceID: 'selectAll',
      startDate: convert(getMinDate(new Date())),
      endDate: convert(new Date())
    };
    getGeofenceReport(payload);
  }, []);

  const onSubmit = data => {
    let payload = {
      startDate: convert(data.fromDate),
      endDate: convert(data.toDate)
    };
    console.log('DATA', payload);
    getGeofenceReport(payload);
  };

  //get device list
  useEffect(() => {
    DeviceListService()
      .then(({ data, status }) => {
        if (status === 200) {
          setDevices(data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Report
        title={'Geofence Report'}
        devices={devices}
        isLive={isLive}
        rowDef={rowDef}
        columnDef={columnDef}
        onSubmit={onSubmit}
        isLoading={isLoading}
        details={details}
        setSelectedDevice={setSelectedDevice}
      />
    </>
  );
};

export default GeofenceReport;
