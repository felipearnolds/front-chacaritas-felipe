import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './NavbarAuth.css';

export default function NavbarAuth() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-auth">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/bienvenida" className="nav-link">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/crear-partida" className="nav-link">
            Crear Partida
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/unirme-partida" className="nav-link">
            Unirme a Partida
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/mi-perfil" className="nav-link">
            Mi Perfil
          </Link>
        </li>
        <li className="nav-item">
          <button 
            onClick={handleLogout} 
            className="nav-link cerrar-sesion"
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}