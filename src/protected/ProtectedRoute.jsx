import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  if (!token || !user) {
    // Redirigir al login si no hay token o usuario
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 