import React, { useState, useEffect } from 'react';
import Report from './components/Report';
import { DeviceListService } from './services/ReportServices';
import { getMinDate, getEpochValue } from '../../../utils/CommonFunctions';
import { getStoppageReport } from '../report-utils/services/ReportFunctions';
import { updateToast } from '../../../app/redux/action/action';
import { useDispatch } from 'react-redux';

const StoppageReport = () => {
  // component state
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState();
  const [docPayload, setDocPayload] = useState(null);

  // function to dispatch
  const dispatch = useDispatch();

  // function to get stoppage report data
  const onSubmit = async data => {
    setIsLoading(true);
    let { deviceID = null } = data;
    let payload = {
      deviceID: deviceID === 'selectAll' ? null : deviceID,
      startDate: getEpochValue(data.startDate),
      endDate: getEpochValue(data.endDate)
    };

    setDetails({ ...payload });
    let {
      snack,
      rows = [],
      columns = [],
      pdfURL,
      excelURL
    } = await getStoppageReport(payload);
    dispatch(updateToast(snack));
    setColumnDef(columns);
    setRowDef(rows);

    let urlData = {
      reportType: 'Stoppage',
      pdfURL: pdfURL,
      excelURL: excelURL
    };
    setDocPayload(urlData);
    setIsLoading(false);
  };

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
      startDate: getMinDate(new Date()),
      endDate: new Date()
    };
    onSubmit(payload);
  }, []);

  return (
    <Report
      title='Stoppage Report'
      rowDef={rowDef}
      columnDef={columnDef}
      onSubmit={onSubmit}
      isLoading={isLoading}
      details={details}
      devices={devices}
      docPayload={docPayload}
    />
  );
};

export default StoppageReport;
