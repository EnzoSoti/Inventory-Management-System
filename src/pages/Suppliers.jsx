import { useEffect, useState } from "react";
import { fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } from "../firebase/firestore";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", email: "", phone: "", address: "", notes: "" });
  const [editId, setEditId] = useState(null);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch suppliers.");
    }
    setLoading(false);
  };

  useEffect(() => { loadSuppliers(); }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await updateSupplier(editId, form);
      } else {
        await addSupplier(form);
      }
      setForm({ name: "", contact: "", email: "", phone: "", address: "", notes: "" });
      setEditId(null);
      setShowForm(false);
      loadSuppliers();
    } catch {
      setError("Failed to save supplier.");
    }
  };

  const handleEdit = supplier => {
    setForm(supplier);
    setEditId(supplier.id);
    setShowForm(true);
  };

  const handleDelete = async id => {
    if (window.confirm("Delete this supplier?")) {
      await deleteSupplier(id);
      loadSuppliers();
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
          Suppliers
        </h1>
        <button className="btn btn-success" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", contact: "", email: "", phone: "", address: "", notes: "" }); }}>
          Add Supplier
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {showForm && (
        <div className="card mb-4 p-4">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name *</label>
              <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contact</label>
              <input className="form-control" name="contact" value={form.contact} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input className="form-control" name="email" value={form.email} onChange={handleChange} type="email" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input className="form-control" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Address</label>
              <input className="form-control" name="address" value={form.address} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label">Notes</label>
              <textarea className="form-control" name="notes" value={form.notes} onChange={handleChange} />
            </div>
            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit">{editId ? "Update" : "Add"} Supplier</button>
              <button className="btn btn-secondary" type="button" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {loading ? <p>Loading suppliers...</p> : (
        <div className="row g-4">
          {suppliers.length === 0 ? <p>No suppliers found.</p> : suppliers.map(supplier => (
            <div className="col-12 col-md-6 col-lg-4" key={supplier.id}>
              <div className="dashboard-card bg-secondary text-white h-100">
                <h4 className="fw-bold mb-1">{supplier.name}</h4>
                <div className="mb-2 small">{supplier.contact}</div>
                <div className="mb-2"><span className="fw-semibold">Email:</span> {supplier.email || <span className="text-muted">N/A</span>}</div>
                <div className="mb-2"><span className="fw-semibold">Phone:</span> {supplier.phone || <span className="text-muted">N/A</span>}</div>
                <div className="mb-2"><span className="fw-semibold">Address:</span> {supplier.address || <span className="text-muted">N/A</span>}</div>
                <div className="mb-2"><span className="fw-semibold">Notes:</span> {supplier.notes || <span className="text-muted">N/A</span>}</div>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(supplier)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(supplier.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 