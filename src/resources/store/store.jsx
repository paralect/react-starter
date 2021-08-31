import React, { useCallback, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { initialState, reducer } from './reducer';

export const StoreContext = createContext();

const ContextStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunk = useCallback((action) => {
    if (typeof action === 'function') {
      return action(dispatch, state);
    }
    return dispatch(action);
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch: thunk }}>
      {children}
    </StoreContext.Provider>
  );
};

ContextStoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextStoreProvider;
