import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import Board from '../board/Board';
import NavbarAuth from '../components/NavbarAuth';
import './JuegoActivo.css';

const JuegoActivo = () => {
  const { gameId } = useParams();
  const { user, token } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [myPlayer, setMyPlayer] = useState(null);
  const [gameState, setGameState] = useState(null);  // Añadido
  const [currentPlayerId, setCurrentPlayerId] = useState(null);  // Añadido
  const [targetPlayerId, setTargetPlayerId] = useState(null);
  const [lastDiceRoll, setLastDiceRoll] = useState(null);
  const [showDiceResult, setShowDiceResult] = useState(false);

  const playerColors = {
    0: '#4CAF50',  // Verde
    1: '#2196F3',  // Azul
    2: '#F44336',  // Rojo
    3: '#FFC107'   // Amarillo
  };

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };

        // Obtener estado del juego
        const gameResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/status`,
          config
        );
        
        // Log para ver la respuesta completa del estado del juego
        console.log('Respuesta del estado del juego:', gameResponse.data);
        
        setGameState(gameResponse.data);
        setCurrentPlayerId(gameResponse.data.currentPlayerId);

        // Obtener jugadores
        const playersResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/players`, 
          config
        );
        
        // Log para ver la respuesta completa de jugadores
        console.log('Respuesta de jugadores:', playersResponse.data);
        
        setPlayers(playersResponse.data.players);
        const currentPlayer = playersResponse.data.players.find(p => p.user.id === user.id);
        setMyPlayer(currentPlayer);

        // Log detallado de la comparación de IDs
        console.log('Comparación de IDs:', {
          currentPlayerId: gameResponse.data.currentPlayerId,
          myPlayerId: currentPlayer?.id,
          userId: user.id,
          currentPlayerIdType: typeof gameResponse.data.currentPlayerId,
          myPlayerIdType: typeof currentPlayer?.id,
          isEqual: currentPlayer?.id === gameResponse.data.currentPlayerId
        });

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGameState();
    const interval = setInterval(fetchGameState, 2000);
    return () => clearInterval(interval);
  }, [gameId, token, user.id]);

  const isMyTurn = String(myPlayer?.id) === String(currentPlayerId);

  const handleMove = async () => {
    if (!myPlayer || !isMyTurn) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/player/${myPlayer.id}/move`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      
      // Mostrar el resultado del dado
      if (response.data.diceRoll) {
        setLastDiceRoll(response.data.diceRoll);
        setShowDiceResult(true);
        // Ocultar el resultado después de 3 segundos
        setTimeout(() => setShowDiceResult(false), 3000);
      }
    } catch (error) {
      console.error('Error al mover:', error);
    }
  };

  const handleBuy = async () => {
    if (!myPlayer || !isMyTurn) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/player/${myPlayer.id}/buy`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error al comprar:', error);
    }
  };

  const handleUsePower = async () => {
    if (!myPlayer || !isMyTurn) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/player/${myPlayer.id}/use-power`,
        { power: 'doubleMove' },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error al usar poder:', error);
    }
  };

  return (
    <>
      <NavbarAuth />
      <div className="juego-activo">
        <div className="game-status">
          <h2>Partida en curso</h2>
          <div className={`current-turn ${isMyTurn ? 'my-turn' : ''}`}>
            {isMyTurn ? '¡Es tu turno!' : `Turno de ${players.find(p => p.id === currentPlayerId)?.name}`}
          </div>
        </div>

        <div className="players-info">
          {players.map((player, index) => (
            <div 
              key={player.id} 
              className={`player-status ${player.id === currentPlayerId ? 'current-player' : ''}`}
              style={{ borderColor: playerColors[index] }}
            >
              <div className="player-header">
                <div className="player-name" style={{ color: playerColors[index] }}>
                  {player.name} {player.id === myPlayer?.id && '(Tú)'}
                </div>
                {player.id === currentPlayerId && <div className="turn-indicator">🎲 Turno Actual</div>}
              </div>
              
              <div className="player-stats">
                <div className="stat-item">
                  <span className="stat-label">Posición:</span>
                  <span className="stat-value">{player.position}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Monedas:</span>
                  <span className="stat-value">{player.coins} 🪙</span>
                </div>
                {player.inventory && Object.entries(player.inventory).some(([_, active]) => active) && (
                  <div className="stat-item">
                    <span className="stat-label">Poderes:</span>
                    <div className="powers-list">
                      {Object.entries(player.inventory)
                        .filter(([_, active]) => active)
                        .map(([power]) => (
                          <span key={power} className="power-item">
                            {power === 'doubleMove' ? '⚡ Doble Movimiento' : '🎭 Robar Monedas'}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isMyTurn && (
          <div className="game-controls">
            <button className="control-button primary" onClick={handleMove}>
              🎲 Lanzar Dado
            </button>
            {myPlayer?.coins >= 1 && (
              <button className="control-button secondary" onClick={handleBuy}>
                💫 Comprar Poder (1 moneda)
              </button>
            )}
            {myPlayer?.inventory?.doubleMove && (
              <button className="control-button power-button" onClick={handleUsePower}>
                ⚡ Usar Doble Movimiento
              </button>
            )}
          </div>
        )}

        <Board 
          players={players.map((player, index) => ({
            ...player,
            color: playerColors[index],
            position: Number(player.position)
          }))} 
        />

        {showDiceResult && lastDiceRoll && (
          <div className="dice-result">
            <div className="dice-number">🎲 {lastDiceRoll}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default JuegoActivo;