import { Server as SocketIOServer } from 'socket.io';

let io;

export function initializeSocketServer(server) {
  io = new SocketIOServer(server);
  io.on('connection', (client) => {
    console.log('New client connected');
  });
}

export function getSocketServer() {
  if (!io) {
    throw new Error('Socket server not initialized');
  }
  return io;
}