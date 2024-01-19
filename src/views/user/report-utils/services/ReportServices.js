import fetch from 'axios';
import { serviceContext, URLs } from '../../../../utils/CommonURLs';

export const KMReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.KM_REPORT}${params}`
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

export const StoppageReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.STOPPAGE_REPORT}${params}`
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

export const EngineReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.ENGINE_REPORT}${params}`
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

export const IdleReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.IDLE_REPORT}${params}`
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

export const OverspeedReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.OVERSPEED_REPORT}${params}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(({ message, response }) => {
      let error = {
        status: response?.status,
        data: message
      };
      return error;
    });
};

export const OverallReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.OVERALL_REPORT}${params}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(({ message, response }) => {
      let error = {
        status: response?.status,
        data: message
      };
      return error;
    });
};

export const ParkingReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.PARKING_REPORT}${params}`
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

export const MovementReportService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.MOVEMENT_REPORT}${params}`
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
