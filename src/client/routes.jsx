import React from 'react';
import { Switch, Route, generatePath } from 'react-router-dom';

import Home from 'views/home';
import Profile from 'views/profile';
import NotFound from 'views/not-found';


const routesList = [{
  name: 'home',
  path: '/',
  exact: true,
  component: Home,
}, {
  name: 'profile',
  path: '/profile',
  exact: false,
  component: Profile,
}, {
  name: 'notFound',
  path: '/not-found',
  exact: false,
  component: NotFound,
}];

// key={Math.random()} - is a workaround for work of the hmr with react-loadable
// https://medium.com/@giang.nguyen.dev/hot-loader-with-react-loadable-c8f70c8ce1a6
const key = (title) => {
  return module.hot ? Math.random().toString() : title;
};

export const RoutesComponent = () => {
  const routes = routesList.map(route => (
    <Route
      key={key(route.name)}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  ));

  return (
    <Switch>
      {routes}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default routesList.reduce((routes, route) => {
  return {
    ...routes,
    [route.name]: (options = {}) => ({
      ...options,
      pathname: generatePath(route.path, options.params),
    }),
  };
}, {});
