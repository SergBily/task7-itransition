import { io, Socket } from 'socket.io-client';
import { toast } from 'react-toastify';
import SERVER_URL from '../environment';
import { ClientToServerEvents, ServerToClientEvents } from '../models/SocketModel';
import gameProcess from '../service/GameProcess';
import GameHandlers from './gameHandlers';
import userHandlers from './userHandlers';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_URL,
  { autoConnect: false },
);

export class SocketControl {
  static isUserName = false;

  static setUserName(userName: string): void {
    this.isUserName = true;
    socket.auth = { userName };
    socket.connect();
    userHandlers(socket);
    GameHandlers.socket = socket;
  }

  static reconnect() {
    const sessionID = localStorage.getItem('sessionID');
    const userID = localStorage.getItem('userID');
    const userName = localStorage.getItem('name');
    this.isUserName = true;
    socket.auth = { sessionID, userID, userName };
    socket.connect();
    GameHandlers.socket = socket;
  }

  static disconnect() {
    localStorage.removeItem('name');
    localStorage.removeItem('sessionID');
    localStorage.removeItem('userID');
    socket.disconnect();
  }
}

socket.on('step:rival', (m: string) => {
  gameProcess.setStep(m);
});

socket.on('game:invitation', (m: string) => {
  toast.success(`you invitation to game ${m}`, { autoClose: 2000, position: 'bottom-right' });
});

export default socket;
