import { Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  session: (a: SessionData) => void;
  'player:online': (a: string) => void
  'game:invitation': (a: string) => void
  'step:rival': (a: string) => void
  userID: string
}

export interface ClientToServerEvents {
  'player:online': void;
  'step:send': (a: string, s: string) => void
  'game:play': (a: string) => void
}

interface SessionData {
  sessionID: string,
  userID: string
}

export interface CustomSocket extends Socket<ServerToClientEvents, ClientToServerEvents> {
  userID: string
}
