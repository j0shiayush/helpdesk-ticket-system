import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar fade-in">
      <div className="nav-brand">
        <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="logo-link">
          <Logo />
          <span className="brand-text">Helpdesk System</span>
        </Link>
      </div>
      <div className="nav-links">
        <span className="user-greeting">Welcome, <strong>{user?.name}</strong></span>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;