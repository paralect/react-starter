import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducer';

const initialState = {
  user: window.user,
  toast: {
    messages: [],
  },
};

const configureStore = (initState, history) => {
  const store = createStore(
    createRootReducer(history),
    initState,
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

export const history = createBrowserHistory();
export const store = configureStore(initialState, history);
