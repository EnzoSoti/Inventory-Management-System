import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // You can replace this with a spinner component
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
}