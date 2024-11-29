import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CrearPartida.css';
import NavbarAuth from '../components/NavbarAuth';
import { AuthContext } from '../auth/AuthContext';

const CrearPartida = () => {
  const [nombrePartida, setNombrePartida] = useState('');
  const [maxJugadores, setMaxJugadores] = useState(4);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    console.log('Token en localStorage:', token);
    console.log('Usuario en localStorage:', userStr);

    if (!token) {
      console.log('No hay token, redirigiendo a login');
      navigate('/login');
      return;
    }

    try {
      // Decodificar el token de forma segura
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const tokenData = JSON.parse(jsonPayload);
      console.log('Datos del token decodificados:', tokenData);

      if (!tokenData.id) {
        throw new Error('Token no contiene ID de usuario');
      }

      setUserData({
        id: tokenData.id,
        email: tokenData.email,
        username: tokenData.username,
        playerId: tokenData.playerId
      });

    } catch (error) {
      console.error('Error al decodificar el token:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData) {
      alert('No hay información de usuario disponible');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const playerId = tokenData.playerId;

      const requestData = {
        gameName: nombrePartida,
        adminId: userData.id,
        maxPlayers: maxJugadores
      };

      console.log('Datos a enviar al backend:', requestData);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/games/start`, 
        requestData, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Respuesta del backend:', response.data);

      const gameId = response.data.gameId;
      
      if (!gameId) {
        throw new Error('No se recibió el ID de la partida del backend');
      }

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}/add-player`, {
        playerId: playerId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      navigate(`/sala-espera/${gameId}`);
    } catch (error) {
      console.error('Error completo:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        alert(`Error del servidor: ${error.response.data.message || 'Error desconocido'}`);
      } else {
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <>
      <NavbarAuth />
      <div className="crear-partida-content">
        <h1>Crear Partida</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombrePartida">Nombre de la Partida</label>
            <input 
              type="text" 
              id="nombrePartida" 
              placeholder="Ingresa un nombre para la partida"
              value={nombrePartida}
              onChange={(e) => setNombrePartida(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxJugadores">Número de Jugadores</label>
            <select
              id="maxJugadores"
              value={maxJugadores}
              onChange={(e) => setMaxJugadores(Number(e.target.value))}
              className="select-jugadores"
            >
              <option value="2">2 Jugadores</option>
              <option value="3">3 Jugadores</option>
              <option value="4">4 Jugadores</option>
            </select>
          </div>

          <div className="players">
            <div className="player-card">
              <p>Creador de la partida: {userData.username}</p>
            </div>
          </div>

          <button type="submit" className="start-game">
            Crear Partida
          </button>
        </form>
      </div>
    </>
  );
};

export default CrearPartida;
