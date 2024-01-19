import fetch from 'axios';
import { URLs, serviceContext } from '../../../../utils/CommonURLs';

export const LiveStatusService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.LIVE_STATUS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const SearchnearbyDeviceID = async ({ radius, vehiclename }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.SEARCH_NEARBY_DEVICE}radius=${radius}&vehiclename=${vehiclename}`
  });
};

export const SearchnearbyAllDevice = async ({ latitude, longitude, radius }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.SEARCH_NEARBY_DEVICE}latitude=${latitude}&longitude=${longitude}&radius=${radius}`
  });
};
