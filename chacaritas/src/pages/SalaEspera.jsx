import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './SalaEspera.css';
import NavbarAuth from '../components/NavbarAuth';

const SalaEspera = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const [gameResponse, playersResponse, readinessResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/status`, config),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/players`, config),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/readiness`, config)
        ]);

        console.log('Game Response:', gameResponse.data);
        console.log('Players Response:', playersResponse.data);
        console.log('Readiness Response:', readinessResponse.data);
        console.log('Current User ID:', user.id);

        setGameStatus(readinessResponse.data);
        setPlayers(playersResponse.data.players);

        // Asegúrate de que ambos sean del mismo tipo
        const isUserAdmin = parseInt(gameResponse.data.adminId) === parseInt(user.id);
        console.log('Is User Admin?', isUserAdmin);
        setIsAdmin(isUserAdmin);

        if (gameResponse.data.status === 'in_progress') {
          navigate(`/juego/${gameId}`);
        }
      } catch (error) {
        console.error('Error detallado:', error.response?.data || error.message);
      }
    };

    fetchGameData();
    const interval = setInterval(fetchGameData, 2000);
    return () => clearInterval(interval);
  }, [gameId, user.id, navigate, token]);

  const handleStartGame = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/begin`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      navigate(`/juego/${gameId}`);
    } catch (error) {
      console.error('Error al iniciar la partida:', error);
    }
  };

  console.log('Render values:', {
    isAdmin,
    gameStatus,
    playersLength: players.length
  });

  return (
    <>
      <NavbarAuth />
      <div className="sala-espera">
        <h1>Sala de Espera</h1>
        <div className="players-list">
          <h2>Jugadores ({players.length})</h2>
          {players.map(player => (
            <div key={player.id} className="player-item">
              <span>{player.name}</span>
              {isAdmin && player.user.id === user.id && (
                <span className="admin-badge">Admin</span>
              )}
            </div>
          ))}
        </div>

        {isAdmin && gameStatus.canStart ? (
          <button 
            className="start-game-button"
            onClick={handleStartGame}
          >
            Comenzar Partida
          </button>
        ) : null}

        {!gameStatus.canStart && (
          <p className="waiting-message">
            Esperando más jugadores... ({players.length}/2 mínimo)
          </p>
        )}
      </div>
    </>
  );
};

export default SalaEspera; //hola