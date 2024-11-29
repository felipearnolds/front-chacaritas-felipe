import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import './Bienvenida.css';
import NavbarAuth from '../components/NavbarAuth';

const Bienvenida = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <>
        <NavbarAuth />
        <div className="bienvenida-content">
          <h1>Por favor, inicia sesión</h1>
          <Link to="/login" className="login-link">Iniciar Sesión</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAuth />
      <div className="bienvenida-content">
        <h1>¡Bienvenido {user.username}!</h1>
        
        <div className="stats-section">
          <p>Partidas ganadas: {user.wins || 0}</p>
          <p>Nivel de aventurero: {
            user.wins >= 10 ? "Experto" :
            user.wins >= 5 ? "Intermedio" :
            "Novato"
          }</p>
        </div>

        <div className="profile-section">
          <Link to="/mi-perfil" className="edit-profile-link">
            Editar Perfil
          </Link>
        </div>

        <div className="actions">
          <div className="action-card">
            <Link to="/crear-partida" className="action-link">
              Crear Partida
            </Link>
          </div>
          
          <div className="action-card">
            <Link to="/unirme-partida" className="action-link">
              Unirme a una Partida
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bienvenida;
