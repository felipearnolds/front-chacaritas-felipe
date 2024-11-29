import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Board.css';

const Pieces = () => {
  const navigate = useNavigate();
  const pieces = [
    { id: 1, color: '#5018F5', borderColor: '#000000' },
    { id: 2, color: '#18F5A5', borderColor: '#000000' },
    { id: 3, color: '#F54118', borderColor: '#000000' },
    { id: 4, color: '#F5E118', borderColor: '#000000' }
  ];

  const handleGameStart = () => {
    navigate('/board/game');
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '20px'
    }}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: piece.color,
            border: `2px solid ${piece.borderColor}`,
            display: 'inline-block'
          }}
        />
      ))}
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: '#000000',
          border: '2px solid black',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: '20px'
        }}
        onClick={handleGameStart}
      >
        ¡Comienzo!
      </button>
    </div>
  );
};

export default Pieces; 