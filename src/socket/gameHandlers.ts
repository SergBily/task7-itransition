import { Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../models/SocketModel';

class GameHandlers {
  static socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  static sendStep(a: string, m: string) {
    this.socket.emit('step:send', a, m);
  }

  static startGame(m: string) {
    this.socket.emit('game:play', m);
  }
}

export default GameHandlers;
