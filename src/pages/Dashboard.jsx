import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-3">
        <button
          onClick={logout}
          className="btn btn-danger fw-semibold shadow-sm"
        >
          Logout
        </button>
      </div>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: 480 }}>
        <h2 className="mb-3 fw-bold text-center">Welcome, {user?.email}</h2>
        <p className="text-center mb-4">This is the Admin Dashboard.</p>
        <div className="d-flex flex-column gap-3">
          <Link to="/inventory" className="btn btn-primary fw-semibold">
            View Inventory
          </Link>
          <Link to="/inventory/add" className="btn btn-success fw-semibold">
            Add Item
          </Link>
          <Link to="/categories" className="btn btn-secondary fw-semibold">
            Manage Categories
          </Link>
          <Link to="/transactions" className="btn btn-info fw-semibold">
            View Transactions
          </Link>
          <Link to="/reports" className="btn btn-warning fw-semibold">
            Reports
          </Link>
        </div>
      </div>
    </div>
  );
}