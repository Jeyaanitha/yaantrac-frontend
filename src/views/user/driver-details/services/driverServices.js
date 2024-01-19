import fetch from 'axios';
import { URLs, serviceContext } from '../../../../utils/CommonURLs';

export const DriverprofileService = async params => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.DRIVER_PROFILE}`
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

export const AddDriverService = async data => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_DRIVER_PROFILE}`,
    data
  })
    .then(({ status, data, message }) => ({ status, data, message }))
    .catch(
      ({
        response: {
          status,
          data: { error }
        }
      }) => ({ status, data: { message: error } })
    );
};

export const UpdateDriverService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_DRIVER_PROFILE}`,
    data
  })
    .then(({ status, data: { message } }) => ({ status, message }))
    .catch(err => err);
};

export const DeactivateDriverService = async ({ driverID, deviceID }) => {
  return fetch({
    method: 'PATCH',
    url: `${serviceContext}${URLs.DEACTIVATE_DRIVER}deviceid=${deviceID}&driverid=${driverID}`
  })
    .then(res => res)
    .catch(err => err);
};

// Driver Mapping Service Functions:
export const GetDriverMappingService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_DRIVER_MAPPING}`
  })
    .then(res => res)
    .catch(err => err);
};

export const GetDriverIDsDropdownService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_DRIVER_IDS_DROPDOWN}`
  })
    .then(res => res)
    .catch(err => err);
};

export const GetVehicleNoDropdownService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_VEHICLE_NUMBER_DROPDOWN}`
  })
    .then(res => res)
    .catch(err => err);
};

export const AddDriverMappingService = async ({ driverID, vehicleNumber }) => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_DRIVER_MAPPING}driverId=${driverID}&vehicleNumber=${vehicleNumber}`
  })
    .then(res => res)
    .catch(err => err);
};

export const UpdateDriverMappingService = async ({ driverID, vehicleNumber }) => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_DRIVER_MAPPING}driverid=${driverID}&vehiclenumber=${vehicleNumber}`
  })
    .then(res => res)
    .catch(err => err);
};

export const DeleteDriverMappingService = async ({ vehicleNumber }) => {
  return fetch({
    method: 'PATCH',
    url: `${serviceContext}${URLs.DELETE_DRIVER_MAPPING}vehicleNumber=${vehicleNumber}`
  })
    .then(res => res)
    .catch(err => err);
};
