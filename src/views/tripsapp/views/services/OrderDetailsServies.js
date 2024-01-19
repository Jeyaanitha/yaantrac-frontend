import fetch from 'axios';
import { URLs, serviceContext } from '../../../../utils/CommonURLs';

// service to get vehicle dashboard data
export const OrderDetailsServices = async ({ tripid }) => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.KHUB_ORDERDETAILS}tripid=${tripid}`,
    headers: null
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const TripService = async () => {
  return fetch({
    method: 'GET',
    headers: 'null',
    url: `${serviceContext}${URLs.GET_TRIP_DETAILS}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

export const TripsMapService = async ({ tripid }) => {
  return fetch({
    method: 'GET',
    headers: 'null',
    url: `${serviceContext}${URLs.GET_TRIPS_MAP}tripid=${tripid}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
