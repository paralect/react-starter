import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext();

export const initialState = {
  user: null,
  toast: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        toast: [...state.toast, action.payload],
      };
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        toast: state.toast.filter((message) => message.id !== action.payload),
      };
    default:
      throw new Error();
  }
};

export const ContextStoreProvider = ({ children }) => { // eslint-disable-line react/prop-types
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
