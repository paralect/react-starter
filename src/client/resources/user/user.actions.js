import * as api from './user.api';


export const FETCH_CURRENT_USER = 'fetchCurrentUser';
export const UPDATE_CURRENT_USER = 'updateCurrentUser';

export const fetchCurrentUser = () => async (dispatch) => {
  const { data } = await api.fetchCurrent();
  dispatch({ type: FETCH_CURRENT_USER, payload: data });

  return data;
};

export const updateCurrentUser = (updated) => async (dispatch) => {
  const { data } = await api.updateCurrent(updated);
  dispatch({ type: UPDATE_CURRENT_USER, payload: data });

  return data;
};
