// If you use this starter with .NET back-end then
// follow the instructions below, otherwise delete this file.

// 1. Uninstall `socket.io-client` and delete `socketIo.service.js`
// 2. Install `@microsoft/signalr`
// 3. Change imports from `socketIo.service` to `signalR.service`

import config from 'config';
import * as userHandlers from 'resources/user/user.handlers';
import * as signalR from '@microsoft/signalr'; // eslint-disable-line import/no-unresolved

let connection;

export const emit = (event, ...args) => {
  connection.invoke(event, ...args);
};

export const on = (event, callback) => {
  connection.on(event, callback);
};

export const connect = () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(config.webSocketUrl)
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => {
      console.log('WS connected!'); // eslint-disable-line no-console
      userHandlers.attachSocketEvents({ on, emit });
    });
};

export const disconnect = () => {
  if (connection) {
    connection.stop();
  }
};

export const connected = () => {
  return connection && connection.state === signalR.HubConnectionState.Connected;
};

export const disconnected = () => {
  return !connected();
};
