import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button 
      className="btn d-flex align-items-center gap-2 px-4 py-2" 
      onClick={toggleTheme} 
      title={t('theme_switcher')} 
      data-bs-toggle="tooltip" 
      aria-label={t('theme_switcher')}
      style={{
        backgroundColor: 'white',
        border: '2px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '12px',
        color: '#3b82f6',
        fontSize: '0.8rem',
        fontWeight: '700',
        transition: 'all 0.25s ease',
        boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#3b82f6';
        e.target.style.color = 'white';
        e.target.style.borderColor = '#3b82f6';
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.25)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#3b82f6';
        e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.1)';
      }}
    >
      {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
      <span className="d-none d-lg-inline">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
} 