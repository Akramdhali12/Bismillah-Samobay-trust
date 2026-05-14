import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ textAlign: 'center', padding: 40 }}>লোড হচ্ছে...</p>;
  return user ? children : <Navigate to="/login" />;
}