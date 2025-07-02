import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchInventoryItems, deleteInventoryItem } from "../firebase/firestore";

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    try {
      const data = await fetchInventoryItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteInventoryItem(itemId);
        // Refresh the list after deletion
        await loadItems(); 
      } catch (err) {
        alert("Failed to delete item.");
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading) return <div className="container mt-5"><p>Loading inventory...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Inventory List</h2>
        <Link to="/inventory/add" className="btn btn-primary">
          Add New Item
        </Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No items found.
              </td>
            </tr>
          ) : (
            items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>₱{item.price ? item.price.toLocaleString() : 'N/A'}</td>
                <td>{item.supplier}</td>
                <td>
                  <Link to={`/inventory/edit/${item.id}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
