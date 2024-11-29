import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Board.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL) {
  console.error('VITE_BACKEND_URL no está definida en el archivo .env');
}

const Board = ({ players = [] }) => {
  const [boardTiles, setBoardTiles] = useState([]);

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/tiles`);
        const tilesData = response.data;
        
        const createRow = (start, end, reverse = false) => {
          const length = Math.abs(end - start) + 1;
          return Array(length).fill(null).map((_, index) => {
            const position = reverse ? 
              start - index : 
              start + index;
            
            const tileData = tilesData.find(tile => Number(tile.position) === position);
            const playersHere = players.filter(p => Number(p.position) === position);
            
            return {
              id: position,
              color: tileData ? getTileColor(tileData.effect) : '#FFFFFF',
              effect: tileData?.effect,
              players: playersHere
            };
          });
        };

        // Crear las filas con el orden correcto
        const row1 = createRow(0, 9);           // 0-9 de izquierda a derecha
        const row2 = createRow(19, 10, true);   // 19-10 de izquierda a derecha
        const row3 = createRow(20, 29);         // 20-29 de izquierda a derecha
        const meta = [{ 
          id: 30, 
          color: '#000000', 
          effect: 'finish',
          players: players.filter(p => p.position === 30)
        }];

        setBoardTiles([...row1, ...row2, ...row3, ...meta]);
      } catch (error) {
        console.error('Error al obtener tiles:', error);
      }
    };

    fetchTiles();
  }, [players]);

  const getTileColor = (effect) => {
    switch (effect) {
      case 'reward':
        return '#FFD700';  // Dorado
      case 'penalty':
        return '#FF0000';  // Rojo
      case 'power':
        return '#0000FF';  // Azul
      case 'finish':
        return '#000000';  // Negro para la meta
      default:
        return '#FFFFFF';  // Blanco por defecto
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        {boardTiles.map((tile) => (
          <div
            key={tile.id}
            className={`tile ${tile.effect || ''}`}
            style={{ 
              backgroundColor: tile.color,
              position: 'relative'
            }}
          >
            <span className="tile-number">{tile.id}</span>
            <div className="players-container">
              {tile.players && tile.players.map((player, index) => (
                <div
                  key={player.id}
                  className="player-piece"
                  style={{
                    backgroundColor: player.color,
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: '2px solid black',
                    top: `${10 + (index * 25)}px`,
                    left: `${10 + (index * 25)}px`,
                    zIndex: 2
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
