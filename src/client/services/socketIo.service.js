import io from 'socket.io-client';

export const socket = io(window.config.webSocketUrl, { transports: ['websocket'], query: { token: window.token } });

socket.on('connect', () => {
  console.log('WS connected'); //eslint-disable-line
  socket.emit('subscribe', `user-${window.user._id}`);
});

socket.on('disconnect', () => {
  console.log('WS disconnected'); //eslint-disable-line
});
