import api from 'services/api.service';
import * as socketService from 'services/socket.service';

import store from 'resources/store';

import { selectUser, setUser, signOut } from './user.slice';

api.on('error', (error) => {
  if (error.status === 401) {
    store.dispatch(signOut());
  }
});

socketService.on('connect', () => {
  const user = selectUser(store.getState());
  socketService.emit('subscribe', `user-${user._id}`);
});

socketService.on('user:updated', (user) => {
  store.dispatch(setUser({ user }));
});
