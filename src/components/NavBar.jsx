import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 px-3 d-flex justify-content-between align-items-center">
      <div>
        <Link className="navbar-brand fw-bold me-4" to="/">Inventory System</Link>
        <div className="navbar-nav flex-row gap-3 d-inline-flex">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/inventory">Inventory</Link>
          <Link className="nav-link" to="/categories">Categories</Link>
          <Link className="nav-link" to="/transactions">Transactions</Link>
          <Link className="nav-link" to="/reports">Reports</Link>
          <Link className="nav-link" to="/add">Add Item</Link>
        </div>
      </div>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
} 