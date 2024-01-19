import fetch from 'axios';
import { URLs, serviceContext } from '../../../../../utils/CommonURLs';

export const TripService = async () => {
  return fetch({
    method: 'GET',
    headers: 'null',
    url: `${serviceContext}${URLs.GET_TRIP_DETAILS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
