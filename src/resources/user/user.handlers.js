import api from 'services/api.service';
import * as socketService from 'services/socket.service';

import store from 'resources/store';

import * as selectors from './user.selectors';
import * as actions from './user.actions';

api.on('error', (error) => {
  if (error.status === 401) {
    store.dispatch(actions.signOut());
  }
});

socketService.on('connect', () => {
  const user = selectors.getUser(store.getState());
  socketService.send('subscribe', `user-${user._id}`);
});

socketService.on('user:updated', (user) => {
  store.dispatch({ type: 'user:set', payload: { user } });
});
