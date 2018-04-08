// @flow

import axios, { Cancel } from 'axios';
import type { $AxiosXHR, $AxiosError, $AxiosXHRConfig, $AxiosXHRConfigBase } from 'axios';

import _merge from 'lodash/merge';

import ApiError from './api.error';

type AxiosFnType = (
  url: string,
  data?: Object,
  options?: $AxiosXHRConfigBase<Object>,
) => Promise<Object>;

type ApiErrorDataType = {
  data: Object,
  status: number,
};

// Do not throw errors on 'bad' server response codes
axios.interceptors.response.use(
  (axiosConfig: $AxiosXHR<*>): $AxiosXHR<*> => axiosConfig,
  (error: $AxiosError<Object> | Cancel): Object => {
    if (error instanceof Cancel) {
      throw error;
    }
    return error.response;
  },
);

const generalError = {
  _global: ['Unexpected Error Occurred'],
};

const throwApiError = ({ data = {}, status = 500 }: ApiErrorDataType) => {
  console.error('API: Error Ocurred', status, data); //eslint-disable-line
  throw new ApiError(data, status);
};

const httpRequest = (method: string): AxiosFnType => async (
  url: string,
  data?: Object,
  options?: $AxiosXHRConfigBase<Object> = {},
): Object => {
  let urlWithSlash: string = url;

  if (urlWithSlash[0] !== '/') {
    urlWithSlash = `/${urlWithSlash}`;
  }

  const axiosOptions: $AxiosXHRConfig<Object> = {
    headers: { Authorization: `Bearer ${window.token}` },
    method,
    url: `${window.config.apiUrl}${urlWithSlash}`,
  };

  _merge(axiosOptions, options);

  if (data) {
    if (method === 'get') {
      axiosOptions.params = data;
    } else {
      axiosOptions.data = data;
    }
  }

  const response: ?$AxiosXHR<Object> = await axios(axiosOptions);
  if (!response) {
    throwApiError({
      data: { errors: generalError },
      status: 500,
    });
    return null;
  }

  if (response.status >= 200 && response.status < 300) {
    return response.data || {};
  } else if (response.status === 400) {
    throwApiError(response);
  }

  response.data.errors = response.data.errors || generalError;
  throwApiError(response);
  return null;
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
