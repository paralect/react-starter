import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
} from './toast.actions';


const defaultState = {
  messages: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        messages: [...state.messages, action.message],
      };

    case REMOVE_MESSAGE:
      return {
        messages: state.messages.filter((message) => message.id !== action.id),
      };

    default:
      return state;
  }
};
