import React, { useEffect, useState } from 'react';
import { convert, convert2, getDates, getMinDate } from '../../../utils/CommonFunctions';
import { DeviceListService, FuelRefillReportService } from './services/ReportServices';
import Report from './components/Report';
import { updateToast } from '../../../app/redux/action/action';
import { useDispatch } from 'react-redux';

const FuelRefillReport = ({ isLive }) => {
  // component state
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [devices, setDevices] = useState();

  const dispatch = useDispatch();

  // function to get fuel refill report data
  const getFuelRefillReport = params => {
    setIsLoading(true);
    setDetails(params);
    let { startDate, endDate } = params;
    let param = `startdate=${startDate}&enddate=${endDate}`;

    FuelRefillReportService(param)
      .then(({ data, status }) => {
        if (status === 200) {
          let columns = [];
          let getData = data ? data?.data?.fuelRefillReport : [];
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
                  item[convert2(item2?.date)] = parseFloat(item2.fuelRefill).toFixed(2);
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

            // filtering data in the dropdown
            let filterArr = cumulative?.filter(item => item?.deviceID === selectedDevice);

            // set row data & column data
            setColumnDef(columns);
            setRowDef(filterArr);

            if (filterArr.length === 0) {
              dispatch(
                updateToast({
                  show: true,
                  message: 'No Data Found!',
                  severity: 'warning'
                })
              );
              setColumnDef([]);
            } else {
              dispatch(
                updateToast({
                  show: true,
                  message: 'Data Fetched Successfully !',
                  severity: 'success'
                })
              );
            }
          }
          setIsLoading(false);
        } else {
          dispatch(
            updateToast({
              show: true,
              message: data,
              severity: 'error'
            })
          );
          setIsLoading(false);
          setColumnDef([]);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    let payload = {
      deviceID: 'selectAll',
      startDate: convert(getMinDate(new Date())),
      endDate: convert(new Date())
    };
    getFuelRefillReport(payload);
  }, []);

  const onSubmit = data => {
    let payload = {
      startDate: convert(data.fromDate),
      endDate: convert(data.toDate)
    };
    console.log('DATA', payload);
    getFuelRefillReport(payload);
  };

  //get device list
  useEffect(() => {
    DeviceListService()
      .then(({ data, status }) => {
        if (status === 200) {
          setDevices(data);
          console.log('fuel usage', data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Report
      title='Fuel Refill Report'
      devices={devices}
      rowDef={rowDef}
      isLive={isLive}
      columnDef={columnDef}
      onSubmit={onSubmit}
      isLoading={isLoading}
      details={details}
      setSelectedDevice={setSelectedDevice}
    />
  );
};

export default FuelRefillReport;
