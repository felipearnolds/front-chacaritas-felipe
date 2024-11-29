import { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import NavbarAuth from '../components/NavbarAuth';
import './MiPerfil.css';

const MiPerfil = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  if (!user) {
    return (
      <>
        <NavbarAuth />
        <div className="mi-perfil-container">
          <p>Por favor, inicia sesión para ver tu perfil.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAuth />
      <div className="mi-perfil-container">
        <h1>Mi Perfil</h1>
        <div className="perfil-card">
          <div className="perfil-info">
            <div className="info-group">
              <label>Nombre de Usuario:</label>
              <p>{user.username}</p>
            </div>
            <div className="info-group">
              <label>Correo Electrónico:</label>
              <p>{user.email}</p>
            </div>
          </div>
          
          <div className="stats-section">
            <h2>Estadísticas</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <label>Partidas Jugadas:</label>
                <p>{user.gamesPlayed || 0}</p>
              </div>
              <div className="stat-item">
                <label>Victorias:</label>
                <p>{user.wins || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiPerfil; 