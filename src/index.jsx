import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as Sentry from '@sentry/browser';

import React from 'react';
import ReactDOM from 'react-dom';

import config from 'config';

import App from './app';

Sentry.init({
  dsn: config.dsnSentryUrl,
});

function render() {
  ReactDOM.render(<App />, document.querySelector('#root'));
}

render();
