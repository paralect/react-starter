import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'views/home';
import Profile from 'views/profile';
import NotFound from 'views/not-found';
import { routesList } from 'routesList';


const routesMap = {
  home: Home,
  profile: Profile,
  notFound: NotFound,
};

// key={Math.random()} - is a workaround for work of the hmr with react-loadable
// https://medium.com/@giang.nguyen.dev/hot-loader-with-react-loadable-c8f70c8ce1a6
const key = (title) => {
  return module.hot ? Math.random().toString() : title;
};

export default () => {
  const routes = routesList.map((route) => (
    <Route
      key={key(route.name)}
      exact={route.exact}
      path={route.path}
      component={routesMap[route.name]}
    />
  ));

  return (
    <Switch>
      {routes}
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
