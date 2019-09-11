import io from 'socket.io-client';
import config from 'config';

export const socket = io(config.webSocketUrl, { transports: ['websocket'], query: { token: window.token } });

socket.on('connect', () => {
  console.log('WS connected'); //eslint-disable-line
  socket.emit('subscribe', `user-${window.user._id}`);
});

socket.on('disconnect', () => {
  console.log('WS disconnected'); //eslint-disable-line
});
