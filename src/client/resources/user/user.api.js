import { apiClient } from 'services/api';


export const updateCurrent = (data) => {
  return apiClient.put('/users/current', data);
};

export const fetchCurrent = () => {
  return apiClient.get('/users/current');
};
