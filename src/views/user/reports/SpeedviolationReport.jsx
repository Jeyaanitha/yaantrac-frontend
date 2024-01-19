import React, { useEffect, useState } from 'react';
import { getSpeedViolationReport } from './services/ReportServices';
import Report from './components/Report';

function SpeedviolationReport() {
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200
    },
    {
      field: 'deviceID',
      headerName: 'DeviceID',
      width: 200
    },
    {
      field: 'actualSpeed',
      headerName: 'Actual Speed',
      width: 200
    },
    {
      field: 'overSpeed',
      headerName: 'Over Speed',
      width: 200
    }
  ];

  useEffect(() => {
    getSpeedViolation();
  }, []);

  const getSpeedViolation = async () => {
    let {
      data: { data },
      status
    } = await getSpeedViolationReport();
    if (status === 200) {
      let newArr = [];
      console.log('Speed-Violation', data);
      data.map((x, index) => {
        newArr.push({ ...x, id: index + 1 });
        return newArr;
      });
      setRows(newArr);
    }
  };

  return (
    <div>
      <Report rowDef={rows} columnDef={columns} />
    </div>
  );
}

export default SpeedviolationReport;
