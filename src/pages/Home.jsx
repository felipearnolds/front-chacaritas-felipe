import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-content">
        <h1>Bienvenido a <span className="highlight">#EL_JUEGO</span></h1>
        <p className="subtitle">¡Que empiece la aventura!</p>
        
        <section className="description-section">
          <p>
            Avanza por el mapa y llega a la meta antes que los otros jugadores.
            Pero ¡ten cuidado por donde pisas! Está lleno de sorpresas que podrán cambiar el rumbo de las cosas.
          </p>
        </section>

        <div className="actions">
          <div className="action-card">
            <Link to="/registro" className="action-link">
              Registrarse
            </Link>
          </div>
          <div className="action-card">
            <Link to="/login" className="action-link">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
