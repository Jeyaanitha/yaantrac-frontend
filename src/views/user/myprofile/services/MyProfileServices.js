import fetch from 'axios';
import { serviceContext, URLs } from '../../../../utils/CommonURLs';

// service to fetch my profile details
export const FetchMyProfileService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.MY_PROFILE}`
  })
    .then(res => res)
    .catch(err => err);
};

export const UpdateMyProfileDetails = async params => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_MY_PROFILE}`,
    data: params
  })
    .then(({ status }) => ({ status }))
    .catch(err => err);
};

// service to change password
export const ChangePasswordService = async params => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.CHANGE_PASSWORD}`,
    data: params
  })
    .then(({ status }) => ({ status }))
    .catch(err => err);
};

// service to change user email
export const ChangeEmailService = async params => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_CHANGE_EMAIL}${params}`
  })
    .then(({ status }) => ({ status }))
    .catch(err => err);
};

// service to change user mobile number
export const ChangeMobileNumberService = async params => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.UPDATE_CHANGE_MOBILE}${params}`
  })
    .then(({ status }) => ({ status }))
    .catch(err => err);
};

export const OrganizationProfileService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.GET_ORGANIZATION_PROFILE}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
