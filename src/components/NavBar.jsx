import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => {
      if (window.bootstrap && window.bootstrap.Tooltip) {
        new window.bootstrap.Tooltip(el);
      }
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 px-3 d-flex justify-content-between align-items-center">
      <div>
        <Link className="navbar-brand fw-bold me-4" to="/">Inventory System</Link>
        <div className="navbar-nav flex-row gap-3 d-inline-flex">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
          <Link className="nav-link" to="/inventory">Inventory</Link>
          <Link className="nav-link" to="/categories">Categories</Link>
          <Link className="nav-link" to="/transactions">Transactions</Link>
          <Link className="nav-link" to="/reports">Reports</Link>
          <Link className="nav-link" to="/suppliers">Suppliers</Link>
          <Link className="nav-link" to="/add">Add Item</Link>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <div className="dropdown me-2">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="langDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {i18n.language === 'es' ? 'ES' : 'EN'}
          </button>
          <ul className="dropdown-menu" aria-labelledby="langDropdown">
            <li><button className="dropdown-item" onClick={() => handleLanguageChange('en')}>EN - English</button></li>
            <li><button className="dropdown-item" onClick={() => handleLanguageChange('es')}>ES - Español</button></li>
          </ul>
        </div>
        <button className="btn btn-outline-secondary d-flex align-items-center" onClick={toggleTheme} title={t('theme_switcher')} data-bs-toggle="tooltip" aria-label={t('theme_switcher')}>
          {theme === 'dark' ? <FaSun className="me-1" /> : <FaMoon className="me-1" />}
          <span className="d-none d-md-inline">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </button>
        <button className="btn btn-outline-danger ms-2" onClick={handleLogout} title={t('logout')} data-bs-toggle="tooltip" aria-label={t('logout')}>
          {t('logout')}
        </button>
      </div>
    </nav>
  );
} 