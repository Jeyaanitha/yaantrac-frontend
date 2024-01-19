import React, { useEffect, useState } from 'react';
import { convert, getMinDate, getEpochValue } from '../../../utils/CommonFunctions';
import { DeviceListService } from './services/ReportServices';
import Report from './components/Report';
import { getKMreport } from '../report-utils/services/ReportFunctions';
import { updateToast } from '../../../app/redux/action/action';
import { useDispatch } from 'react-redux';

const KMReport = () => {
  // component state
  const [details, setDetails] = useState(null);
  const [columnDef, setColumnDef] = useState([]);
  const [rowDef, setRowDef] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState();
  const [docPayload, setDocPayload] = useState(null);

  const dispatch = useDispatch();

  // function to get km report
  const onSubmit = async data => {
    setIsLoading(true);
    let { deviceID } = data;
    let payload = {
      deviceID: deviceID === 'selectAll' ? null : deviceID,
      startDate: getEpochValue(data.startDate),
      endDate: getEpochValue(data.endDate)
    };

    setDetails({ ...payload });
    let { snack, rows = [], columns = [], pdfURL, excelURL } = await getKMreport(payload);
    dispatch(updateToast(snack));
    setColumnDef(columns);
    setRowDef(rows);

    let urlData = {
      reportType: 'KM',
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
      startDate: convert(getMinDate(new Date())),
      endDate: convert(new Date())
    };
    onSubmit(payload);
  }, []);

  return (
    <Report
      title={'KM Report'}
      devices={devices}
      rowDef={rowDef}
      columnDef={columnDef}
      onSubmit={onSubmit}
      isLoading={isLoading}
      details={details}
      docPayload={docPayload}
    />
  );
};

export default KMReport;
