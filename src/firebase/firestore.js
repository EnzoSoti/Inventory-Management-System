import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./config";
import { getAuth } from 'firebase/auth';

const INVENTORY_COLLECTION = "inventory";

// Fetch all inventory items
export const fetchInventoryItems = async () => {
  const snapshot = await getDocs(collection(db, INVENTORY_COLLECTION));
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return items;
};

// Fetch a single inventory item by ID
export const fetchInventoryItem = async (itemId) => {
  const docRef = doc(db, INVENTORY_COLLECTION, itemId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("No such document!");
  }
};

const AUDIT_COLLECTION = 'inventory_audit';

async function logAudit(itemId, action, data) {
  const auth = getAuth();
  const user = auth.currentUser;
  await addDoc(collection(db, AUDIT_COLLECTION), {
    itemId,
    action,
    timestamp: new Date().toISOString(),
    userId: user ? user.uid : null,
    data
  });
}

// Add a new inventory item
export const addInventoryItem = async (itemData) => {
  const docRef = await addDoc(collection(db, INVENTORY_COLLECTION), itemData);
  await logAudit(docRef.id, 'add', itemData);
  // Automatically log a transaction for initial stock
  const auth = getAuth();
  const user = auth.currentUser;
  if (itemData.quantity && itemData.quantity > 0) {
    await addTransaction({
      itemId: docRef.id,
      type: 'in',
      quantity: itemData.quantity,
      timestamp: new Date().toISOString(),
      userId: user ? user.uid : null
    });
  }
  return docRef.id;
};

// Update an inventory item
export const updateInventoryItem = async (itemId, itemData) => {
  const docRef = doc(db, INVENTORY_COLLECTION, itemId);
  // Fetch current item to compare quantity
  const currentSnap = await getDoc(docRef);
  const currentData = currentSnap.exists() ? currentSnap.data() : {};
  await updateDoc(docRef, itemData);
  await logAudit(itemId, 'edit', itemData);
  // Automatically log a transaction if quantity changed
  if (typeof itemData.quantity === 'number' && typeof currentData.quantity === 'number' && itemData.quantity !== currentData.quantity) {
    const diff = itemData.quantity - currentData.quantity;
    const auth = getAuth();
    const user = auth.currentUser;
    await addTransaction({
      itemId,
      type: diff > 0 ? 'in' : 'out',
      quantity: Math.abs(diff),
      timestamp: new Date().toISOString(),
      userId: user ? user.uid : null
    });
  }
};

// Delete an inventory item
export const deleteInventoryItem = async (itemId) => {
  const docRef = doc(db, INVENTORY_COLLECTION, itemId);
  // Fetch item data before deleting for audit
  const itemSnap = await getDoc(docRef);
  const itemData = itemSnap.exists() ? itemSnap.data() : {};
  await deleteDoc(docRef);
  await logAudit(itemId, 'delete', itemData);
};

// === CATEGORY LOGIC ===
const CATEGORY_COLLECTION = "categories";

export const fetchCategories = async () => {
  const snapshot = await getDocs(collection(db, CATEGORY_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCategory = async (categoryData) => {
  const docRef = await addDoc(collection(db, CATEGORY_COLLECTION), categoryData);
  return docRef.id;
};

export const updateCategory = async (categoryId, categoryData) => {
  const docRef = doc(db, CATEGORY_COLLECTION, categoryId);
  await updateDoc(docRef, categoryData);
};

export const deleteCategory = async (categoryId) => {
  const docRef = doc(db, CATEGORY_COLLECTION, categoryId);
  await deleteDoc(docRef);
};

// === TRANSACTION LOGIC ===
const TRANSACTION_COLLECTION = "transactions";

export const fetchTransactions = async () => {
  const snapshot = await getDocs(collection(db, TRANSACTION_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTransaction = async (transactionData) => {
  const docRef = await addDoc(collection(db, "transactions"), transactionData);
  return docRef.id;
};

// === REPORTS PLACEHOLDER ===
// Future: Add aggregation functions for reports

// === SUPPLIER LOGIC ===
const SUPPLIER_COLLECTION = "suppliers";

export const fetchSuppliers = async () => {
  const snapshot = await getDocs(collection(db, SUPPLIER_COLLECTION));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addSupplier = async (supplierData) => {
  const docRef = await addDoc(collection(db, SUPPLIER_COLLECTION), supplierData);
  return docRef.id;
};

export const updateSupplier = async (supplierId, supplierData) => {
  const docRef = doc(db, SUPPLIER_COLLECTION, supplierId);
  await updateDoc(docRef, supplierData);
};

export const deleteSupplier = async (supplierId) => {
  const docRef = doc(db, SUPPLIER_COLLECTION, supplierId);
  await deleteDoc(docRef);
};
