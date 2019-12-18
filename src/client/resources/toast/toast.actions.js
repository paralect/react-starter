import uuidv4 from 'uuid/v4';


const DISPLAY_TIME = 3000;

const hideAfterTimeout = (dispatch, id) => {
  setTimeout(() => {
    dispatch({ type: 'REMOVE_MESSAGE', id });
  }, DISPLAY_TIME);
};

const addMessage = (dispatch, data) => {
  const id = uuidv4();

  hideAfterTimeout(dispatch, id);

  dispatch({ type: 'ADD_MESSAGE', message: { ...data, id } });
};

export const addErrorMessage = (title, text, isHTML = false) => (dispatch) => {
  addMessage(dispatch, {
    type: 'error',
    title,
    text,
    isHTML,
  });
};

export const addSuccessMessage = (title, text, isHTML = false) => (dispatch) => {
  addMessage(dispatch, {
    type: 'success',
    title,
    text,
    isHTML,
  });
};

export const removeMessage = (id) => {
  return { type: 'REMOVE_MESSAGE', id };
};
