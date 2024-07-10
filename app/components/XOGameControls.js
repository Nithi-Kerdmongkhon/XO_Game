import React, { useState } from 'react';
import style from '../styles/XOcontrols.module.css'

const XOGameControls = ({ onSetSize }) => {
  const [size, setSize] = useState(3); // Default size
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const newSize = e.target.value === '' ? '' : Number(e.target.value);
    setSize(newSize);
    if (newSize < 3 && newSize !== '') {
      setError('Board size must be at least 3x3');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (size >= 3) {
      onSetSize(size);
    } else {
      setError('Board size must be at least 3x3');
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Board Size :  &nbsp;
          <input
            type="number"
            value={size}
            onChange={handleInputChange}
            min="3"
            onKeyDown={(e) => {
              if (e.key === 'Backspace' && size.toString().length === 1) {
                setSize('');
              }
            }}
          />
        </label> &nbsp;
        <button type="submit">Set Board Size</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default XOGameControls;
