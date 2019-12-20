import React from 'react';
import { Switch, Route, generatePath } from 'react-router-dom';

import Loading from 'components/loading';
import { ErrorBoundary } from 'components/error-boundary';

import Home from 'views/home';
import NotFound from 'views/not-found';

const Profile = React.lazy(() => import('./views/profile'));

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

export const RoutesComponent = () => {
  const routes = routesList.map((route) => (
    <Route
      key={route.name}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  ));

  return (
    <ErrorBoundary fallback={<h1>Error!</h1>}>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          {routes}
          <Route path="*" component={NotFound} />
        </Switch>
      </React.Suspense>
    </ErrorBoundary>
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
