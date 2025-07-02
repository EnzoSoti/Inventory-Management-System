import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const getStartedRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem('onboarded')) {
      setShowWelcome(true);
      localStorage.setItem('onboarded', 'yes');
    }
  }, []);

  useEffect(() => {
    if (showWelcome && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showWelcome]);

  const closeWelcome = () => {
    setShowWelcome(false);
    if (getStartedRef.current) getStartedRef.current.focus();
  };

  return (
    <div className="container py-5 fade-in">
      {/* Onboarding Welcome Modal */}
      {showWelcome && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.4)' }}
          role="dialog" aria-modal="true" aria-labelledby="welcomeTitle" ref={modalRef}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="welcomeTitle">Welcome to Inventory Management System!</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeWelcome}></button>
              </div>
              <div className="modal-body">
                <ul className="mb-3">
                  <li>🌟 <b>Add Items</b> to your inventory with the green button.</li>
                  <li>🔍 <b>Search & Filter</b> inventory instantly.</li>
                  <li>⚠️ <b>Stock Alerts</b> highlight low/out-of-stock items.</li>
                  <li>⬆️ <b>Import/Export CSV</b> for bulk management.</li>
                  <li>📦 <b>Suppliers</b> management and linking.</li>
                  <li>📊 <b>Reports</b> and analytics for insights.</li>
                  <li>🌙 <b>Theme Switcher</b> for dark/light mode.</li>
                </ul>
                <p className="mb-0">Explore the navigation bar to access all features. Enjoy!</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" ref={getStartedRef} onClick={closeWelcome}>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      )}
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