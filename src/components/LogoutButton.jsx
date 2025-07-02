import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <button 
      className="btn d-flex align-items-center gap-2 px-4 py-2 fw-bold" 
      onClick={handleLogout} 
      title={t('logout')} 
      data-bs-toggle="tooltip" 
      aria-label={t('logout')}
      style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        border: '2px solid #3b82f6',
        borderRadius: '12px',
        color: 'white',
        fontSize: '0.8rem',
        transition: 'all 0.25s ease',
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)';
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
        e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
      }}
    >
      <span style={{ fontSize: '1rem' }}>🚪</span>
      {t('logout')}
    </button>
  );
} 