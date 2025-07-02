import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addInventoryItem } from '../firebase/firestore';
import { FaArrowLeft, FaPlus, FaSpinner } from 'react-icons/fa';
import '../styles/global.css';
import QrBarcodeScanner from 'react-qr-barcode-scanner';

export default function AddItem() {
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    supplier: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleScan = (result) => {
    if (result) {
      setItemData(prev => ({ ...prev, name: result.text }));
      setShowScanner(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const quantity = Number(itemData.quantity);
    const price = Number(itemData.price);

    if (quantity < 0 || price < 0) {
      setError("Quantity and Price cannot be negative.");
      setLoading(false);
      return;
    }

    try {
      await addInventoryItem({
        ...itemData,
        quantity,
        price,
        lastUpdated: new Date().toISOString()
      });
      navigate('/inventory');
    } catch (err) {
      setError('Failed to add item. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold" style={{ color: 'var(--primary-color)' }}>
            Add New Item
          </h2>
          <p className="text-muted mb-0">Fill in the details below to add a new item to your inventory</p>
        </div>
        <Link to="/inventory" className="btn btn-outline-primary d-flex align-items-center hover-lift">
          <FaArrowLeft className="me-2" /> Back to Inventory
        </Link>
      </div>
      <div className="card shadow-sm rounded-lg overflow-hidden">
        <div className="card-header bg-white border-bottom-0 py-3">
          <h5 className="mb-0 text-primary">
            <FaPlus className="me-2" /> Item Details
          </h5>
        </div>
        <div className="card-body p-4">
          {showScanner && (
            <div className="mb-3">
              <QrBarcodeScanner
                onUpdate={(err, result) => {
                  if (result) handleScan(result);
                }}
                style={{ width: '100%' }}
              />
              <button className="btn btn-secondary mt-2" onClick={() => setShowScanner(false)}>Close Scanner</button>
            </div>
          )}
          {error && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <div className="me-2">
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <div>{error}</div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-group d-flex align-items-center gap-2">
                  <label className="form-label fw-medium mb-0">Item Name *</label>
                  <button type="button" className="btn btn-outline-info btn-sm" onClick={() => setShowScanner(true)}>
                    Scan Barcode/QR
                  </button>
                </div>
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter item name"
                  value={itemData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-group">
                  <label className="form-label fw-medium">Category *</label>
                  <select
                    name="category"
                    className="form-select form-select-lg"
                    value={itemData.category}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="form-group">
                  <label className="form-label fw-medium">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control form-control-lg"
                    placeholder="0"
                    value={itemData.quantity}
                    onChange={handleChange}
                    required
                    min="0"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  className="form-control"
                  value={itemData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Supplier</label>
              <input
                type="text"
                name="supplier"
                className="form-control"
                value={itemData.supplier}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Item'}
              </button>
              <Link to="/inventory" className="btn btn-secondary" disabled={loading}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
