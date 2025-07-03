import { useEffect, useRef, useState } from 'react';
import { useAuth } from "../context/AuthContext";
import WelcomeModal from '../components/WelcomeModal';
import DashboardCard from '../components/DashboardCard';
import toast from 'react-hot-toast';
import { message } from 'antd';

export default function Dashboard() {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const getStartedRef = useRef();
  const modalRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('onboarded')) {
      setShowWelcome(true); 
      localStorage.setItem('onboarded', 'yes');
    }
  }, []);

  const closeWelcome = () => {
    setShowWelcome(false);
    if (getStartedRef.current) getStartedRef.current.focus();
  };

  // Demo handlers
  const showToast = () => toast.success('This is a React Hot Toast notification!');
  const showAntdMessage = () => message.info('This is an Ant Design message!');
  const showAntdModal = () => setIsModalOpen(true);
  const handleModalOk = () => setIsModalOpen(false);
  const handleModalCancel = () => setIsModalOpen(false);

  return (
    <div className="container py-5">
      {/* Onboarding Welcome Modal */}
      <WelcomeModal 
        show={showWelcome} 
        onClose={closeWelcome} 
        getStartedRef={getStartedRef} 
        ref={modalRef}
      />
      <div className="text-center mb-5 animate__animated animate__fadeIn">
        <h1 className="fw-bold mb-3" style={{ color: 'var(--primary-color)' }}>
          Welcome, {user?.email}
        </h1>
        <p className="lead text-muted mb-0">Your Admin Dashboard</p>
      </div>
      <div className="row g-4 justify-content-center">
        <DashboardCard 
          to="/inventory" 
          bg="bg-primary" 
          title="View Inventory" 
          description="Browse and manage all inventory items" 
        />
        <DashboardCard 
          to="/inventory/add" 
          bg="bg-success" 
          title="Add Item" 
          description="Quickly add new items to your stock" 
        />
        <DashboardCard 
          to="/categories" 
          bg="bg-secondary" 
          title="Manage Categories" 
          description="Organize your inventory by category" 
        />
        <DashboardCard 
          to="/transactions" 
          bg="bg-info" 
          title="View Transactions" 
          description="Track all inventory transactions" 
        />
        <DashboardCard 
          to="/reports" 
          bg="bg-warning" 
          title="Reports" 
          description="Analyze inventory data and trends" 
        />
      </div>
    </div>
  );
}