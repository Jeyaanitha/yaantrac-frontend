import React, { useEffect, useState } from 'react';
import { convert, convert2, getDates } from '../../../utils/CommonFunctions';
import { DeviceListService, MileageReportService } from './services/ReportServices';
import Report from './components/Report';
import { updateToast } from '../../../app/redux/action/action';
import { useDispatch } from 'react-redux';

const MileageReport = ({ isLive }) => {
  // component state
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [devices, setDevices] = useState();

  const dispatch = useDispatch();

  // function to get mileage report data
  const onSubmit = data => {
    setIsLoading(true);
    setDetails(data);
    let startDate = convert(data?.fromDate);
    let endDate = convert(data?.toDate);
    let params = `startdate=${startDate}&enddate=${endDate}`;

    MileageReportService(params)
      .then(({ data, status }) => {
        if (status === 200) {
          let columns = [];
          let getData = data ? data?.data?.mileageReport : [];
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
                  item[convert2(item2?.date)] = parseFloat(item2.mileage).toFixed(2);
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
      title='Mileage Report'
      isLive={isLive}
      rowDef={rowDef}
      columnDef={columnDef}
      onSubmit={onSubmit}
      isLoading={isLoading}
      details={details}
      setSelectedDevice={setSelectedDevice}
      devices={devices}
    />
  );
};

export default MileageReport;
