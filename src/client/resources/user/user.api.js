import { apiClient } from 'services/api';

export const signIn = ({
  email,
  password,
}) => {
  return apiClient.post('/account/signin', {
    email,
    password,
  });
};

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}) => {
  return apiClient.post('/account/signup', {
    firstName,
    lastName,
    email,
    password,
  });
};

export const forgot = ({ email }) => {
  return apiClient.post('/account/forgot-password', { email });
};

export const reset = ({ password, token }) => {
  return apiClient.put('/account/reset-password', { password, token });
};

export const signOut = () => {
  return apiClient.post('/account/logout');
};

export const getCurrentUser = () => {
  return apiClient.get('/users/current');
};

export const updateCurrentUser = (data) => {
  return apiClient.put('/users/current', data);
};
