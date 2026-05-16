// client/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.user, data.token);
      if (data.user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'লগইন ব্যর্থ হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '3rem 1rem', maxWidth: '450px', margin: '0 auto' }}>
      <h1 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '2rem' }}>লগইন</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #c8e6c9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>ইমেইল</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        {error && <div style={errorBox}>{error}</div>}
        <button type="submit" disabled={loading} style={btnStyle(loading)}>
          {loading ? 'অপেক্ষা করুন...' : 'লগইন করুন'}
        </button>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#555' }}>
          অ্যাকাউন্ট নেই?{' '}
          <Link to="/register" style={{ color: '#2e7d32', fontWeight: '600' }}>
            রেজিস্টার করুন
          </Link>
        </p>
      </form>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '0.4rem', color: '#388e3c', fontWeight: '500' };
const inputStyle = {
  width: '100%',
  padding: '0.65rem 0.85rem',
  border: '1px solid #c8e6c9',
  borderRadius: '6px',
  fontSize: '0.95rem',
  outline: 'none',
};
const errorBox = {
  padding: '0.75rem',
  backgroundColor: '#ffebee',
  color: '#c62828',
  borderRadius: '6px',
  marginBottom: '1rem',
  border: '1px solid #ef9a9a',
};
const btnStyle = (loading) => ({
  width: '100%',
  padding: '0.85rem',
  backgroundColor: loading ? '#81c784' : '#2e7d32',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: loading ? 'not-allowed' : 'pointer',
});