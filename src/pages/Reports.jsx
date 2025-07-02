import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchInventoryItems, fetchCategories, fetchTransactions } from '../firebase/firestore';

export default function Reports() {
  const [totals, setTotals] = useState({ items: 0, categories: 0, transactions: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [items, categories, transactions] = await Promise.all([
          fetchInventoryItems(),
          fetchCategories(),
          fetchTransactions()
        ]);
        setTotals({ items: items.length, categories: categories.length, transactions: transactions.length });
        setError('');
      } catch {
        setError('Failed to load report data.');
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Reports</h2>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>
      <div className="card shadow p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="card bg-primary text-white shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Inventory Items</h5>
                  <p className="card-text display-6 fw-bold">{totals.items}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card bg-success text-white shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Categories</h5>
                  <p className="card-text display-6 fw-bold">{totals.categories}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card bg-info text-white shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Transactions</h5>
                  <p className="card-text display-6 fw-bold">{totals.transactions}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
