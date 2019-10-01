import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Layout from 'layout';
import store from 'resources/store';
import history from 'services/history.service';
import * as userActions from 'resources/user/user.actions';
import * as socketService from 'services/socket.service';

import styles from './index.styles';


const minLoadingTime = 1500;
const now = Date.now();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>
);

async function renderApp() {
  const rootEl = document.getElementById('root');

  if (!(rootEl instanceof Element)) {
    throw new Error('invalid type');
  }

  try {
    await store.dispatch(userActions.fetchCurrentUser());
    socketService.connect();
  } catch (error) {
    console.log(error); // eslint-disable-line
  }

  ReactDOM.render(
    <Root />,
    rootEl,
  );
}

const hidePoster = () => {
  const poster = document.getElementById('poster');
  const html = document.documentElement;
  if (!(poster instanceof Element) || !(html instanceof Element)) {
    return;
  }
  poster.classList.add(styles.posterHidden);

  setTimeout(() => {
    poster.classList.add(styles.posterNone);
    html.classList.remove('show-poster');
  }, 600);
};

renderApp();

if (now - window.loadingTime > minLoadingTime) {
  hidePoster();
} else {
  setTimeout(hidePoster, minLoadingTime - (now - window.loadingTime));
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp();
  });
}
