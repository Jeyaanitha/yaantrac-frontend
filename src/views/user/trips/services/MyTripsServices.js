import fetch from 'axios';
import { serviceContext, URLs } from '../../../../utils/CommonURLs';

export const MyTripsService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.TRIP_DETAILS}`
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(err => err);
};

export const GetTripDeviceListService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.TRIP_DEVICE_LIST}`
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(err => err);
};

export const AddTripService = async data => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.ADD_TRIP}`,
    data
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(err => err);
};

export const UpdateTripService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_TRIP}`,
    data
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(err => err);
};

export const ActivateTripService = async ({ vehicle, tripID }) => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.ACTIVATE_TRIP}deviceid=${vehicle}&tripid=${tripID}`
  })
    .then(({ status }) => ({ status }))
    .catch(err => err);
};

export const DeactivateTripService = async data => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.DEACTIVATE_TRIP}`,
    data
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(err => err);
};

export const ShareTripService = async ({
  tripID,
  deviceID,
  groupID,
  mobile,
  message
}) => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.SHARE_TRIP}tripid=${tripID}&deviceid=${deviceID}&groupid=${groupID}&message=${message}&email=${mobile}`
  })
    .then(({ status, data }) => ({ status, data }))
    .catch(err => err);
};
