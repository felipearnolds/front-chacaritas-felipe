import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Registro.css";
import { AuthContext } from "../auth/AuthContext";
import axios from 'axios';
import React, { useState, useContext } from 'react';

const Registro = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("La contraseña debe contener al menos una letra y un número");
      return;
    }

    try {
      console.log("Intentando registro con datos:", {
        email: formData.email,
        username: formData.username,
        passwordLength: formData.password.length
      });

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/registro`, {
        email: formData.email,
        password: formData.password,
        username: formData.username
      });

      console.log('Respuesta del servidor:', response.data);
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      login(token, user);

      setMsg("¡Registro exitoso!");
      
      setTimeout(() => {
        navigate("/bienvenida");
      }, 1500);

    } catch (error) {
      console.error('Error completo:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      setError(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="registro-container">
          <h1>¡Únete a la fiesta!</h1>
          
          <form className="registro-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Ingresa tu nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="registro-button">
              Registrarme
            </button>
          </form>

          {error && <p className="error-msg">{error}</p>}
          {msg && <p className="success-msg">{msg}</p>}

          <p className="login-prompt">
            ¿Ya eres parte de la fiesta?{" "}
            <Link to="/login" className="login-link">Iniciar Sesión</Link>
          </p>
        </div>
      </main>
    </>
  );
};

export default Registro;
