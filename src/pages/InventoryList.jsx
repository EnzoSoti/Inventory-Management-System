import { useEffect, useState } from "react";
import { fetchInventoryItems } from "../firebase/firestore";

export default function InventoryList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchInventoryItems();
      setItems(data);
    };

    loadItems();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Inventory List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No items found.
              </td>
            </tr>
          ) : (
            items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>₱{item.price.toLocaleString()}</td>
                <td>{item.supplier}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
