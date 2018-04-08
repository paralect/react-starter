// @flow

import type { $AxiosXHRConfigBase } from 'axios';

import { apiClient } from 'helpers/api';
import type { StateType } from './user.types';

export const fetchUser = (id: string = ''): Promise<*> => {
  return apiClient.get(`/users/${id}`);
};

export const updateUser = (
  id: string = '',
  data: StateType,
  options?: $AxiosXHRConfigBase<Object>,
): Promise<*> => {
  return apiClient.put(`/users/${id}`, data, options);
};
