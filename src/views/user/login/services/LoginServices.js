import fetch from 'axios';
import { serviceContext, URLs } from '../../../../utils/CommonURLs';

// service to login
export const UserLoginService = async params => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.LOGIN}`,
    data: params,
    headers: null
  })
    .then(({ data: { data, message }, status }) => ({
      token: data[0]?.token,
      message,
      status
    }))
    .catch(
      ({
        response: {
          data: { error: message },
          status
        }
      }) => ({ message, status })
    );
};

// service to forgot password
export const ForgotPasswordService = async ({ userID }) => {
  return fetch({
    method: 'POST',
    url: `${serviceContext}${URLs.FORGOT_PASSWORD}username=${userID}`,
    headers: null
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};

// service to reset password
export const ResetPasswordService = async params => {
  return fetch({
    method: 'PUT',
    url: `${serviceContext}${URLs.RESET_PASSWORD}`,
    data: params,
    headers: null
  })
    .then(({ status }) => ({ status }))
    .catch(err => err);
};
