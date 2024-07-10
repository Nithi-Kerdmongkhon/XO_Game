import React from 'react';
import style from '../styles/XOHistory.module.css';

const XOGameHistory = ({ history, onReplayMove }) => {
  const movesX = history.filter((move, index) => index % 2 === 0);
  const movesO = history.filter((move, index) => index % 2 !== 0);

  return (
    <div className="history">
  {/* เนื้อหาในส่วนประวัติการเล่นเกม */}
  <div className={style.contenHistory}>
    <h2>Game History</h2>
    <div className={style.containerHistory}>
      <table className={style.table}>
        <thead>
          <tr>
            {/* หัวตารางแสดงผู้เล่น X และ Bot O */}
            <th className={style.playerXHeader}>Player (X)</th>
            <th className={style.botOHeader}>Bot (O)</th>
          </tr>
        </thead>
        <tbody>
          {/* สร้างแถวสำหรับประวัติการเคลื่อนที่ของผู้เล่น X และ Bot O */}
          {Array.from({ length: Math.max(movesX.length, movesO.length) }).map((_, index) => (
            <tr key={index}>
              <td>
                {/* ถ้ามีการเคลื่อนที่ของผู้เล่น X ในตำแหน่งนี้ จะแสดงปุ่ม */}
                {movesX[index] ? (
                  <button
                    className={`${style.button} ${style.redText}`} // ใช้สไตล์ redText สำหรับการเคลื่อนที่ของ X
                    onClick={() => onReplayMove(index * 2)} // คลิกเพื่อเรียกการเล่นซ้ำจากตำแหน่งนี้
                  >
                    Move #{index + 1}: ({movesX[index].row}, {movesX[index].col}) {/* แสดงตำแหน่งการเคลื่อนที่ */}
                  </button>
                ) : ''}
              </td>
              <td>
                {/* ถ้ามีการเคลื่อนที่ของ Bot O ในตำแหน่งนี้ จะแสดงปุ่ม */}
                {movesO[index] ? (
                  <button
                    className={`${style.button} ${style.greenText}`} // ใช้สไตล์ greenText สำหรับการเคลื่อนที่ของ O
                    onClick={() => onReplayMove(index * 2 + 1)} // คลิกเพื่อเรียกการเล่นซ้ำจากตำแหน่งนี้
                  >
                    Move #{index + 1}: ({movesO[index].row}, {movesO[index].col}) {/* แสดงตำแหน่งการเคลื่อนที่ */}
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
