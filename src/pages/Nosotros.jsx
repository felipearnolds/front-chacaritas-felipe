import Navbar from "../components/Navbar";
import "./Nosotros.css";

const Nosotros = () => {
  return (
    <>
      <Navbar />
      <main className="nosotros-content">
        <div className="nosotros-container">
          <h1>CHACARITAS</h1>
          <h1>COMPUTER ENTERTAINMENT TEAM</h1>
          <h2>presenta</h2>
          <h1>#EL_JUEGO</h1>

          <div className="team-members">
            <div className="member">
              <div className="photo-circle">
                <img src="path_to_clemente_photo" alt="Clemente Rabat" />
              </div>
              <h3>Clemente Rabat</h3>
              <p>
                Apasionado por la lectura y la historia, Clemente conoció la programación en 2021,
                donde ha aprendido mucho sobre desarrollo de bases de datos y páginas web.
                Poco a poco, se ha introducido al mundo del entretenimiento, específicamente
                como desarrollador de videojuegos.
              </p>
            </div>

            <div className="member">
              <div className="photo-circle">
                <img src="path_to_felipe_photo" alt="Felipe Arnolds" />
              </div>
              <h3>Felipe Arnolds</h3>
              <p>
                Amante del arte, el teatro y la arquitectura, "Popito" es conocido por su buen
                gusto y por ser un gran diseñador. Con los años, ha logrado insertarse en el mundo
                de la programación, siendo un gran diseñador de páginas web y otros proyectos.
              </p>
            </div>

            <div className="member">
              <div className="photo-circle">
                <img src="path_to_martin_photo" alt="Martin Ramos" />
              </div>
              <h3>Martin Ramos</h3>
              <p>
                Conocido por su fanatismo por los videojuegos y destacado jugador de ajedrez,
                "Ramitos" ha sabido canalizar sus gustos para acercarse al desarrollo tecnológico,
                logrando convertirse en un gran desarrollador de software y programador
                de juegos de estrategia.
              </p>
            </div>
          </div>

          <div className="company-description">
            <h2>Sobre Nosotros</h2>
            <p>
              CHACARITAS COMPUTER ENTERTAINMENT TEAM es una empresa de desarrollo web,
              específicamente de videojuegos. Nace de una simple amistad, pero hoy, junto
              a sus tres socios, es toda una empresa consolidada en el rubro.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Nosotros;
