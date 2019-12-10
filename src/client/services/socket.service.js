import io from 'socket.io-client';

import config from 'config';
import store from 'resources/store';
import { getAccessToken } from 'helpers/token.helper';
import * as fromUser from 'resources/user/user.selectors';
import userHandler from 'resources/user/user.socket-handler';


export const connect = () => {
  const socket = io(config.webSocketUrl, {
    transports: ['websocket'],
    query: { accessToken: getAccessToken() },
  });

  socket.on('connect', () => {
    console.log('WS connected'); // eslint-disable-line no-console
    const userId = fromUser.getUserId(store.getState());
    socket.emit('subscribe', `user-${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('WS disconnected'); // eslint-disable-line no-console
  });

  userHandler(socket);
};
