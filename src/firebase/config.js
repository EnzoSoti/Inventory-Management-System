import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPHQJmNpr1OYflrqFAaj_isQdLJxuf8CQ",
  authDomain: "inventory-management-sys-4ca5b.firebaseapp.com",
  projectId: "inventory-management-sys-4ca5b",
  storageBucket: "inventory-management-sys-4ca5b.firebasestorage.app",
  messagingSenderId: "1059490894984",
  appId: "1:1059490894984:web:532071184c4d52d7063b3d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };