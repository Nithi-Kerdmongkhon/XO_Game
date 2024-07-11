import React, { useState } from 'react';
import style from '../styles/XOcontrols.module.css'

const XOGameControls = ({ onSetSize }) => {
  // สร้าง state สำหรับจัดการขนาดกระดานเริ่มต้นเป็น 3 และข้อความแสดงข้อผิดพลาด
  const [size, setSize] = useState(3); // Default size
  const [error, setError] = useState('');

  // ฟังก์ชันสำหรับจัดการเมื่อมีการเปลี่ยนแปลงค่าขนาดกระดาน
  const handleInputChange = (e) => {
    // รับค่าใหม่จาก input และแปลงเป็นตัวเลข ถ้า input ว่างให้เก็บเป็นค่าว่าง
    const newSize = e.target.value === '' ? '' : Number(e.target.value);
    setSize(newSize);

    // ถ้าขนาดกระดานน้อยกว่า 3 และไม่ใช่ค่าว่าง ให้แสดงข้อความแสดงข้อผิดพลาด
    if (newSize < 3 && newSize !== '') {
      setError('Board size must be at least 3x3');
    } else {
      // ถ้าขนาดกระดานถูกต้อง ให้เคลียร์ข้อความแสดงข้อผิดพลาด
      setError('');
    }
  };

  // ฟังก์ชันสำหรับจัดการเมื่อฟอร์มถูกส่ง
  const handleSubmit = (e) => {
    e.preventDefault();
    // ถ้าขนาดกระดานมากกว่าหรือเท่ากับ 3 ให้เรียกฟังก์ชัน onSetSize เพื่อกำหนดขนาดกระดานใหม่
    if (size >= 3) {
      onSetSize(size);
    } else {
      // ถ้าขนาดกระดานน้อยกว่า 3 ให้แสดงข้อความแสดงข้อผิดพลาด
      setError('Board size must be at least 3x3');
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Board Size :  &nbsp;
          {/* input สำหรับรับค่าขนาดกระดาน */}
          <input
            type="number" 
            value={size}
            onChange={handleInputChange}
            min="3"
            onKeyDown={(e) => {
              // ถ้าผู้ใช้กดปุ่ม Backspace และค่า size เป็นตัวเลขหลักเดียว ให้เคลียร์ค่า size
              if (e.key === 'Backspace' && size.toString().length === 1) {
                setSize(' ');
              }
            }}
          />
        </label> &nbsp;
        <button type="submit">Set Board Size</button>
      </form>
      {/* แสดงข้อความแสดงข้อผิดพลาดถ้ามี */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default XOGameControls;
