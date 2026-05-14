import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p style={{ textAlign: 'center', padding: 40 }}>লোড হচ্ছে...</p>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin' && user.role !== 'superadmin') return <Navigate to="/" />;
  return children;
}