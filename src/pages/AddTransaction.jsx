import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTransaction, fetchInventoryItems } from '../firebase/firestore';
import { message } from 'antd';

export default function AddTransaction() {
  const [itemId, setItemId] = useState('');
  const [type, setType] = useState('in');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const data = await fetchInventoryItems();
        setItems(data);
      } catch {
        message.error('Failed to load inventory items.');
      }
      setLoading(false);
    };
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemId || !quantity) {
      message.error('Please fill all fields.');
      return;
    }
    try {
      await addTransaction({
        itemId,
        type,
        quantity: Number(quantity),
        timestamp: new Date().toISOString(),
        // userId: (add user context if available)
      });
      message.success('Transaction added!');
      navigate('/transactions');
    } catch {
      message.error('Failed to add transaction.');
    }
  };

  return (
    <div className="container py-5 fade-in">
      <h1 className="fw-bold mb-4" style={{ color: 'var(--primary-color)' }}>
        Add Transaction
      </h1>
      <div className="card shadow p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item</label>
            <select className="form-select" value={itemId} onChange={e => setItemId(e.target.value)} required>
              <option value="">Select item</option>
              {items.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Type</label>
            <select className="form-select" value={type} onChange={e => setType(e.target.value)} required>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input type="number" className="form-control" value={quantity} min={1} onChange={e => setQuantity(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Transaction</button>
        </form>
      </div>
    </div>
  );
} 