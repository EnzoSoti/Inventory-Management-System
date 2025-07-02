import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem } from '../firebase/firestore';

export default function EditItem() {
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    supplier: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    const loadItem = async () => {
      try {
        const item = await fetchInventoryItem(itemId);
        setItemData(item);
      } catch (err) {
        setError('Failed to load item data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData(prevData => ({
      ...prevData,
      [name]: value,
    }));
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
      const { id, ...dataToUpdate } = itemData;
      await updateInventoryItem(itemId, {
        ...dataToUpdate,
        quantity,
        price,
      });
      navigate('/inventory');
    } catch (err) {
      setError('Failed to update item. Please try again.');
      console.error(err);
      setLoading(false);
    }
  };
  
  if (loading) return <div className="container mt-5"><p>Loading item...</p></div>;
  if (error && !itemData.name) return <div className="container mt-5 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Item: {itemData.name}</h2>
        <Link to="/inventory" className="btn btn-secondary">
          Back to Inventory
        </Link>
      </div>
      <div className="card shadow p-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={itemData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={itemData.category}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={itemData.quantity}
                onChange={handleChange}
                required
                min="0"
                disabled={loading}
              />
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
              {loading ? 'Updating...' : 'Update Item'}
            </button>
            <Link to="/inventory" className="btn btn-secondary" disabled={loading}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
