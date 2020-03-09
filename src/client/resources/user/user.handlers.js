import store from 'resources/store';

import { apiClient } from 'services/api';

import * as selectors from './user.selectors';
import * as actions from './user.actions';


apiClient.on('error', (error) => {
  if (error.status === 401) {
    store.dispatch(actions.signOut());
  }
});

export function attachSocketEvents(socket) {
  const userId = selectors.getUserId(store.getState());
  socket.emit('subscribe', `user-${userId}`);

  socket.on('user:updated', (user) => {
    store.dispatch({ type: 'user:set', payload: { user } });
  });
}
