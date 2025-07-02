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

// Add a new inventory item
export const addInventoryItem = async (itemData) => {
  const docRef = await addDoc(collection(db, INVENTORY_COLLECTION), itemData);
  return docRef.id;
};

// Update an inventory item
export const updateInventoryItem = async (itemId, itemData) => {
  const docRef = doc(db, INVENTORY_COLLECTION, itemId);
  await updateDoc(docRef, itemData);
};

// Delete an inventory item
export const deleteInventoryItem = async (itemId) => {
  const docRef = doc(db, INVENTORY_COLLECTION, itemId);
  await deleteDoc(docRef);
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

// (Add, update, delete transaction logic can be added as needed)

// === REPORTS PLACEHOLDER ===
// Future: Add aggregation functions for reports
