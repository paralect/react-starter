import { routes } from 'routes';

import * as api from './user.api';

export const signIn = ({
  email,
  password,
}) => async (dispatch, _, ctx) => {
  const { data: user } = await api.signIn({
    email,
    password,
  });
  dispatch({ type: 'user:set', payload: { user } });

  const searchParams = new URLSearchParams(window.location.search);
  ctx.history.push(searchParams.get('to') || routes.home.path);
};

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}) => async () => {
  const { data } = await api.signUp({
    firstName,
    lastName,
    email,
    password,
  });

  return {
    signupToken: data.signupToken,
  };
};

export const forgot = ({ email }) => async () => {
  await api.forgot({ email });
};

export const reset = ({ password, token }) => async (dispatch, _, ctx) => {
  await api.reset({ password, token });
  ctx.history.push(routes.signIn.path);
};

export const signOut = () => async (dispatch) => {
  await api.signOut();
  dispatch({ type: 'user:delete' });
};

export const getCurrentUser = () => async (dispatch) => {
  const { data: user } = await api.getCurrentUser();
  dispatch({ type: 'user:set', payload: { user } });
};

export const updateCurrentUser = (data) => async (dispatch) => {
  const { data: user } = await api.updateCurrentUser(data);
  dispatch({ type: 'user:set', payload: { user } });
};
