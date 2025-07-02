import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchInventoryItems, fetchCategories, fetchTransactions } from '../firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function Reports() {
  const [totals, setTotals] = useState({ items: 0, categories: 0, transactions: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryData, setCategoryData] = useState([]);

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
        // Calculate inventory value by category
        const catMap = {};
        items.forEach(item => {
          const cat = item.category || 'Uncategorized';
          const value = (item.price || 0) * (item.quantity || 0);
          if (!catMap[cat]) catMap[cat] = 0;
          catMap[cat] += value;
        });
        setCategoryData(Object.entries(catMap).map(([name, value]) => ({ name, value })));
        setError('');
      } catch {
        setError('Failed to load report data.');
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
          Reports
        </h1>
        <Link to="/inventory" className="btn btn-outline-primary">
          Back to Inventory
        </Link>
      </div>
      <div className="card shadow p-4 mb-4">
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
      {/* Inventory Value by Category Chart */}
      <div className="card shadow p-4">
        <h5 className="mb-4">Inventory Value by Category</h5>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={categoryData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={v => `₱${v.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="value" fill="#4361ee" name="Total Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
