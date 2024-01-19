import fetch from 'axios';
import { URLs, serviceContext } from '../../../../../utils/CommonURLs';

export const TripsMapService = async ({ tripid }) => {
  return fetch({
    method: 'GET',
    headers: 'null',
    url: `${serviceContext}${URLs.GET_TRIPS_MAP}tripid=${tripid}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
