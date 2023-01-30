import gsap from 'gsap';
import React, {
  useEffect, useState,
} from 'react';
import GameHandlers from '../socket/gameHandlers';

const GameField = () => {
  const [gameOver, setgameOver] = useState<string>('');
  const step = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedSquare = e.target as HTMLButtonElement;
    const numberSquare = selectedSquare.getAttribute('aria-label') as string;
    const room: string = localStorage.getItem('plaing') ?? '';
    GameHandlers.sendStep(numberSquare, room);
    setgameOver('');
  };

  useEffect(() => {
    gsap.fromTo(
      '.main',
      {
        scale: 0,
        duration: 1,
        stagger: {
          each: 0.8,
          grid: 'auto',
          from: 'center',
        },
      },
      {
        scale: 1,
        duration: 1,
      },
    );
  }, []);

  return (
    <div className="container">
      <div className="main">
        <button type="button" className="box" aria-label="d1" id="d1" onClick={step} />
        <button type="button" className="box" aria-label="d2" id="d2" onClick={step} />
        <button type="button" className="box" aria-label="d3" id="d3" onClick={step} />
        <button type="button" className="box" aria-label="d4" id="d4" onClick={step} />
        <button type="button" className="box" aria-label="d5" id="d5" onClick={step} />
        <button type="button" className="box" aria-label="d6" id="d6" onClick={step} />
        <button type="button" className="box" aria-label="d7" id="d7" onClick={step} />
        <button type="button" className="box" aria-label="d8" id="d8" onClick={step} />
        <button type="button" className="box" aria-label="d9" id="d9" onClick={step} />
      </div>
      <div aria-label="output" id="output">{gameOver}</div>
    </div>
  );
};

export default GameField;
