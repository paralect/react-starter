import store from 'resources/store';
import {
  UPDATE_CURRENT_USER,
} from 'resources/user/user.actions-list';


export default (socket) => {
  socket.on('user:updated', (user) => {
    store.dispatch({ type: UPDATE_CURRENT_USER, payload: user });
  });
};
