import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../auth/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    logout();
    setMsg("¡Has hecho logout con éxito!");
    // Redirigir al login después de un breve delay
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </>
  );
};

export default LogoutButton;
