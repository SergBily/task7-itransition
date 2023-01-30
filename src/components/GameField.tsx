import React, { useState } from 'react';

const GameField = () => {
  const [move, setMove] = useState<boolean>();

  const step = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(move);
    setMove(true);

    console.log(e.target);
  };

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
      <div aria-label="output" id="output">Red is Winner</div>
    </div>
  );
};

export default GameField;
