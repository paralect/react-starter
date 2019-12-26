import axios from 'axios';

import config from 'config';
import { API_LOGOUT_PATH } from 'helpers/constants';
import history from 'services/history.service';
import { routes } from 'routes';

import ApiError from './api.error';


let refreshRequest = null;

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  responseType: 'json',
});

const generalError = {
  _global: ['Unexpected Error Occurred'],
};

const throwApiError = ({ data = {}, status = 500 }) => {
  console.error('API: Error Ocurred', status, data); //eslint-disable-line
  throw new ApiError(data, status);
};

const refreshToken = () => {
  return api.post('/account/refresh-token', {}, { refresh: true });
};

const redirectToLogin = () => {
  window.location.href = config.landingLoginUrl;
};

api.interceptors.response.use(
  (response) => response,
  async ({ config: requestConfig, response = {} }) => {
    const errorData = {
      status: response.status,
      data: {
        ...response.data,
        errors: response.data && response.data.errors ? response.data.errors : generalError,
      },
    };

    if (response.status === 401 && !requestConfig.retry && !requestConfig.refresh) {
      if (!refreshRequest) {
        refreshRequest = refreshToken();
      }

      await refreshRequest;
      refreshRequest = null;

      return api({ ...requestConfig, retry: true });
    }

    if (response.status === 401) {
      await api.post(API_LOGOUT_PATH);

      throw redirectToLogin();
    }

    if (response.status === 404 || response.status === 403) {
      return history.push(routes.notFound.url());
    }

    return throwApiError(errorData);
  },
);

const httpRequest = (method) => async (url, data, extraOptions = {}) => {
  let urlWithSlash = url;

  if (urlWithSlash[0] !== '/') {
    urlWithSlash = `/${urlWithSlash}`;
  }

  const options = {
    ...extraOptions,
    method,
    url: urlWithSlash,
  };

  if (data) {
    if (method === 'get') {
      options.params = data;
    } else {
      options.data = data;
    }
  }

  return api(options);
};

export const getRequest = httpRequest('get');
export const postRequest = httpRequest('post');
export const putRequest = httpRequest('put');
export const deleteRequest = httpRequest('delete');

const apiClient = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default apiClient;
