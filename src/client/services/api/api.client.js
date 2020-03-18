import axios from 'axios';
import qs from 'qs';

import config from 'config';

import ApiError from './api.error';

const throwApiError = ({ status, statusText, data }) => {
  console.error(`API Error: ${status} ${statusText}`, data); //eslint-disable-line
  throw new ApiError(status, statusText, data);
};

class ApiClient {
  constructor(axiosConfig) {
    this._handlers = new Map();

    this._api = axios.create(axiosConfig);
    this._api.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorHandlers = this._handlers.get('error') || [];
        errorHandlers.forEach((handler) => {
          handler(error.response);
        });

        return throwApiError(error.response);
      },
    );
  }

  get(url, params = {}, requestConfig = {}) {
    return this._api({
      method: 'get',
      url,
      params,
      ...requestConfig,
    });
  }

  post(url, data = {}, requestConfig = {}) {
    return this._api({
      method: 'post',
      url,
      data,
      ...requestConfig,
    });
  }

  put(url, data = {}, requestConfig = {}) {
    return this._api({
      method: 'put',
      url,
      data,
      ...requestConfig,
    });
  }

  delete(url, data = {}, requestConfig = {}) {
    return this._api({
      method: 'delete',
      url,
      data,
      ...requestConfig,
    });
  }

  on(event, handler) {
    if (this._handlers.has(event)) {
      this._handlers.get(event).add(handler);
    } else {
      this._handlers.set(event, new Set([handler]));
    }

    return () => this._handlers.get(event).remove(handler);
  }
}

export default new ApiClient({
  baseURL: config.apiUrl,
  withCredentials: true,
  responseType: 'json',
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
});
