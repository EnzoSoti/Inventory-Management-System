// Example of how to use the fixed functions in your React component
import React, { useState, useEffect } from 'react';
import { 
  fetchInventoryItems, 
  fetchFromCollection, 
  testFirebaseConnection, 
  addSampleData 
} from './firebase';

const InventoryComponent = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Test Firebase connection first
  const handleTestConnection = async () => {
    try {
      await testFirebaseConnection();
      alert("Check console for connection test results");
    } catch (error) {
      console.error("Connection test failed:", error);
      alert("Connection test failed - check console for details");
    }
  };

  // Fetch data with proper error handling
  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Try the original function first
      let data = await fetchInventoryItems();
      
      // If no data, try alternative collection names
      if (data.length === 0) {
        console.log("No data in 'inventoryItems', trying other collection names...");
        const collections = ["inventory", "items", "products", "1"];
        
        for (const collectionName of collections) {
          try {
            data = await fetchFromCollection(collectionName);
            if (data.length > 0) {
              console.log(`Found data in collection: ${collectionName}`);
              break;
            }
          } catch (err) {
            console.log(`Collection ${collectionName} failed:`, err.message);
          }
        }
      }
      
      setItems(data);
      console.log("Final data set:", data);
      
    } catch (error) {
      setError(error.message);
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add sample data for testing
  const handleAddSampleData = async () => {
    try {
      await addSampleData();
      alert("Sample data added! Now try fetching data.");
    } catch (error) {
      console.error("Failed to add sample data:", error);
      alert("Failed to add sample data - check console for details");
    }
  };

  useEffect(() => {
    // Automatically test connection and fetch data on component mount
    handleFetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Inventory Management Debug Panel</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleTestConnection} style={{ marginRight: '10px' }}>
          Test Firebase Connection
        </button>
        <button onClick={handleFetchData} style={{ marginRight: '10px' }}>
          Fetch Data
        </button>
        <button onClick={handleAddSampleData}>
          Add Sample Data
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div>
        <h3>Data Status:</h3>
        <p>Items found: {items.length}</p>
        
        {items.length > 0 ? (
          <div>
            <h4>Inventory Items:</h4>
            <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
              {JSON.stringify(items, null, 2)}
            </pre>
          </div>
        ) : (
          <p>No items found. Try:</p>
        )}
        
        {items.length === 0 && (
          <ul>
            <li>1. Click "Test Firebase Connection" to check connectivity</li>
            <li>2. Click "Add Sample Data" to add test data</li>
            <li>3. Check your Firebase Console for the correct collection name</li>
            <li>4. Verify your Firestore security rules allow reading</li>
            <li>5. Check browser console for detailed error messages</li>
          </ul>
        )}
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h4>Debug Info:</h4>
        <p>Open browser console (F12) to see detailed logs</p>
        <p>The functions will try multiple collection names automatically</p>
      </div>
    </div>
  );
};

export default InventoryComponent;