import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import Layout from 'layout';
import store from 'resources/store';
import history from 'services/history.service';

import Loading from 'components/loading';
import { ErrorBoundary } from 'components/error-boundary';

import { routes } from 'routes';
import Home from 'views/home';
import NotFound from 'views/not-found';

const Profile = React.lazy(() => import('./views/profile'));

const view = {
  [routes.home.name]: Home,
  [routes.profile.name]: Profile,
  [routes.notFound.name]: NotFound,
};

export function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary fallback={<h1>Error!</h1>}>
          <Layout>
            <React.Suspense fallback={<Loading />}>
              <Switch>
                {Object.values(routes).map((route) => (
                  <Route
                    key={route.name}
                    exact={route.exact}
                    path={route.path}
                    component={view[route.name]}
                  />
                ))}
                <Route path="*" component={NotFound} />
              </Switch>
            </React.Suspense>
          </Layout>
        </ErrorBoundary>
      </ConnectedRouter>
    </Provider>
  );
}
