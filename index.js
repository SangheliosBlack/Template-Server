import dotenv from 'dotenv';
import Server from './app.js';

dotenv.config();

const server = new Server();

server.listen();