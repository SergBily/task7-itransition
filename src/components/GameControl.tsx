import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHandlers from '../socket/gameHandlers';
import socket, { SocketControl } from '../socket/socket';

const GameControl = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<string[]>([]);
  const uniqueKey = () => Math.random();
  const exit = async () => {
    SocketControl.disconnect();
    navigate('/');
  };

  socket.on('player:online', (userName) => {
    setUsers([...users, userName]);
  });

  const getName = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { room } = (e.target as HTMLButtonElement).dataset;

    GameHandlers.startGame(room as string);
    localStorage.setItem('plaing', room as string);
  };

  return (
    <div>
      <button type="button" onClick={exit}>exit</button>
      <div>
        {users.map((user) => (
          <button
            style={{ marginTop: '15px', width: '40px', height: '30px' }}
            type="button"
            data-room={user}
            key={uniqueKey()}
            onClick={getName}
          >
            {user}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameControl;
