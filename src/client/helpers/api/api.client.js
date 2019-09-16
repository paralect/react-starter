import axios from 'axios';
import config from 'config';
import { URLS, API_LOGOUT_PATH } from 'constants';
import history from 'resources/browserHistory';
import ApiError from './api.error';
import { getAccessToken } from '../token';

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
  responseType: 'json',
});

// Do not throw errors on 'bad' server response codes
api.interceptors.response.use(
  axiosConfig => axiosConfig,
  error => error.response || {},
);

const generalError = {
  _global: ['Unexpected Error Occurred'],
};

const throwApiError = ({ data = {}, status = 500 }) => {
  console.error('API: Error Ocurred', status, data); //eslint-disable-line
  throw new ApiError(data, status);
};

const refreshToken = () => api.post('/account/refresh-token');

const isOkStatus = status => status >= 200 && status < 300;

const refreshTokenIfNeeded = async () => {
  if (getAccessToken()) {
    return;
  }

  const tokenResponse = await refreshToken();

  if (!isOkStatus(tokenResponse.status)) {
    throwApiError({ data: { errors: generalError }, status: tokenResponse.status });
  }
};

const redirectToLogin = () => {
  window.location.href = config.landingLoginUrl;
};

const handleResponse = async (response, { skipUnauthorized = false } = {}) => {
  if (!response) {
    throwApiError({ data: { errors: generalError }, status: 500 });
    return response;
  }

  if (isOkStatus(response.status)) {
    return response;
  }

  if (response.status === 401) {
    if (skipUnauthorized) {
      return response;
    }
  }

  if (response.status === 418) {
    await api.post(API_LOGOUT_PATH);

    redirectToLogin();
  }

  if (response.status === 404 || response.status === 403) {
    history.push(URLS.NOT_FOUND);

    return null;
  }

  const errorData = {
    status: response.status,
    data: {
      ...response.data,
      errors: response.data && response.data.errors ? response.data.errors : generalError,
    },
  };

  throwApiError(errorData);

  return response;
};

const httpRequest = method => async (url, data) => {
  await refreshTokenIfNeeded();

  let urlWithSlash = url;

  if (urlWithSlash[0] !== '/') {
    urlWithSlash = `/${urlWithSlash}`;
  }

  const options = {
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

  let response = await handleResponse(await api(options), { skipUnauthorized: true });

  if (response.status === 401) {
    // try to refresh token and if it will be successful
    // then send the request again
    const tokenResponse = await refreshToken();

    if (!isOkStatus(tokenResponse.status)) {
      return redirectToLogin();
    }

    response = await handleResponse(await api(options));
  }

  return response;
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
