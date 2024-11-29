import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UnirmePartida.css';
import NavbarAuth from '../components/NavbarAuth';
import { AuthContext } from '../auth/AuthContext';

const UnirmePartida = () => {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    cargarPartidas();
  }, []);

  const cargarPartidas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/waiting`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Partidas cargadas:', response.data);
      setPartidas(response.data.games);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar partidas:', error);
      setError('Error al cargar las partidas disponibles');
      setLoading(false);
    }
  };

  const handleJoinGame = async (gameId) => {
    try {
      console.log('Iniciando proceso de unirse a partida:', {
        gameId,
        token: token ? 'Token presente' : 'Token ausente',
        user: user
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/add-player`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Respuesta exitosa:', response.data);
      navigate(`/sala-espera/${gameId}`);
    } catch (error) {
      console.error('Error completo al unirse:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      
      alert(error.response?.data?.message || 'Error al unirse a la partida');
    }
  };

  if (loading) {
    return (
      <>
        <NavbarAuth />
        <div className="unirme-partida-content">
          <h1>Cargando partidas disponibles...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAuth />
      <div className="unirme-partida-content">
        <h1>Lista de Partidas Disponibles</h1>
        {error && <p className="error-message">{error}</p>}
        
        <button onClick={cargarPartidas} className="refresh-button">
          Actualizar lista
        </button>

        {partidas.length === 0 ? (
          <p className="no-partidas">No hay partidas disponibles en este momento</p>
        ) : (
          <ul className="partida-list">
            {partidas.map((partida) => (
              <li key={partida.id} className="partida-item">
                <div className="partida-info">
                  <h3>{partida.gameName || `Partida ${partida.id}`}</h3>
                  <p>Creador: {partida.admin?.username || 'Desconocido'}</p>
                  <p>Jugadores: {partida.players?.length || 0}/{partida.maxPlayers}</p>
                </div>
                <button 
                  onClick={() => handleJoinGame(partida.id)}
                  disabled={partida.players?.length >= partida.maxPlayers}
                  className="join-button"
                >
                  {partida.players?.length >= partida.maxPlayers 
                    ? 'Partida Llena' 
                    : 'Unirse'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UnirmePartida;
