import { createSlice } from '@reduxjs/toolkit';

import * as socketService from 'services/socket.service';

import { routes } from 'routes';

import * as api from './user.api';

const initialState = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload.user,
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const signIn = ({ email, password }) => async (dispatch) => {
  const user = await api.signIn({
    email,
    password,
  });
  dispatch(setUser({ user }));
};

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}) => async () => {
  const { signupToken } = await api.signUp({
    firstName,
    lastName,
    email,
    password,
  });

  return { signupToken };
};

export const forgot = ({ email }) => async () => {
  await api.forgot({ email });
};

export const reset = ({ password, token }) => async (_dispatch, _getState, ctx) => {
  await api.reset({ password, token });
  ctx.history.push(routes.signIn.path);
};

export const signOut = () => async (dispatch) => {
  await api.signOut();
  dispatch(removeUser());
  socketService.disconnect();
};

export const getCurrentUser = () => async (dispatch) => {
  const user = await api.getCurrentUser();
  dispatch(setUser({ user }));
};

export const updateCurrentUser = (data) => async (dispatch) => {
  const user = await api.updateCurrentUser(data);
  dispatch(setUser({ user }));
};

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
