import * as socketService from 'services/socket.service';
import { routes } from 'routes';
import * as api from './user.api';

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const signIn = async (dispatch, { email, password }) => {
  const user = await api.signIn({
    email,
    password,
  });
  dispatch({ type: SET_USER, payload: user });

  return user;
};

const setUser = async (dispatch, data) => {
  dispatch({ type: SET_USER, payload: data });

  return data;
};

const signUp = async (dispatch, {
  firstName,
  lastName,
  email,
  password,
}) => {
  const resp = await api.signUp({
    firstName,
    lastName,
    email,
    password,
  });

  return resp;
};

const forgot = async ({ email }) => {
  await api.forgot({ email });
};

const reset = async ({ password, token }) => async (_dispatch, _getState, ctx) => {
  await api.reset({ password, token });
  ctx.history.push(routes.signIn.path);
};

const signOut = async (dispatch) => {
  await api.signOut();
  dispatch({ type: REMOVE_USER });
  socketService.disconnect();
};

const getCurrentUser = async (dispatch) => {
  const user = await api.getCurrentUser();
  dispatch({ type: SET_USER, payload: user });

  return user;
};

const updateCurrentUser = async (dispatch, data) => {
  const user = await api.updateCurrentUser(data);
  dispatch({ type: SET_USER, payload: user });

  return user;
};

export const userActions = {
  setUser,
  signIn,
  signUp,
  forgot,
  reset,
  signOut,
  getCurrentUser,
  updateCurrentUser,
};
