import io from 'socket.io-client';

import config from 'config';
import { getAccessToken } from 'helpers/token.helper';
import * as userHandlers from 'resources/user/user.handlers';


let socket; // eslint-disable-line import/no-mutable-exports

export const emit = (event, ...args) => {
  if (!socket) return;
  socket.emit(event, ...args);
};

export const on = (event, callback) => {
  if (!socket) return;
  socket.on(event, callback);
};

export const connect = async () => {
  socket = io(config.webSocketUrl, {
    transports: ['websocket'],
    query: { accessToken: getAccessToken() },
  });

  socket.on('connect', () => {
    console.log('WS connected'); // eslint-disable-line no-console
    userHandlers.attachSocketEvents({ on, emit });
  });

  socket.on('disconnect', () => {
    console.log('WS disconnected'); // eslint-disable-line no-console
  });
};

export const disconnect = () => {
  if (!socket) return;
  socket.disconnect();
};

export const disconnected = () => {
  return !socket || socket.disconnected;
};

export const connected = () => {
  return socket && socket.connected;
};
