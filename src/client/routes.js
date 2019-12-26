import { generatePath } from 'react-router-dom';

const defaults = {
  url(options = {}) {
    return {
      ...options,
      pathname: generatePath(this.path, options.params),
    };
  },
};

export const routes = {
  home: {
    ...defaults,
    name: 'home',
    path: '/',
    exact: true,
  },
  profile: {
    ...defaults,
    name: 'profile',
    path: '/profile',
    exact: false,
  },
  notFound: {
    ...defaults,
    name: 'notFound',
    path: '/not-found',
    exact: false,
  },
};
