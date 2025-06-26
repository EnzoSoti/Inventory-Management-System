import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="container mt-5">
      <h2>Welcome, {currentUser?.email}</h2>
      <p>This is the Admin Dashboard.</p>

      <div className="d-flex flex-column gap-3 mt-4" style={{ maxWidth: 300 }}>
        <a href="/inventory" className="btn btn-primary">
          View Inventory
        </a>
        <a href="/add-item" className="btn btn-success">
          Add Item
        </a>
        <a href="/categories" className="btn btn-secondary">
          Manage Categories
        </a>
        <a href="/transactions" className="btn btn-info">
          View Transactions
        </a>
        <a href="/reports" className="btn btn-warning">
          Reports
        </a>
      </div>
    </div>
  );
}