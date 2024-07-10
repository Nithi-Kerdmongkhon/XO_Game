import React, { useState, useEffect } from 'react';
import '../styles/XOGameBoard.css';

const XOGameBoard = ({ size, updateGameHistory, onResetHistory, replayMove }) => {
  const [board, setBoard] = useState([]);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('');
  const [isBotTurn, setIsBotTurn] = useState(false); // State to track bot's turn

  useEffect(() => {
    resetBoard(size);
  }, [size]);

  useEffect(() => {
    if (replayMove !== null) {
      handleReplayMove(replayMove);
    }
  }, [replayMove]);

  useEffect(() => {
    if (isBotTurn) {
      // Call bot's move function with delay
      setTimeout(handleBotMove, 1000); // 1000 milliseconds delay (1 second)
    }
  }, [isBotTurn]);

  const resetBoard = (size) => {
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(null));
    setBoard(newBoard);
    setHistory([]);
    setStatus('');
    onResetHistory();
    setIsBotTurn(false); // Reset bot's turn
  };

  const handleReplayMove = (moveIndex) => {
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(null));
    const moves = history.slice(0, moveIndex + 1);
    moves.forEach((move, index) => {
      newBoard[move.row][move.col] = index % 2 === 0 ? 'X' : 'O';
    });
    setBoard(newBoard);
  };

  const handleClick = (row, col) => {
    if (!board[row] || board[row][col] || status || isBotTurn) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (history.length % 2 === 0 ? 'X' : 'O') : cell))
    );

    setBoard(newBoard);
    const newHistory = [...history, { row, col }];
    setHistory(newHistory);
    updateGameHistory({ row, col });

    const result = calculateResult(newBoard);
    if (result) {
      setStatus(result);
      saveGameHistory(newHistory, result);
    }

    setIsBotTurn(true); // Set bot's turn
  };

  const handleBotMove = () => {
    const availableMoves = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!board[i][j]) {
          availableMoves.push({ row: i, col: j });
        }
      }
    }

    if (availableMoves.length > 0) {
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === randomMove.row && colIndex === randomMove.col ? 'O' : cell))
      );
      setBoard(newBoard);
      const newHistory = [...history, { row: randomMove.row, col: randomMove.col }];
      setHistory(newHistory);
      updateGameHistory({ row: randomMove.row, col: randomMove.col });

      const result = calculateResult(newBoard);
      if (result) {
        setStatus(result);
        saveGameHistory(newHistory, result);
      }

      setIsBotTurn(false); // Human player's turn again
    }
  };

  const calculateResult = (board) => {
    const size = board.length;

    // Check rows and columns
    for (let i = 0; i < size; i++) {
      if (board[i].every(cell => cell && cell === board[i][0])) {
        return `Winner is ${board[i][0]}`; // Row winner
      }
      if (board.every(row => row[i] && row[i] === board[0][i])) {
        return `Winner is ${board[0][i]}`; // Column winner
      }
    }

    // Check main diagonal
    if (board.every((row, index) => row[index] && row[index] === board[0][0])) {
      return `Winner is ${board[0][0]}`;
    }

    // Check anti-diagonal
    if (board.every((row, index) => row[size - 1 - index] && row[size - 1 - index] === board[0][size - 1])) {
      return `Winner is ${board[0][size - 1]}`;
    }

    // Check for draw
    if (board.flat().every(cell => cell)) {
      return 'Draw';
    }

    // No winner or draw
    return null;
  };

  const renderCell = (row, col) => {
    if (!board[row]) return null; // Check if board[row] is undefined
    const cellValue = board[row][col];
    const cellClass = cellValue === 'X' ? 'cell X' : 'cell O'; // Add class based on cell value
  
    return (
      <div className={cellClass} key={`${row}-${col}`} onClick={() => handleClick(row, col)}>
        {cellValue}
      </div>
    );
  };

  return (
    <div>
       {status && <h2 className="status">{status}</h2>}
      <div className="board" style={{ gridTemplateColumns: `repeat(${size}, 128px)`, gridTemplateRows: `repeat(${size}, 128px)` }}>
        {board.flat().map((cell, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          return renderCell(row, col);
        })}
      </div>
     
      <button className="BTNReset" onClick={() => resetBoard(size)}>Reset Game</button>
    </div>
  );
};

export default XOGameBoard;
