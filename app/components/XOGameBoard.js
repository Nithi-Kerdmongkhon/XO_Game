import React, { useState, useEffect } from 'react';
import '../styles/XOGameBoard.css';

// XOGameBoard component: ใช้สำหรับแสดงกระดาน XO และควบคุมการเล่นเกม
const XOGameBoard = ({ size, updateGameHistory, onResetHistory, replayMove }) => {
  // ใช้ useState เพื่อเก็บสถานะต่างๆ ของเกม
  const [board, setBoard] = useState([]); // สถานะของกระดาน
  const [history, setHistory] = useState([]); // ประวัติการเล่น
  const [status, setStatus] = useState(''); // สถานะของเกม (เช่น ใครชนะหรือเสมอ)
  const [isBotTurn, setIsBotTurn] = useState(false); // ติดตามว่าเป็นตาของบอทหรือไม่

  // ใช้ useEffect เพื่อรีเซ็ตกระดานเมื่อขนาดกระดานเปลี่ยน
  useEffect(() => {
    resetBoard(size);
  }, [size]);

  // ใช้ useEffect เพื่อจัดการการเล่นซ้ำของประวัติการเล่น
  useEffect(() => {
    if (replayMove !== null) {
      handleReplayMove(replayMove);
    }
  }, [replayMove]);

  // ใช้ useEffect เพื่อจัดการการเคลื่อนไหวของบอทด้วยการดีเลย์ 1 วินาที
  useEffect(() => {
    if (isBotTurn) {
      setTimeout(handleBotMove, 1000); // ดีเลย์ 1000 มิลลิวินาที (1 วินาที)
    }
  }, [isBotTurn]);

  // ฟังก์ชันสำหรับรีเซ็ตกระดาน
  const resetBoard = (size) => {
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(null));
    setBoard(newBoard);
    setHistory([]);
    setStatus('');
    onResetHistory();
    setIsBotTurn(false); // รีเซ็ตตาของบอท
  };

  // ฟังก์ชันสำหรับการเล่นซ้ำจากประวัติการเล่น
  const handleReplayMove = (moveIndex) => {
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(null));
    const moves = history.slice(0, moveIndex + 1);
    moves.forEach((move, index) => {
      newBoard[move.row][move.col] = index % 2 === 0 ? 'X' : 'O';
    });
    setBoard(newBoard);
  };

  // ฟังก์ชันสำหรับการคลิกบนกระดาน
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
    }

    setIsBotTurn(true); // เปลี่ยนเป็นตาของบอท
  };

  // ฟังก์ชันสำหรับการเคลื่อนไหวของบอท
  const handleBotMove = () => {
    if (status) return; // ถ้ามีผู้ชนะแล้ว บอทจะไม่ทำการเคลื่อนไหว
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
      }

      setIsBotTurn(false); // เปลี่ยนเป็นตาของผู้เล่นมนุษย์อีกครั้ง
    }
  };

  // ฟังก์ชันสำหรับคำนวณผลลัพธ์ของเกม
  const calculateResult = (board) => {
    const size = board.length;

    // ตรวจสอบแถวและคอลัมน์
    for (let i = 0; i < size; i++) {
      if (board[i].every(cell => cell && cell === board[i][0])) {
        return `Winner is ${board[i][0]}`; // ผู้ชนะในแถว
      }
      if (board.every(row => row[i] && row[i] === board[0][i])) {
        return `Winner is ${board[0][i]}`; // ผู้ชนะในคอลัมน์
      }
      // ตรวจสอบเส้นทแยงมุมหลัก
    }
    if (board.every((row, index) => row[index] && row[index] === board[0][0])) {
      return `Winner is ${board[0][0]}`;
    }
    // ตรวจสอบเส้นทแยงมุมรอง
    if (board.every((row, index) => row[size - 1 - index] && row[size - 1 - index] === board[0][size - 1])) {
      return `Winner is ${board[0][size - 1]}`;
    }
    // ตรวจสอบการเสมอ
    if (board.flat().every(cell => cell)) {
      return 'Draw';
    }
    // ไม่มีผู้ชนะหรือเสมอ
    return null;
    
  };

  // ฟังก์ชันสำหรับการแสดงแต่ละช่องบนกระดาน
  const renderCell = (row, col) => {
    // ตรวจสอบว่า board[row] ไม่เป็น undefined
    if (!board[row]) return null;
    
    // ดึงค่าของเซลล์จากกระดานที่ตำแหน่งแถวและคอลัมน์ที่กำหนด
    const cellValue = board[row][col];
    
    // กำหนด class ของเซลล์ตามค่าที่อยู่ในเซลล์นั้น ('X' หรือ 'O')
    const cellClass = cellValue === 'X' ? 'cell X' : 'cell O';
    
    // แสดงผลเซลล์เป็น div ที่มี class ตามค่าในเซลล์
    // กำหนด key ให้กับ div เพื่อลดการ re-render ที่ไม่จำเป็น
    // เพิ่ม event onClick เพื่อตรวจจับการคลิกที่เซลล์และเรียกใช้ handleClick
    return (
      <div className={cellClass} key={`${row}-${col}`} onClick={() => handleClick(row, col)}>
        {cellValue}
      </div>
    );
  };
  

  // แสดงผลกระดานเกม
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
