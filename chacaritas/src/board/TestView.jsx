import React, { useState } from 'react';
import Board from './Board';
import Pieces from './Pieces';

const TestView = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative' }}>
        <Board />
        {gameStarted && (
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            left: '0', 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
            }}>
              <div style={{ 
                gridColumn: '1', 
                gridRow: '1', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                padding: '5px'
              }}>
                <div style={{ width: '25px', height: '25px', backgroundColor: '#90EE90', borderRadius: '50%', border: '2px solid black' }} />
                <div style={{ width: '25px', height: '25px', backgroundColor: '#9370DB', borderRadius: '50%', border: '2px solid black' }} />
                <div style={{ width: '25px', height: '25px', backgroundColor: '#000000', borderRadius: '50%', border: '2px solid black' }} />
                <div style={{ width: '25px', height: '25px', backgroundColor: '#87CEEB', borderRadius: '50%', border: '2px solid black' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Pieces onGameStart={handleGameStart} />
      </div>
    </div>
  );
};

export default TestView; 