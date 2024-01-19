import { convert3, convertToLocalDateAndTime } from '../../../../utils/CommonFunctions';
import {
  EngineReportService,
  IdleReportService,
  KMReportService,
  StoppageReportService,
  MovementReportService,
  OverallReportService,
  OverspeedReportService,
  ParkingReportService
} from './ReportServices';

// KM Report
export const getKMreport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Date',
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 200
    },

    {
      title: 'Distance (KM)',
      field: 'distance',
      headerName: 'Distance (KM)',
      flex: 1,
      minWidth: 200
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await KMReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: { kmReportDetails, reportGeneratePDFURL, reportGenerateExcelURL },
        message
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row defintion
    if (status === 200) {
      if (kmReportDetails && kmReportDetails?.length > 0) {
        rows = kmReportDetails?.map((item, index) => ({
          ...item,
          id: index + 1,
          date: convert3(item?.date),
          deviceID: item?.deviceID?.toUpperCase(),
          distance: item?.distance?.toFixed(2)
        }));
        snack = {
          show: true,
          severity: 'success',
          message: 'KM Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }

  return { snack, rows, columns, pdfURL, excelURL };
};

// Stoppage Report
export const getStoppageReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Date & Time',
      field: 'date',
      headerName: 'Date & Time',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Stoppage',
      field: 'stoppageCount',
      headerName: 'Stoppage',
      minWidth: 200,
      flex: 1
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await StoppageReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: { stoppageReportDetails, reportGeneratePDFURL, reportGenerateExcelURL },
        message
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row definition
    if (status === 200) {
      if (stoppageReportDetails && stoppageReportDetails?.length > 0) {
        rows = stoppageReportDetails?.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.deviceID?.toUpperCase(),
          date: convertToLocalDateAndTime(item?.timestamp)
        }));
        snack = { show: true, severity: 'success', message };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }

  return { snack, rows, columns, pdfURL, excelURL };
};

// Engine Report
export const getEngineReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      flex: 1,
      minWidth: 120
    },
    {
      title: 'Date',
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 100
    },
    {
      title: 'Distance Travelled (KM)',
      field: 'distanceTravelled',
      headerName: 'Distance Travelled (KM)',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Ignition',
      field: 'ignition',
      headerName: 'Ignition',
      flex: 1,
      minWidth: 80
    },
    {
      title: 'Engine On Timestamp',
      field: 'engine0nTimestamp',
      headerName: 'Engine On Timestamp',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Engine Off Timestamp',
      field: 'engine0ffTimestamp',
      headerName: 'Engine Off Timestamp',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Engine On/Off Duration',
      field: 'engineOnOffDuration',
      headerName: 'Engine On/Off Duration',
      flex: 1,
      minWidth: 200
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await EngineReportService(params);
  if (res && res?.status === 200) {
    let {
      data: {
        data: { deviceEngineReportInfo, reportGeneratePDFURL, reportGenerateExcelURL }
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row definition
    if (status === 200) {
      if (deviceEngineReportInfo && deviceEngineReportInfo?.length > 0) {
        rows = deviceEngineReportInfo?.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.deviceID?.toUpperCase(),
          date: convert3(item?.date),
          engine0nTimestamp: convertToLocalDateAndTime(item?.engine0nTimestamp),
          engine0ffTimestamp: convertToLocalDateAndTime(item?.engine0ffTimestamp)
        }));
        snack = {
          show: true,
          severity: 'success',
          message: 'Engine Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message: 'Network Error' };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }
  return { snack, rows, columns, pdfURL, excelURL };
};

// Idle Report
export const getIdleReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start Date',
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End Date',
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start',
      field: 'idleStart',
      headerName: 'Start Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End',
      field: 'idleEnd',
      headerName: 'End Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Duration',
      field: 'idleDuration',
      headerName: 'Duration',
      minWidth: 200,
      flex: 1
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await IdleReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: { idleReport, reportGeneratePDFURL, reportGenerateExcelURL },
        message
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row definition
    if (status === 200) {
      if (idleReport && idleReport?.length > 0) {
        rows = idleReport.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.vehicleNumber?.toUpperCase(),
          startDate: convert3(item?.idleStartDate),
          endDate: convert3(item?.idleEndDate),
          idleStart: item?.idleStartTime,
          idleEnd: item?.idleEndTime,
          idleDuration: item?.idleDuration
        }));

        snack = {
          show: true,
          severity: 'success',
          message: 'Idle Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }

  return { snack, rows, columns, pdfURL, excelURL };
};

// Overspeed Report:
export const getOverspeedReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start Date',
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End Date',
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start Time',
      field: 'startTime',
      headerName: 'Start Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End Time',
      field: 'endTime',
      headerName: 'End Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Duration',
      field: 'duration',
      headerName: 'Duration',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Hike Speed (KMPH)',
      field: 'hikeSpeed',
      headerName: 'Hike Speed (KMPH)',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Average Speed (KMPH)',
      field: 'averageSpeed',
      headerName: 'Average Speed (KMPH)',
      minWidth: 200,
      flex: 1
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await OverspeedReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: {
          overSpeedDeviceReportInfo,
          generateOverSpeedPdfReport,
          generateOverSpeedExcelReport
        },
        message
      },
      status
    } = res;
    pdfURL = generateOverSpeedPdfReport;
    excelURL = generateOverSpeedExcelReport;

    // row definition
    if (status === 200) {
      if (overSpeedDeviceReportInfo && overSpeedDeviceReportInfo?.length > 0) {
        rows = overSpeedDeviceReportInfo?.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.deviceID?.toUpperCase(),
          startDate: convert3(item?.startDate),
          endDate: convert3(item?.endDate),
          startTime: item?.start,
          endTime: item?.end,
          duration: item?.duration,
          hikeSpeed: item?.hikeSpeed,
          averageSpeed: item?.averageSpeed
        }));
        snack = {
          show: true,
          severity: 'success',
          message: 'Overspeed Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }
  return { snack, rows, columns, pdfURL, excelURL };
};

// Overall Report
export const getOverallReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'vehicleNumber',
      headerName: 'Vehicle No',
      flex: 1,
      minWidth: 200,
      renderCell: ({ value }) => value?.toUpperCase()
    },
    {
      title: 'Date',
      field: 'date',
      headerName: 'Date',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Start Time',
      field: 'startTime',
      headerName: 'Start Time',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'End Time',
      field: 'endTime',
      headerName: 'End Time',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Duration',
      field: 'duration',
      headerName: 'Duration',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Average Speed (KMPH)',
      field: 'averageSpeed',
      headerName: 'Average Speed (KMPH)',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Hike Speed (KMPH)',
      field: 'hikeSpeed',
      headerName: 'Hike Speed (KMPH)',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Vehicle Status',
      field: 'vehicleStatus',
      headerName: 'Vehicle Status',
      flex: 1,
      minWidth: 200
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await OverallReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: { overAllReportInfo, reportGeneratePDFURL, reportGenerateExcelURL },
        message
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row definition
    if (status === 200) {
      if (overAllReportInfo && overAllReportInfo?.length > 0) {
        rows = overAllReportInfo?.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.vehicleNumber?.toUpperCase(),
          date: convert3(item?.date),
          start: item?.startTime,
          end: item?.endTime,
          vehicleStatus: item?.vehicleStatus,
          duration: item?.duration,
          hikeSpeed: item?.hikeSpeed,
          averageSpeed: item?.averageSpeed
        }));

        snack = {
          show: true,
          severity: 'success',
          message: 'Overall Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }
  return { snack, rows, columns, pdfURL, excelURL };
};

// Parking Report
export const getParkingReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start Date',
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End Date',
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start',
      field: 'parkingStart',
      headerName: 'Start Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End',
      field: 'parkingEnd',
      headerName: 'End Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Duration',
      field: 'duration',
      headerName: 'Duration',
      minWidth: 200,
      flex: 1
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await ParkingReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: { parkedReportInfo, reportGeneratePDFURL, reportGenerateExcelURL },
        message
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row definition
    if (status === 200) {
      if (parkedReportInfo && parkedReportInfo?.length > 0) {
        rows = parkedReportInfo.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.vehicleNumber?.toUpperCase(),
          startDate: convert3(item?.parkedStartDate),
          endDate: convert3(item?.parkedEndDate),
          parkingStart: item?.parkedStartTime,
          parkingEnd: item?.parkedEndTime,
          duration: item?.parkedDuration
        }));
        snack = {
          show: true,
          severity: 'success',
          message: 'Parking Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }
  return { snack, rows, columns, pdfURL, excelURL };
};

// Movement Report
export const getMovementReport = async ({ deviceID = null, startDate, endDate }) => {
  let snack,
    params,
    pdfURL,
    excelURL,
    rows = [];

  let columns = [
    {
      title: 'Device ID',
      field: 'deviceID',
      headerName: 'Vehicle No',
      flex: 1,
      minWidth: 200
    },
    {
      title: 'Start Date',
      field: 'startDate',
      headerName: 'Start Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End Date',
      field: 'endDate',
      headerName: 'End Date',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Start',
      field: 'movementStart',
      headerName: 'Start Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'End',
      field: 'movementEnd',
      headerName: 'End Time',
      minWidth: 200,
      flex: 1
    },
    {
      title: 'Movement Duration',
      field: 'movementDuration',
      headerName: 'Movement Duration',
      flex: 1,
      minWidth: 200
    }
  ];

  if (deviceID) params = `deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`;
  else params = `startdate=${startDate}&enddate=${endDate}`;

  let res = await MovementReportService(params);

  if (res && res?.status === 200) {
    let {
      data: {
        data: { movementReportInfo, reportGeneratePDFURL, reportGenerateExcelURL },
        message
      },
      status
    } = res;

    pdfURL = reportGeneratePDFURL;
    excelURL = reportGenerateExcelURL;

    // row definition
    if (status === 200) {
      if (movementReportInfo?.length > 0) {
        rows = movementReportInfo?.map((item, index) => ({
          ...item,
          id: index + 1,
          deviceID: item?.vehicleNumber?.toUpperCase(),
          startDate: convert3(item?.movementStartDate),
          endDate: convert3(item?.movementEndDate),
          movementStart: item?.movementStartTime,
          movementEnd: item?.movementEndTime,
          movementDuration: item?.movementDuration
        }));
        snack = {
          show: true,
          severity: 'success',
          message: 'Movement Report fetched successfully'
        };
      } else {
        snack = { show: true, severity: 'warning', message: 'No reports found' };
      }
    } else {
      snack = { show: true, severity: 'error', message };
    }
  } else {
    snack = { show: true, severity: 'error', message: 'Network Error' };
  }
  return { snack, rows, columns, pdfURL, excelURL };
};

export const getReport = async type => {
  switch (type) {
    case 'KM Report':
      return getKMreport;

    case 'Stoppage Report':
      return getStoppageReport;

    case 'Engine Report':
      return getEngineReport;

    case 'Idle Report':
      return getIdleReport;

    case 'Movement Report':
      return getMovementReport;

    case 'Parking Report':
      return getParkingReport;

    case 'Overall Report':
      return getOverallReport;

    case 'Overspeed Report':
      return getOverspeedReport;

    default:
      return;
  }
};
