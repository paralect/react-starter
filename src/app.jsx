import React, { useContext } from 'react';
import { Router } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import history from 'services/history.service';
import * as loaderService from 'services/loader.service';
import * as socketService from 'services/socket.service';
import api from 'services/api.service';

import { ContextStoreProvider, StoreContext } from 'resources/store';
import { userActions } from 'resources/user/user.actions';

import Toast from 'components/toast';
import Loading from 'components/loading';
import { ErrorBoundary } from 'components/error-boundary';

import { routes, scope, layout } from 'routes';
import AuthLayout from 'layouts/auth';
import MainLayout from 'layouts/main';
import SignIn from 'pages/sign-in';
import SignUp from 'pages/sign-up';
import Forgot from 'pages/forgot';
import Reset from 'pages/reset';
import Home from 'pages/home';
import NotFound from 'pages/not-found';

import 'styles/main.pcss';

const Profile = React.lazy(() => import('./pages/profile'));

function PrivateScope({ children }) {
  const { state, dispatch } = useContext(StoreContext);
  const { user } = state;

  React.useEffect(() => {
    socketService.connect();

    api.on('error', (error) => {
      if (error.status === 401) {
        userActions.signOut(dispatch);
      }
    });

    socketService.on('connect', () => {
      socketService.emit('subscribe', `user-${user?._id}`);
    });

    socketService.on('user:updated', (updatedUser) => {
      userActions.setUser(dispatch, { user: updatedUser });
    });

    return () => socketService.disconnect();
  }, [user?._id, dispatch]);

  if (!user) {
    const searchParams = new URLSearchParams({ to: window.location.pathname });
    const search = window.location.pathname === '/' ? null : searchParams.toString();

    return <Redirect to={routes.signIn.url({ search })} />;
  }

  return children;
}

const routeToComponent = {
  [routes.signIn.name]: SignIn,
  [routes.signUp.name]: SignUp,
  [routes.forgot.name]: Forgot,
  [routes.reset.name]: Reset,
  [routes.home.name]: Home,
  [routes.profile.name]: Profile,
  [routes.notFound.name]: NotFound,
};

const scopeToComponent = {
  [scope.PRIVATE]: PrivateScope,
  [scope.PUBLIC]: ({ children }) => children,
};

const layoutToComponent = {
  [layout.MAIN]: MainLayout,
  [layout.AUTH]: AuthLayout,
  [layout.NONE]: ({ children }) => children,
};

const spaces = [];

Object.values(scope).forEach((s, scopeIndex) => {
  Object.values(layout).forEach((l, layoutIndex) => {
    spaces.push({
      id: `scope-${scopeIndex}-layout-${layoutIndex}`,
      scope: scopeToComponent[s],
      layout: layoutToComponent[l],
      routes: Object.values(routes).filter((r) => r.scope === s && r.layout === l),
    });
  });
});

function App() {
  const [loading, setLoading] = React.useState(true);
  const { dispatch } = useContext(StoreContext);

  React.useEffect(() => {
    async function init() {
      try {
        await userActions.getCurrentUser(dispatch);
      } catch (error) {
        // @todo: add something like sentry
      } finally {
        setLoading(false);
        loaderService.hide();
      }
    }

    init();
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
      <Router history={history}>
        <ErrorBoundary fallback={<h1>Error!</h1>}>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              {spaces.map((space) => (
                <Route key={space.id} exact path={space.routes.map((r) => r.path)}>
                  <space.scope>
                    <space.layout>
                      <Switch>
                        {space.routes.map((r) => (
                          <Route
                            key={r.name}
                            exact={r.exact}
                            path={r.path}
                            component={routeToComponent[r.name]}
                          />
                        ))}
                      </Switch>
                    </space.layout>
                  </space.scope>
                </Route>
              ))}
              <Route path="*" component={NotFound} />
            </Switch>
          </React.Suspense>
        </ErrorBoundary>
      </Router>

      <Toast />
    </>
  );
}

const Root = () => (
  <ContextStoreProvider>
    <App />
  </ContextStoreProvider>
);

export default Root;
