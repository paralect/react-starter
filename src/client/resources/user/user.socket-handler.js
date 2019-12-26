import store from 'resources/store';

import * as fromUser from './user.selectors';


export default (socket) => {
  const userId = fromUser.getUserId(store.getState());
  socket.emit('subscribe', `user-${userId}`);

  socket.on('user:updated', (user) => {
    store.dispatch({ type: 'UPDATE_CURRENT_USER', payload: user });
  });
};
