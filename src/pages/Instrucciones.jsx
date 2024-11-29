import Navbar from '../components/Navbar';
import './Instrucciones.css'

function Instrucciones(){
  return (
    <>
      <Navbar />
      <div className="instrucciones-content">
        <h1>Instrucciones del Juego</h1>

        <section className="instrucciones-section">
          <h2>Objetivo del Juego</h2>
          <p>Compite con otros jugadores para llegar a la meta antes que ellos, recolectando recursos y tomando decisiones estratégicas en cada turno.</p>
        </section>

        <section className="instrucciones-section">
          <h2>Cómo Iniciar una Partida</h2>
          <ol>
            <li>Ingresa en la página de partida y selecciona "Crear partida" o "Unirse a una partida".</li>
            <li>Espera a que todos los jugadores estén listos.</li>
            <li>Comienza el juego siguiendo los pasos descritos en las reglas.</li>
          </ol>
        </section>

        <section className="instrucciones-section">
          <h2>Reglas Básicas</h2>
          <ul>
            <li>Cada jugador lanza un dado de 6 caras para avanzar en el tablero.</li>
            <li>Si dos jugadores caen en la misma casilla, se realiza un duelo.</li>
            <li>Las casillas pueden ofrecer recompensas, penalizaciones o habilidades especiales.</li>
            <li>El primer jugador en llegar a la meta gana la partida.</li>
          </ul>
        </section>

        <section className="instrucciones-section tip">
          <h2>Consejos y Estrategias</h2>
          <p>Utiliza tus movimientos estratégicamente para maximizar tus recursos y evita las casillas de penalización cuando sea posible.</p>
        </section>

        <section className="instrucciones-section">
          <h2>Preguntas Frecuentes (FAQ)</h2>
          
          <div className="faq-item">
            <h3>¿Qué sucede si hay un empate?</h3>
            <p>En caso de empate, el jugador que inició el duelo primero tiene prioridad.</p>
          </div>

          <div className="faq-item">
            <h3>¿Cómo funcionan los duelos?</h3>
            <p>Ambos jugadores lanzan un dado, y el jugador con el número más alto gana el duelo, tomando recursos del otro jugador.</p>
          </div>
        </section>
      </div>
    </>
  )
}

export default Instrucciones