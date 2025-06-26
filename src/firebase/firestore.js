import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

// Fetch all inventory items
export const fetchInventoryItems = async () => {
  const snapshot = await getDocs(collection(db, "1"));
  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return items;
};
