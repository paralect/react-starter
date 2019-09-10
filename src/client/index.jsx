import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from 'app';

import store from 'resources/store';
import history from 'resources/browserHistory';

import styles from './styles.pcss';

const minLoadingTime = 1500;
const now = Date.now();

require('resources/user/user.socket-handler');

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

const renderApp = () => {
  const rootEl = document.getElementById('root');
  if (!(rootEl instanceof Element)) {
    throw new Error('invalid type');
  }

  ReactDOM.render(
    <Root />,
    rootEl,
  );
};

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
