import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <img src="/logo-placeholder.png" alt="logo" style={styles.logoImg} />
          <span>বিসমিল্লাহ সমবায় ট্রাস্ট</span>
        </Link>

        <button style={styles.menuBtn} onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <ul style={{ ...styles.menu, ...(open ? styles.menuOpen : {}) }}>
          <li><Link to="/" onClick={() => setOpen(false)}>হোম</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>আমাদের সম্পর্কে</Link></li>
          <li><Link to="/programs" onClick={() => setOpen(false)}>প্রোগ্রাম</Link></li>
          <li><Link to="/blog" onClick={() => setOpen(false)}>ব্লগ</Link></li>
          <li><Link to="/donate" onClick={() => setOpen(false)}>সাহায্যপ্রাপ্ত</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>যোগাযোগ</Link></li>

          {user ? (
            <>
              <li><Link to="/apply" onClick={() => setOpen(false)}>আবেদন করুন</Link></li>
              <li><Link to="/my-applications" onClick={() => setOpen(false)}>আমার আবেদন</Link></li>
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <li><Link to="/admin" onClick={() => setOpen(false)}>অ্যাডমিন</Link></li>
              )}
              <li>
                <button onClick={handleLogout} className="btn-outline" style={{ padding: '6px 16px' }}>
                  লগআউট
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setOpen(false)}>লগইন</Link></li>
              <li>
                <Link to="/register" className="btn-primary" onClick={() => setOpen(false)}>
                  নিবন্ধন
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: 'var(--white)',
    boxShadow: 'var(--shadow)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    flexWrap: 'wrap',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontWeight: 700,
    fontSize: 18,
    color: 'var(--primary)',
  },
  logoImg: { width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-light)' },
  menu: {
    display: 'flex',
    gap: 20,
    listStyle: 'none',
    alignItems: 'center',
  },
  menuOpen: {},
  menuBtn: {
    display: 'none',
    fontSize: 22,
    background: 'transparent',
    color: 'var(--primary)',
  },
};