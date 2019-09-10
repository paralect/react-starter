import { socket } from 'services/socketIo.service';
import store from 'resources/store';
import { UPDATE_USER } from 'resources/user/user.actions';

socket.on('user:updated', (user) => {
  store.dispatch({ type: UPDATE_USER, payload: user });
});
