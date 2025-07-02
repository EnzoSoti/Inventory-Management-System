import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container py-5 fade-in">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ color: 'var(--primary-color)' }}>
          Welcome, {user?.email}
        </h1>
        <p className="lead text-muted mb-0">Your Admin Dashboard</p>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-sm-6 col-lg-4">
          <Link to="/inventory" className="dashboard-card bg-primary d-block text-decoration-none mb-3 shadow-sm">
            <h4 className="fw-bold mb-2">View Inventory</h4>
            <p className="mb-0">Browse and manage all inventory items</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <Link to="/inventory/add" className="dashboard-card bg-success d-block text-decoration-none mb-3 shadow-sm">
            <h4 className="fw-bold mb-2">Add Item</h4>
            <p className="mb-0">Quickly add new items to your stock</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <Link to="/categories" className="dashboard-card bg-secondary d-block text-decoration-none mb-3 shadow-sm">
            <h4 className="fw-bold mb-2">Manage Categories</h4>
            <p className="mb-0">Organize your inventory by category</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <Link to="/transactions" className="dashboard-card bg-info d-block text-decoration-none mb-3 shadow-sm">
            <h4 className="fw-bold mb-2">View Transactions</h4>
            <p className="mb-0">Track all inventory transactions</p>
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <Link to="/reports" className="dashboard-card bg-warning d-block text-decoration-none mb-3 shadow-sm">
            <h4 className="fw-bold mb-2">Reports</h4>
            <p className="mb-0">Analyze inventory data and trends</p>
          </Link>
        </div>
      </div>
    </div>
  );
}