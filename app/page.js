"use client"
import React, { useState } from 'react';
import XOGameBoard from './components/XOGameBoard';
import XOGameControls from './components/XOGameControls';
import XOGameHistory from './components/XOGameHistory';
import style from "../app/styles/page.module.css"

const Home = () => {
  const [boardSize, setBoardSize] = useState(3); // Default board size
  const [gameHistory, setGameHistory] = useState([]);
  const [replayMove, setReplayMove] = useState(null);

  const handleSizeChange = (size) => {
    setBoardSize(size);
  };

  const updateGameHistory = (move) => {
    setGameHistory((prevHistory) => [...prevHistory, move]);
  };

  const handleResetHistory = () => {
    setGameHistory([]);
    setReplayMove(null);
  };

  const handleReplayMove = (moveIndex) => {
    setReplayMove(moveIndex);
  };

  return (
    <>
      <div className={style.Background}>
        <div className={style.container}>
          <div className={style.containerHeader}>
            <h1 className={style.x}>X</h1>
            <h1 className={style.o}>O</h1>
          </div>
          <XOGameControls onSetSize={handleSizeChange} />
          <XOGameBoard size={boardSize} updateGameHistory={updateGameHistory} onResetHistory={handleResetHistory} replayMove={replayMove} />
        </div>
        <XOGameHistory history={gameHistory} onReplayMove={handleReplayMove} />
      </div>
    </>
  );
};

export default Home;
