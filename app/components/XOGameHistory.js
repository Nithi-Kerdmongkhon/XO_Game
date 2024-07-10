import React from 'react';
import style from '../styles/XOHistory.module.css';

const XOGameHistory = ({ history, onReplayMove }) => {
  const movesX = history.filter((move, index) => index % 2 === 0);
  const movesO = history.filter((move, index) => index % 2 !== 0);

  return (
    <div className="history">
      <div className={style.contenHistory}>
        <h2>Game History</h2>
        <div className={style.containerHistory}>
          <table className={style.table}>
            <thead>
              <tr>
                <th className={style.playerXHeader}>Player (X)</th>
                <th className={style.botOHeader}>Bot (O)</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.max(movesX.length, movesO.length) }).map((_, index) => (
                <tr key={index}>
                  <td>
                    {movesX[index] ? (
                      <button
                        className={`${style.button} ${style.redText}`} // Apply redText style for X moves
                        onClick={() => onReplayMove(index * 2)}
                      >
                        Move #{index + 1}: ({movesX[index].row}, {movesX[index].col})
                      </button>
                    ) : ''}
                  </td>
                  <td>
                    {movesO[index] ? (
                      <button
                        className={`${style.button} ${style.greenText}`} // Apply greenText style for O moves
                        onClick={() => onReplayMove(index * 2 + 1)}
                      >
                        Move #{index + 1}: ({movesO[index].row}, {movesO[index].col})
                      </button>
                    ) : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default XOGameHistory;
