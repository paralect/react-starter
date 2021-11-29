import api from 'services/api.service';

export const signUp = (data) => api.post('/account/sign-up', data);
export const signIn = (data) => api.post('/account/sign-in', data);
export const signOut = () => api.post('/account/sign-out');
export const forgotPassword = (data) => api.post('/account/forgot-password', data);
export const resetPassword = (data) => api.put('/account/reset-password', data);
export const updateProfile = (data) => api.post('/account/update-profile', data);

export const getCurrentUser = () => api.get('/users/current');
