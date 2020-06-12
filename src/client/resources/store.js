import * as redux from 'redux';
import thunk from 'redux-thunk';

import history from 'services/history.service';

import reducer from './reducer';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;

const store = redux.createStore(
  reducer,
  compose(
    redux.applyMiddleware(thunk.withExtraArgument({ history })),
  ),
);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer);
  });
}

export default store;
