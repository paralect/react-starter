import io from 'socket.io-client';

import config from 'config';
import { getAccessToken } from 'helpers/token.helper';
import userHandler from 'resources/user/user.socket-handler';


let socket; // eslint-disable-line import/no-mutable-exports

export const connect = () => {
  socket = io(config.webSocketUrl, {
    transports: ['websocket'],
    query: { accessToken: getAccessToken() },
  });

  socket.on('connect', () => {
    console.log('WS connected'); // eslint-disable-line no-console
    userHandler(socket);
  });

  socket.on('disconnect', () => {
    console.log('WS disconnected'); // eslint-disable-line no-console
  });
};

export {
  socket,
};
