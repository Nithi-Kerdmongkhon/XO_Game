import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AI = ({ board, size, currentPlayer, makeMove }) => {
  useEffect(() => {
    if (currentPlayer === 'O') {
      makeBestMove();
    }
  }, [currentPlayer]);

  const makeBestMove = () => {
    let bestScore = -Infinity;
    let move = { row: null, col: null };

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!board[row][col]) {
          board[row][col] = 'O';
          let score = minimax(board, 0, false);
          board[row][col] = null;

          if (score > bestScore) {
            bestScore = score;
            move = { row, col };
          }
        }
      }
    }

    makeMove(move.row, move.col);
  };

  const minimax = (board, depth, isMaximizing) => {
    const scores = {
      X: -1,
      O: 1,
      Draw: 0,
    };

    const winner = checkWinner(board);
    if (winner !== null) {
      return scores[winner];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (!board[row][col]) {
            board[row][col] = 'O';
            let score = minimax(board, depth + 1, false);
            board[row][col] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (!board[row][col]) {
            board[row][col] = 'X';
            let score = minimax(board, depth + 1, true);
            board[row][col] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  };

  const checkWinner = (board) => {
    // Check rows
    for (let i = 0; i < size; i++) {
      if (board[i].every((cell) => cell === 'X')) return 'X';
      if (board[i].every((cell) => cell === 'O')) return 'O';
    }

    // Check columns
    for (let i = 0; i < size; i++) {
      if (board.every((row) => row[i] === 'X')) return 'X';
      if (board.every((row) => row[i] === 'O')) return 'O';
    }

    // Check diagonals
    if (board.every((row, idx) => row[idx] === 'X')) return 'X';
    if (board.every((row, idx) => row[idx] === 'O')) return 'O';

    if (board.every((row, idx) => row[size - idx - 1] === 'X')) return 'X';
    if (board.every((row, idx) => row[size - idx - 1] === 'O')) return 'O';

    // Check for draw
    if (board.flat().every((cell) => cell)) return 'Draw';

    return null;
  };

  return null;
};

export default AI;

