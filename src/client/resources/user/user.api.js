import { apiClient } from 'helpers/api';

export const fetchUser = (id = '') => {
  return apiClient.get(`/users/${id}`);
};

export const updateUser = (id = '', data) => {
  return apiClient.put(`/users/${id}`, data);
};

export const getCurrent = () => {
  return apiClient.get('/users/current');
};
