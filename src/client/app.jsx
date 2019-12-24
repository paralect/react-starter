import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import Layout from 'layout';
import store from 'resources/store';
import history from 'services/history.service';

import { routes } from 'routes';
import Home from 'views/home';
import Profile from 'views/profile';
import NotFound from 'views/not-found';

const key = (title) => {
  return module.hot ? Math.random().toString() : title;
};

const view = {
  [routes.home.name]: Home,
  [routes.profile.name]: Profile,
  [routes.notFound.name]: NotFound,
};

export function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout>
          <Switch>
            {Object.values(routes).map((route) => (
              <Route
                key={key(route.name)}
                exact={route.exact}
                path={route.path}
                component={view[route.name]}
              />
            ))}
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}
