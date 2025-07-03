import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import InventoryList from './pages/InventoryList';
import AddItem from './pages/AddItem';
import Categories from './pages/Categories';
import EditItem from './pages/EditItem';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';
import NavBar from './components/NavBar';
import Suppliers from './pages/Suppliers';
import { ThemeProvider } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import AddTransaction from './pages/AddTransaction';

function AppRoutes() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
      />
      <Route 
        path="/inventory" 
        element={<ProtectedRoute><InventoryList /></ProtectedRoute>} 
      />
      <Route path="/inventory/add" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
      <Route path="/inventory/edit/:itemId" element={<ProtectedRoute><EditItem /></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
      <Route path="/add-transaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  // automatically logout when the page is closed
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     if (user) {
  //       logout();
  //     }
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [user, logout]);

  return (
    <ThemeProvider>
      <Router>
        {user && <NavBar />}
        <AppRoutes />
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;