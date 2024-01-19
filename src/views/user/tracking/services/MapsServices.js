import fetch from 'axios';
import { serviceContext, URLs } from '../../../../utils/CommonURLs';

export const HistoricVehicleTrackingService = async ({
  deviceID,
  startDate,
  endDate,
  speedKPH
}) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.HISTORIC_VEHICLE_TRACKING}deviceid=${deviceID}&starttime=${startDate}&endtime=${endDate}&speed=${speedKPH}`
  })
    .then(res => res)
    .catch(err => err);
};

export const HistoricPersonListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_HISTORIC_PERSON_LIST}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const HistoricPersonTrackingService = async ({ deviceID }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_HISTORIC_PERSON_TRACKING}deviceid=${deviceID}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const HistoricAssetsListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.HISTORIC_ASSETS_LIST}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const HistoricAssetsTrackingService = async ({ deviceID }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_HISTORIC_ASSETS_TRACKING}deviceid=${deviceID}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LiveVehicleStatusService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_LIVE_VEHICLE_STATUS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LiveVehicleTrackingService = async deviceID => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.LIVE_VEHICLE_TRACKING}deviceid=${deviceID}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LivePersonStatusService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_LIVE_PERSON_STATUS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LivePersonTrackingService = async deviceID => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_LIVE_PERSON_TRACKING}deviceid=${deviceID}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LiveAssetStatusService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.LIVE_ASSET_STATUS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LiveVehicleRouteDistanceService = async ({ fromvehicle, tovehicle }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_LIVE_VEHICLE_ROUTE_DISTANCE}fromvehicle=${fromvehicle}&tovehicle=${tovehicle}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const LiveAssetTrackingService = async deviceID => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_LIVE_ASSET_TRACKING}deviceid=${deviceID}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const EagleViewService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.EAGLE_VIEW}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const AddPolygonGeozoneService = async data => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_GEOZONE}`,
    data
  })
    .then(({ data: { data, message }, status }) => ({ data, message, status }))
    .catch(
      ({
        response: {
          data: { data, message },
          status
        }
      }) => ({ data, message, status })
    );
};

export const UpdateCircularGeozoneServiceService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_GEOZONE}`,
    data
  })
    .then(({ data: { data, message }, status }) => ({ data, message, status }))
    .catch(err => err);
};

// My Office Userlandmark Details

export const getMyOfficeLandmarkDetailsService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.OFFICE_DETAILS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const AddNewMyOfficeLandmarkService = async data => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_OFFICE}`,
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

export const GetHistoricVehicleDetailsService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.HISTORIC_VEHICLE_TRACKING}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const UpdateMyOfficeLandmarkService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_OFFICE}`,
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

export const DeleteMyOfficeLandmarkService = async landmark => {
  return fetch({
    method: 'DELETE',
    url: `${serviceContext}${URLs.DELETE_OFFICE}?landmarkname=${landmark}`
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

//Userlandmark API
export const getUserlandmarkDetailsService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.USER_LANDMARK_DETAILS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const AddNewUserLandmarkService = async data => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_USER_LANDMARK}`,
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

export const UpdateUserLandmarkService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_USER_LANDMARK}`,
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

export const DeleteUserLandmarkService = async landmark => {
  return fetch({
    method: 'DELETE',
    url: `${serviceContext}${URLs.DELETE_USER_LANDMARK}?landmarkname=${landmark}`
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

export const RoutePlaybackService = async ({ deviceID, startDate, endDate }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_VEHICLE_ROUTE_PLAYBACK}deviceid=${deviceID}&startdate=${startDate}&enddate=${endDate}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const GetTravelPathService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.FETCH_TRAVELPATH}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const GetVehiclesforFilterService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_VEHICLES_FOR_FILTER}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const GetSpeedViolationService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_SPEED_VIOLATION}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const getHistoricalVehicleReportService = async ({
  deviceid,
  starttime,
  endtime,
  speed
}) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.HISTORIC_VEHICLE_TRACKING}deviceid=${deviceid}&starttime=${starttime}&endtime=${endtime}&speed=${speed}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
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

export const SearchnearbyDeviceIDService = async ({ radius, vehiclename }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.SEARCH_NEARBY_DEVICE}radius=${radius}&vehiclename=${vehiclename}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const SearchnearbyAllDeviceService = async ({ latitude, longitude, radius }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.SEARCH_NEARBY_DEVICE}latitude=${latitude}&longitude=${longitude}&radius=${radius}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
