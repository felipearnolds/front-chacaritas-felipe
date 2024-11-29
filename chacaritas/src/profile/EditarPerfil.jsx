import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './EditarPerfil.css';

const EditarPerfil = () => {
  const navigate = useNavigate();
  const { user, token, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        username: user.username || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validar contraseñas si se está intentando cambiar
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setError('Las contraseñas nuevas no coinciden');
        setLoading(false);
        return;
      }
      if (!formData.currentPassword) {
        setError('Debes ingresar tu contraseña actual para hacer cambios');
        setLoading(false);
        return;
      }
    }

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const updateData = {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword,
        ...(formData.newPassword && { newPassword: formData.newPassword })
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        updateData,
        config
      );

      // Actualizar el contexto con los nuevos datos
      login(response.data.user, token);
      setSuccess('Perfil actualizado exitosamente');

      // Limpiar campos de contraseña
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setError(error.response?.data?.message || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-perfil-container">
      <h1>Editar Perfil</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="editar-perfil-form">
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentPassword">Contraseña Actual</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className="editar-perfil-button">
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
      </form>
    </div>
  );
};

export default EditarPerfil; 