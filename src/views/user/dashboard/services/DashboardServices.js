import { serviceContext, URLs } from '../../../../utils/CommonURLs';
import fetch from 'axios';

// service to get vehicle dashboard data
export const VehicleDashboardService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.VEHICLE_DASHBOARD}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get vehicle dashboard device list
export const VehicleDashboardDeviceListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.VEHICLE_DASHBOARD_DEVICELIST}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get vehicle dashboard live summary data
export const VehicleDashboardLiveSummaryService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_VEHICLE_DASHBOARD_LIVESUMMARY}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get vehicle dashboard co-ordinate data by device status
export const VehicleDashboardByStatusService = async status => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.VEHICLE_DASHBOARD_BY_STATUS}status=${status}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get vehicle dashboard filtered data
export const FilterVehicleDashboardService = async deviceid => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.VEHICLE_DASHBOARD_BY_FILTER}deviceid=${deviceid}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get sales person dashboard data
export const SalesPersonDashboardService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_SALESPERSON_DASHBOARD}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get sales person dashboard device list
export const SalesPersonDashboardDeviceListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_SALESPERSON_DASHBOARD_DEVICELIST}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get sales person dashboard live summary data
export const SalesPersonDashboardLiveSummaryService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_SALESPERSON_DASHBOARD_LIVESUMMARY}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get sales person dahboard co-ordinate data by device status
export const SalesPersonDashboardByStatusService = async status => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_SALESPERSON_DASHBOARD_BY_STATUS}status=${status}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get sales person dashboard filtered data
export const FilterSalesPersonDashboardService = async deviceid => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_SALESPERSON_DASHBOARD_BY_FILTER}deviceid=${deviceid}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get asset dashboard data
export const AssetsDashboardService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_ASSETS_DASHBOARD}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get asset dashboard device list
export const AssetsDashboardDeviceListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_ASSETS_DASHBOARD_DEVICELIST}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get asset dashboard live summary data
export const AssetsDashboardLiveSummaryService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_ASSETS_DASHBOARD_LIVESUMMARY}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get asset dashboard co-ordinate data by device status
export const AssetsDashboardByStatusService = async status => {
  return fetch({
    method: `GET`,
    url: `${serviceContext}${URLs.FETCH_ASSETS_DASHBOARD_BY_STATUS}status=${status}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get asset dashboard filtered data
export const AssetsDashboardByFilterService = async deviceid => {
  return fetch({
    method: `GET`,
    url: `${serviceContext}${URLs.FETCH_ASSETS_DASHBOARD_BY_FILTER}deviceid=${deviceid}`
  }).then(({ data, status }) => ({ data, status }));
};

// service to get employee dashboard data
export const EmployeeDashboardService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_EMPLOYEE_DASHBOARD}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to get employee dashboard data by status
export const EmployeeDashboardByStatusService = async status => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_EMPLOYEE_DASHBOARD_BY_STATUS}status=${status}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
