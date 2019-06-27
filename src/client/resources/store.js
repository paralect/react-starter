// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import type { BrowserHistory } from 'history';

import createRootReducer from './reducer';
import type { StoreType, StateType } from './types';

const configureStore = (initialState: StateType, history: BrowserHistory): StoreType => {
  const store: StoreType = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(routerMiddleware(history), thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f, // eslint-disable-line
    ),
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
};

export default configureStore;
