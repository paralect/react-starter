import * as socketService from 'services/socket.service';

import { routes } from 'routes';

import * as api from './user.api';

export const signIn = ({ email, password }) => async (dispatch) => {
  const user = await api.signIn({
    email,
    password,
  });
  dispatch({ type: 'user:set', payload: { user } });
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
  dispatch({ type: 'user:delete' });
  socketService.disconnect();
};

export const getCurrentUser = () => async (dispatch) => {
  const user = await api.getCurrentUser();
  dispatch({ type: 'user:set', payload: { user } });
};

export const updateCurrentUser = (data) => async (dispatch) => {
  const user = await api.updateCurrentUser(data);
  dispatch({ type: 'user:set', payload: { user } });
};
