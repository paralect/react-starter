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
  signIn: {
    ...defaults,
    name: 'signIn',
    path: '/signin',
    exact: false,
    private: false,
  },
  signUp: {
    ...defaults,
    name: 'signUp',
    path: '/signup',
    exact: false,
    private: false,
  },
  forgot: {
    ...defaults,
    name: 'forgot',
    path: '/forgot',
    exact: false,
    private: false,
  },
  reset: {
    ...defaults,
    name: 'reset',
    path: '/reset',
    exact: false,
    private: false,
  },
  home: {
    ...defaults,
    name: 'home',
    path: '/',
    exact: true,
    private: true,
  },
  profile: {
    ...defaults,
    name: 'profile',
    path: '/profile',
    exact: false,
    private: true,
  },
  notFound: {
    ...defaults,
    name: 'notFound',
    path: '/404',
  },
};
