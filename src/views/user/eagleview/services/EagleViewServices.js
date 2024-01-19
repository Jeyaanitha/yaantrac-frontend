import fetch from 'axios';
import { URLs, serviceContext } from '../../../../utils/CommonURLs';

export const EagleViewService = async () => {
  return fetch({
    method: 'GET',
    url: `${serviceContext}${URLs.EAGLE_VIEW}`
  })
    .then(({ data, status }) => ({ data, status }))
    .catch(err => err);
};
