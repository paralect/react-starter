import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import reducer from './reducer';
import history from './browserHistory';

const initialState = {
  user: window.user,
  toast: {
    messages: [],
  },
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(routerMiddleware(history), thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f, // eslint-disable-line
  ),
);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer);
  });
}

export default store;
