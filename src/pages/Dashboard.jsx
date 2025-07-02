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
    <div className="container py-5">
      {/* Onboarding Welcome Modal */}
      {showWelcome && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ background: 'rgba(0,0,0,0.5)' }} 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="welcomeTitle" 
          ref={modalRef}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-3">
              <div className="modal-header border-0 bg-light">
                <h5 className="modal-title fw-bold" id="welcomeTitle">Welcome to Inventory Management System!</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close" 
                  onClick={closeWelcome}
                ></button>
              </div>
              <div className="modal-body p-4">
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">🌟 <b>Add Items</b> to your inventory with the green button.</li>
                  <li className="mb-2">🔍 <b>Search & Filter</b> inventory instantly.</li>
                  <li className="mb-2">⚠️ <b>Stock Alerts</b> highlight low/out-of-stock items.</li>
                  <li className="mb-2">⬆️ <b>Import/Export CSV</b> for bulk management.</li>
                  <li className="mb-2">📦 <b>Suppliers</b> management and linking.</li>
                  <li className="mb-2">📊 <b>Reports</b> and analytics for insights.</li>
                  <li className="mb-2">🌙 <b>Theme Switcher</b> for dark/light mode.</li>
                </ul>
                <p className="mb-0 text-muted">Explore the navigation bar to access all features. Enjoy!</p>
              </div>
              <div className="modal-footer border-0">
                <button 
                  className="btn btn-primary rounded-pill px-4" 
                  ref={getStartedRef} 
                  onClick={closeWelcome}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mb-5 animate__animated animate__fadeIn">
        <h1 className="fw-bold mb-3" style={{ color: 'var(--primary-color)' }}>
          Welcome, {user?.email}
        </h1>
        <p className="lead text-muted mb-0">Your Admin Dashboard</p>
      </div>
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <Link 
            to="/inventory" 
            className="dashboard-card bg-primary text-white text-decoration-none d-block rounded-3 shadow-lg p-4 transition-all"
          >
            <h4 className="fw-bold mb-2">View Inventory</h4>
            <p className="mb-0">Browse and manage all inventory items</p>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link 
            to="/inventory/add" 
            className="dashboard-card bg-success text-white text-decoration-none d-block rounded-3 shadow-lg p-4 transition-all"
          >
            <h4 className="fw-bold mb-2">Add Item</h4>
            <p className="mb-0">Quickly add new items to your stock</p>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link 
            to="/categories" 
            className="dashboard-card bg-secondary text-white text-decoration-none d-block rounded-3 shadow-lg p-4 transition-all"
          >
            <h4 className="fw-bold mb-2">Manage Categories</h4>
            <p className="mb-0">Organize your inventory by category</p>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link 
            to="/transactions" 
            className="dashboard-card bg-info text-white text-decoration-none d-block rounded-3 shadow-lg p-4 transition-all"
          >
            <h4 className="fw-bold mb-2">View Transactions</h4>
            <p className="mb-0">Track all inventory transactions</p>
          </Link>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <Link 
            to="/reports" 
            className="dashboard-card bg-warning text-white text-decoration-none d-block rounded-3 shadow-lg p-4 transition-all"
          >
            <h4 className="fw-bold mb-2">Reports</h4>
            <p className="mb-0">Analyze inventory data and trends</p>
          </Link>
        </div>
      </div>
    </div>
  );
}