import uniqueId from 'lodash/uniqueId';

import * as socketService from 'services/socket.service';
import * as api from 'resources/user/user.api';

const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

const createToast = (data) => (dispatch) => {
  const id = uniqueId('toast_');
  dispatch({ type: ADD_MESSAGE, payload: { id, ...data } });
  setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), 3000);
};

const removeToast = (id) => (dispatch) => {
  dispatch({ type: REMOVE_MESSAGE, payload: id });
};

const signIn = ({ email, password }) => async (dispatch) => {
  const user = await api.signIn({
    email,
    password,
  });
  dispatch({ type: SET_USER, payload: user });

  return user;
};

const setUser = (data) => (dispatch) => {
  dispatch({ type: SET_USER, payload: data });

  return data;
};

const signOut = () => async (dispatch) => {
  await api.signOut();
  dispatch({ type: REMOVE_USER });
  socketService.disconnect();
};

const getCurrentUser = () => async (dispatch) => {
  const user = await api.getCurrentUser();
  dispatch({ type: SET_USER, payload: user });

  return user;
};

const updateCurrentUser = (data) => async (dispatch) => {
  const user = await api.updateCurrentUser(data);
  dispatch({ type: SET_USER, payload: user });

  return user;
};

export default {
  setUser,
  signIn,
  signOut,
  getCurrentUser,
  updateCurrentUser,
  createToast,
  removeToast,
};
