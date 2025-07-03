import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTransactions } from '../firebase/firestore';
import { message } from 'antd';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setError('');
      } catch {
        message.error('Failed to load transactions.');
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
          Transactions
        </h1>
        <div>
          <Link to="/add-transaction" className="btn btn-primary me-2">
            Add Transaction
          </Link>
          <Link to="/inventory" className="btn btn-outline-primary">
            Back to Inventory
          </Link>
        </div>
      </div>
      <div className="card shadow p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No transactions found.</td></tr>
              ) : (
                transactions.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.timestamp || '-'}</td>
                    <td>{tx.type || '-'}</td>
                    <td>{typeof tx.quantity === 'number' ? tx.quantity : '-'}</td>
                    <td>{tx.userId || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
