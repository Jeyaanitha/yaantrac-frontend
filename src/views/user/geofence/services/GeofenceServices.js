import fetch from 'axios';
import { URLs, serviceContext } from '../../../../utils/CommonURLs';

export const AllGeofencesService = async ({ type }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GEOFENCE_DETAILS}geozonetype=${type}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const AddGeofenceService = async data => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_GEOFENCE}`,
    data
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(
      ({
        response: {
          status,
          data: { error }
        }
      }) => ({
        status,
        data: { message: error }
      })
    );
};

export const UpdateGeofenceService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_GEOFENCE}`,
    data
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(
      ({
        response: {
          status,
          data: { error }
        }
      }) => ({
        status,
        data: { message: error }
      })
    );
};

export const DeactivateGeofenceService = async ({ geozoneID, category }) => {
  return fetch({
    method: 'PATCH',
    url: `${serviceContext}${URLs.DEACTIVATE_GEOFENCE}/${category}/deactivate?geozoneid=${geozoneID}`
  })
    .then(({ data: { message }, status }) => ({ status, message }))
    .catch(
      ({
        response: {
          status,
          data: { error }
        }
      }) => ({ status, message: error })
    );
};

export const DeviceMappingDeviceListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.DEVICE_MAPPING_DEVICE_LIST}`
  })
    .then(({ status, data: { data } }) => ({ status, data }))
    .catch(err => err);
};

export const DeviceMappingDetailsService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.DEVICE_MAPPING_DETAILS}`
  })
    .then(({ status, data: { data } }) => ({ status, data }))
    .catch(err => err);
};

export const AddDeviceMappingService = async ({ geozoneID, deviceID }) => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_DEVICE_MAPPING}geozoneid=${geozoneID}&vehiclenumber=${deviceID}`
  })
    .then(({ status, data: { message } }) => ({ status, message }))
    .catch(err => err);
};

export const UpdateDeviceMappingService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_DEVICE_MAPPING}`,
    data
  })
    .then(({ status, data: { message } }) => ({ status, message }))
    .catch(err => err);
};

export const DeleteDeviceMappingService = async ({ deviceID }) => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.DELETE_DEVICE_MAPPING}vehiclenumber=${deviceID}`
  })
    .then(({ status, data: { message } }) => ({ status, message }))
    .catch(err => err);
};

export const getMyOfficeLandmarkDetailsService = async ({ officeOrLandmark }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.OFFICE_DETAILS}/${officeOrLandmark}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const AddNewMyOfficeLandmarkService = async ({ officeOrLandmark, ...data }) => {
  return fetch({
    method: 'POST',
    url:
      officeOrLandmark === 'office'
        ? `${serviceContext}${URLs.ADD_OFFICE}/${officeOrLandmark}`
        : `${serviceContext}${URLs.ADD_OFFICE}/${officeOrLandmark}?officename=${data?.officename}`,
    data
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(
      ({
        response: {
          data: { data, message },
          status
        }
      }) => ({ data, message, status })
    );
};

export const DeleteMyOfficeLandmarkService = async ({
  myoffice = null,
  landmark,
  officeOrLandmark
}) => {
  return fetch({
    method: 'DELETE',
    url: `${serviceContext}${URLs.DELETE_OFFICE}/${officeOrLandmark}?name=${landmark}${
      myoffice ? `&officename=${myoffice}` : ''
    }`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const UpdateMyOfficeLandmarkService = async ({
  officeOrLandmark,
  officename = null,
  ...data
}) => {
  return fetch({
    method: 'PUT',
    url:
      officeOrLandmark === 'office'
        ? `${serviceContext}${URLs.UPDATE_OFFICE}/${officeOrLandmark}`
        : `${serviceContext}${URLs.UPDATE_OFFICE}/${officeOrLandmark}?officename=${officename}`,

    data
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(
      ({
        response: {
          data: { data, message },
          status
        }
      }) => ({ data, message, status })
    );
};

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

export const LiveVehicleRouteDistanceService = async ({ fromvehicle, tovehicle }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_LIVE_VEHICLE_ROUTE_DISTANCE}fromvehicle=${fromvehicle}&tovehicle=${tovehicle}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
