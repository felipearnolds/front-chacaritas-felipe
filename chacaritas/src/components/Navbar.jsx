import { Link } from 'react-router-dom';
import './NavbarAuth.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/instrucciones" className="nav-link">
            Instrucciones
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/nosotros" className="nav-link">
            Nosotros
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Iniciar Sesión
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/registro" className="nav-link">
            Registro
          </Link>
        </li>
      </ul>
    </nav>
  );
}