import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchInventoryItems, deleteInventoryItem, addInventoryItem } from "../firebase/firestore";
import Papa from 'papaparse';
import emailjs from 'emailjs-com';
import { fetchExternalProducts } from '../api/externalProducts';

function exportToCSV(items) {
  if (!items.length) return;
  const header = ["Name", "Category", "Quantity", "Price", "Supplier"];
  const rows = items.map(item => [
    item.name,
    item.category,
    item.quantity,
    item.price,
    item.supplier
  ]);
  const csvContent = [header, ...rows]
    .map(e => e.map(v => `"${(v ?? '').toString().replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'inventory.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState("");
  const [apiProducts, setApiProducts] = useState([]);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const handleImportCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    setImportMessage("");
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        let success = 0, fail = 0;
        for (const row of results.data) {
          // Basic validation
          if (!row.Name || !row.Category || !row.Quantity) {
            fail++;
            continue;
          }
          try {
            await addInventoryItem({
              name: row.Name,
              category: row.Category,
              quantity: Number(row.Quantity),
              price: row.Price ? Number(row.Price) : 0,
              supplier: row.Supplier || "",
              description: row.Description || "",
              lastUpdated: new Date().toISOString()
            });
            success++;
          } catch {
            fail++;
          }
        }
        setImportMessage(`Imported: ${success} items. Failed: ${fail} rows.`);
        setImporting(false);
        loadItems();
      },
      error: () => {
        setImportMessage("Failed to parse CSV file.");
        setImporting(false);
      }
    });
  };

  const sendLowStockAlert = async (item) => {
    try {
      await emailjs.send(
        'service_cb5n3yd',
        'template_3211ltb',
        {
          item_name: item.name,
          item_category: item.category,
          item_quantity: item.quantity,
          item_supplier: item.supplier,
          to_email: 'parane.enzo@gmail.com',
        },
        '1flDZCxvwS892-bij'
      );
      setImportMessage(`Low stock alert sent for ${item.name}`);
    } catch (e) {
      setImportMessage('Failed to send alert.');
    }
  };

  const handleImportFromAPI = async () => {
    setApiLoading(true);
    setApiError("");
    try {
      const products = await fetchExternalProducts();
      setApiProducts(products);
      setShowApiModal(true);
    } catch (e) {
      setApiError("Failed to fetch products from external API.");
    }
    setApiLoading(false);
  };

  const handleImportProduct = async (product) => {
    try {
      await addInventoryItem({
        name: product.title || product.name,
        category: product.category || 'External',
        quantity: 1,
        price: product.price || 0,
        supplier: product.brand || '',
        description: product.description || '',
        lastUpdated: new Date().toISOString()
      });
      setImportMessage(`Imported: ${product.title || product.name}`);
    } catch {
      setImportMessage('Failed to import product.');
    }
  };

  // Filter items by search
  const filteredItems = items.filter(item => {
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.supplier && item.supplier.toLowerCase().includes(q))
    );
  });

  if (loading) return <div className="container mt-5"><p>Loading inventory...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
          Inventory
        </h1>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={() => exportToCSV(filteredItems)}>
            Export CSV
          </button>
          <label className="btn btn-outline-success mb-0">
            Import CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} style={{ display: 'none' }} disabled={importing} />
          </label>
          <button className="btn btn-outline-info" onClick={handleImportFromAPI} disabled={apiLoading}>
            {apiLoading ? 'Loading...' : 'Import from API'}
          </button>
          <Link to="/inventory/add" className="btn btn-success">
            Add Item
          </Link>
        </div>
        {importMessage && (
          <div className={`alert ${importMessage.includes('Failed') ? 'alert-warning' : 'alert-success'} mt-2`}>
            {importMessage}
          </div>
        )}
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search by name, category, or supplier..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Stock Alert Legend */}
      <div className="mb-2 d-flex gap-3 align-items-center">
        <span><span className="badge bg-danger">Out of Stock</span></span>
        <span><span className="badge bg-warning text-dark">Low Stock (≤5)</span></span>
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
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No items found.
              </td>
            </tr>
          ) : (
            filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>
                  {item.quantity === 0 ? (
                    <span className="badge bg-danger">0</span>
                  ) : item.quantity <= 5 ? (
                    <span className="badge bg-warning text-dark">{item.quantity}</span>
                  ) : (
                    item.quantity
                  )}
                </td>
                <td>₱{item.price ? item.price.toLocaleString() : 'N/A'}</td>
                <td>{item.supplier}</td>
                <td>
                  <Link to={`/inventory/edit/${item.id}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger me-2">
                    Delete
                  </button>
                  {(item.quantity === 0 || item.quantity <= 5) && (
                    <button className="btn btn-sm btn-outline-info" onClick={() => sendLowStockAlert(item)}>
                      Send Low Stock Alert
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {showApiModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Import Products from API</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowApiModal(false)}></button>
              </div>
              <div className="modal-body">
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiProducts.map((p, i) => (
                        <tr key={p.id || i}>
                          <td>{p.title || p.name}</td>
                          <td>{p.category}</td>
                          <td>{p.price}</td>
                          <td style={{ maxWidth: 200 }}>{p.description?.slice(0, 60)}...</td>
                          <td>
                            <button className="btn btn-sm btn-primary" onClick={() => handleImportProduct(p)}>
                              Import
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowApiModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
