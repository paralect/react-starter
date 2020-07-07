import React from 'react';
import { generatePath } from 'react-router-dom';

import SignIn from 'pages/sign-in';
import SignUp from 'pages/sign-up';
import Forgot from 'pages/forgot';
import Reset from 'pages/reset';
import Home from 'pages/home';
import NotFound from 'pages/not-found';

import 'styles/main.pcss';

const Profile = React.lazy(() => import('./pages/profile'));

export const scope = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export const layout = {
  AUTH: 'auth',
  MAIN: 'main',
  NONE: null,
};

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
    scope: scope.PUBLIC,
    layout: layout.AUTH,
    component: SignIn,
  },
  signUp: {
    ...defaults,
    name: 'signUp',
    path: '/signup',
    exact: false,
    scope: scope.PUBLIC,
    layout: layout.AUTH,
    component: SignUp,
  },
  forgot: {
    ...defaults,
    name: 'forgot',
    path: '/forgot',
    exact: false,
    scope: scope.PUBLIC,
    layout: layout.AUTH,
    component: Forgot,
  },
  reset: {
    ...defaults,
    name: 'reset',
    path: '/reset',
    exact: false,
    scope: scope.PUBLIC,
    layout: layout.AUTH,
    component: Reset,
  },
  home: {
    ...defaults,
    name: 'home',
    path: '/',
    exact: true,
    scope: scope.PRIVATE,
    layout: layout.MAIN,
    component: Home,
  },
  profile: {
    ...defaults,
    name: 'profile',
    path: '/profile',
    exact: false,
    private: true,
    scope: scope.PRIVATE,
    layout: layout.MAIN,
    component: Profile,
  },
  notFound: {
    ...defaults,
    name: 'notFound',
    path: '/404',
    scope: scope.PUBLIC,
    layout: layout.NONE,
    component: NotFound,
  },
};
