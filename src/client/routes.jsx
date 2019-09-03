import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { URLS } from 'constants';
import HomeAsync from './components/home/home.async';
import ProfileAsync from './components/profile/profile.async';
import NotFound from './components/not-found';

const key = (title) => {
  return module.hot ? Math.random().toString() : title;
};

// key={Math.random()} - is a workaround for work of the hmr with react-loadable
// https://medium.com/@giang.nguyen.dev/hot-loader-with-react-loadable-c8f70c8ce1a6
const routes = () => (
  <Switch>
    <Route exact path="/" component={HomeAsync} key={key('index')} />
    <Route path="/profile" component={ProfileAsync} key={key('profile')} />
    <Route path={URLS.NOT_FOUND} component={NotFound} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default routes;
