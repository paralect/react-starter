import { apiClient } from 'services/api';
import * as socketService from 'services/socket.service';

import store from 'resources/store';

import * as selectors from './user.selectors';
import * as actions from './user.actions';

apiClient.on('error', (error) => {
  if (error.status === 401) {
    store.dispatch(actions.signOut());
  }
});

socketService.on('connect', () => {
  const userId = selectors.getUserId(store.getState());
  socketService.send('subscribe', `user-${userId}`);
});

socketService.on('user:updated', (user) => {
  store.dispatch({ type: 'user:set', payload: { user } });
});
