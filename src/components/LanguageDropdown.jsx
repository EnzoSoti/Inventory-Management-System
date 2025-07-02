import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function LanguageDropdown() {
  const { t } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  return (
    <div className="dropdown">
      <button 
        className="btn d-flex align-items-center gap-2 px-4 py-2" 
        type="button" 
        id="langDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
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
        <span style={{ fontSize: '1rem' }}>🌐</span>
        {i18n.language === 'es' ? 'Español' : 'English'}
      </button>
      <ul className="dropdown-menu border-0 shadow-lg mt-3" aria-labelledby="langDropdown" style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '12px',
        minWidth: '160px'
      }}>
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-3 py-3 px-3" 
            onClick={() => handleLanguageChange('en')}
            style={{
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#475569',
              transition: 'all 0.2s ease',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
              e.target.style.color = '#1e40af';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#475569';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🇺🇸</span> English
          </button>
        </li>
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-3 py-3 px-3" 
            onClick={() => handleLanguageChange('es')}
            style={{
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#475569',
              transition: 'all 0.2s ease',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
              e.target.style.color = '#1e40af';
              e.target.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#475569';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🇪🇸</span> Español
          </button>
        </li>
      </ul>
    </div>
  );
} 