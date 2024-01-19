import fetch from 'axios';
import { serviceContext, URLs } from '../../../../utils/CommonURLs';

export const FuelUsageReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FUEL_USAGE_REPORT}${params}`
  })
    .then(({ data, status }) => {
      let response = { data, status };
      return response;
    })
    .catch(({ message }) => {
      let error = { data: message, status: null };
      return error;
    });
};

export const MileageReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.MILEAGE_REPORT}${params}`
  })
    .then(({ data, status }) => {
      let response = { data, status };
      return response;
    })
    .catch(({ message }) => {
      let error = { data: message, status: null };
      return error;
    });
};

// export const ParkingReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.PARKING_REPORT}${params}`
//   })
//     .then(({ data, status }) => {
//       let response = { data, status };
//       return response;
//     })
//     .catch(({ message }) => {
//       let error = { data: message, status: null };
//       return error;
//     });
// };

export const FuelRefillReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FUEL_REFILL_REPORT}${params}`
  })
    .then(({ data, status }) => {
      let response = { data, status };
      return response;
    })
    .catch(({ message }) => {
      let error = { data: message, status: null };
      return error;
    });
};

// export const MovementReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.MOVEMENT_REPORT}${params}`
//   })
//     .then(({ data, status }) => {
//       let response = { data, status };
//       return response;
//     })
//     .catch(({ message }) => {
//       let error = { data: message, status: null };
//       return error;
//     });
// };

// export const StoppageReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.STOPPAGE_REPORT}${params}`
//   })
//     .then(({ data, status }) => {
//       let response = { data, status };
//       return response;
//     })
//     .catch(({ message }) => {
//       let error = { data: message, status: null };
//       return error;
//     });
// };

export const AttendanceReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.ATTENDANCE_REPORT}${params}`
  })
    .then(({ data, status }) => {
      let response = { data, status };
      return response;
    })
    .catch(({ message }) => {
      let error = { data: message, status: null };
      return error;
    });
};

// export const KMReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.KM_REPORT}${params}`
//   })
//     .then(({ data, status }) => {
//       let response = { data, status };
//       return response;
//     })
//     .catch(({ message }) => {
//       let error = { data: message, status: null };
//       return error;
//     });
// };

export const DeviceListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.DEVICE_LIST}`
  })
    .then(({ data, status }) => {
      let response = { data, status };
      return response;
    })
    .catch(({ message, response }) => {
      let error = {
        status: response?.status,
        message
      };
      return error;
    });
};

// export const EngineReportService = async params => {
//   console.log('LOG', params);
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.ENGINE_REPORT}${params}`
//   })
//     .then(({ data, status }) => ({ data, status }))
//     .catch(({ response }) => {
//       let error = {
//         data: response?.data?.error,
//         status: response?.status
//       };
//       return error;
//     });
// };

// export const OverallReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.OVERALL_REPORT}${params}`
//   })
//     .then(({ data, status }) => ({ data, status }))
//     .catch(({ response }) => {
//       let error = {
//         data: response?.data?.error,
//         status: response?.status
//       };
//       return error;
//     });
// };

// export const OverspeedReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.OVERSPEED_REPORT}${params}`
//   })
//     .then(({ data, status }) => ({ data, status }))
//     .catch(({ message, response }) => {
//       let error = {
//         status: response?.status,
//         data: message
//       };
//       return error;
//     });
// };

// export const IdleReportService = async params => {
//   return fetch({
//     method: 'GET',
//     url: `${serviceContext}${URLs.IDLE_REPORT}${params}`
//   })
//     .then(({ data, status }) => ({ data, status }))
//     .catch(({ response }) => {
//       let error = {
//         data: response?.data?.error,
//         status: response?.status
//       };
//       return error;
//     });
// };

export const getSpeedViolationReport = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.SPEED_VIOLATION_REPORT}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(({ response }) => {
      let error = {
        data: response?.data?.error,
        status: response?.status
      };
      return error;
    });
};
