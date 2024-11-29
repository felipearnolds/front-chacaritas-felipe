import { useNavigate, Link } from "react-router-dom"; // Importar useNavigate y Link
import Navbar from "../components/Navbar";
import "./Login.css";
import { AuthContext } from "../auth/AuthContext";
import axios from 'axios';
import React, { useState, useContext } from 'react';

  
  function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log('Intentando login con:', { email, password });
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email,
        password
      });
      
      setError(false);
      setMsg("Login exitoso!");
      
      // Guardar token en localStorage y context
      const access_token = response.data.access_token;
      login(access_token, response.data.user);
      
      // Redirigir solo si el login fue exitoso
      navigate("/bienvenida");
      
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      setError(true);
      setMsg(error.response?.data?.message || "Error al iniciar sesión");
      // No redirigir si hay error
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="login-container">
          <h1>Iniciar Sesión</h1>
          <p>¡Qué bueno verte de vuelta!</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>

          <p className="register-prompt">
            ¿Aún no eres parte de la fiesta?{" "}
            <Link to="/registro" className="register-link">Regístrate gratis</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
