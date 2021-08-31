import uniqueId from 'lodash/uniqueId';

const ADD_MESSAGE = 'ADD_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

const createToast = (dispatch, data) => {
  const id = uniqueId('toast_');
  dispatch({ type: ADD_MESSAGE, payload: { id, ...data } });
  setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), 3000);
};

const removeToast = (dispatch, id) => {
  dispatch({ type: REMOVE_MESSAGE, payload: id });
};

export const toastActions = {
  createToast,
  removeToast,
};
