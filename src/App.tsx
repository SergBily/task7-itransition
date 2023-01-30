import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Game from './components/Game';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isUser: boolean = !!localStorage.getItem('sessionID');
    if (isUser) {
      // SocketControl.reconnect();
      navigate('/mail');
    }
  }, []);

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
