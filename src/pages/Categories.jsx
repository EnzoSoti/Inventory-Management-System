import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../firebase/firestore';
import toast from 'react-hot-toast';
import { message, Modal } from 'antd';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data);
      setError('');
    } catch (err) {
      setError('Failed to load categories.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    try {
      await addCategory({ name: newCategory });
      setNewCategory('');
      loadCategories();
      toast.success('Category added!');
    } catch {
      message.error('Failed to add category.');
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
  };

  const handleUpdate = async (id) => {
    if (!editValue.trim()) return;
    try {
      await updateCategory(id, { name: editValue });
      setEditId(null);
      setEditValue('');
      loadCategories();
      toast.success('Category updated!');
    } catch {
      message.error('Failed to update category.');
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Delete this category?',
      content: 'Are you sure you want to delete this category?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteCategory(id);
          loadCategories();
          toast.success('Category deleted!');
        } catch {
          message.error('Failed to delete category.');
        }
      },
    });
  };

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold" style={{ color: 'var(--primary-color)' }}>
          Categories
        </h1>
        <Link to="/inventory" className="btn btn-outline-primary">
          Back to Inventory
        </Link>
      </div>
      <div className="card shadow p-4">
        <form className="d-flex mb-4" onSubmit={handleAdd}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="New category name"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            disabled={loading}
          />
          <button className="btn btn-primary" type="submit" disabled={loading || !newCategory.trim()}>
            Add
          </button>
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan="2" className="text-center">No categories found.</td></tr>
              ) : (
                categories.map(cat => (
                  <tr key={cat.id}>
                    <td>
                      {editId === cat.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                        />
                      ) : (
                        cat.name
                      )}
                    </td>
                    <td>
                      {editId === cat.id ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(cat.id)}>
                            Save
                          </button>
                          <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(cat.id, cat.name)}>
                            Edit
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </td>
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
