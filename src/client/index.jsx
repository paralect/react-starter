import React from 'react';
import ReactDOM from 'react-dom';

import store from 'resources/store';
import * as userActions from 'resources/user/user.actions';
import * as socketService from 'services/socket.service';

import { App } from './app';

import styles from './index.styles';

const minLoadingTime = 1500;
const now = Date.now();

async function renderApp() {
  const rootEl = document.getElementById('root');
  if (!(rootEl instanceof Element)) {
    throw new Error('invalid type');
  }

  try {
    await store.dispatch(userActions.fetchCurrentUser());
    socketService.connect();
  } catch (error) {
    console.log(error); // eslint-disable-line no-console
  }

  ReactDOM.render(
    <App />,
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
