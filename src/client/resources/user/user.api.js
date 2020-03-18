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
  return apiClient.post('/account/forgotPassword', { email });
};

export const reset = ({ password, token }) => {
  return apiClient.post('/account/resetPassword', { password, token });
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
