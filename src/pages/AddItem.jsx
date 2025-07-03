import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addInventoryItem, fetchSuppliers, fetchCategories } from '../firebase/firestore';
import { FaArrowLeft, FaPlus, FaSpinner } from 'react-icons/fa';
import '../styles/global.css';
import QrBarcodeScanner from 'react-qr-barcode-scanner';
import toast from 'react-hot-toast';
import { message } from 'antd';

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
  const [suppliers, setSuppliers] = useState([]);
  const [customSupplier, setCustomSupplier] = useState('');
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    async function loadSuppliers() {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (e) {
        // Optionally handle error
      }
    }
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (e) {
        // Optionally handle error
      }
    }
    loadSuppliers();
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const quantity = Number(itemData.quantity);
    const price = Number(itemData.price);
    let supplierValue = itemData.supplier === '__custom__' ? customSupplier : itemData.supplier;
    if (quantity < 0 || price < 0) {
      message.error("Quantity and Price cannot be negative.");
      setLoading(false);
      return;
    }
    try {
      await addInventoryItem({
        ...itemData,
        supplier: supplierValue,
        quantity,
        price,
        lastUpdated: new Date().toISOString()
      });
      toast.success('Item added successfully!');
      navigate('/inventory');
    } catch (err) {
      message.error('Failed to add item. Please try again.');
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
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
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
              <select
                name="supplier"
                className="form-control mb-2"
                value={itemData.supplier}
                onChange={e => setItemData(prev => ({ ...prev, supplier: e.target.value }))}
                disabled={loading}
              >
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                ))}
                <option value="__custom__">Other (Enter manually)</option>
              </select>
              {itemData.supplier === '__custom__' && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter supplier name"
                  value={customSupplier}
                  onChange={e => setCustomSupplier(e.target.value)}
                  disabled={loading}
                />
              )}
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
