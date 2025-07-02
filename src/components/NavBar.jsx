import { useEffect } from 'react';
import NavBrand from './NavBrand';
import NavLinks from './NavLinks';
import LanguageDropdown from './LanguageDropdown';
import ThemeToggle from './ThemeToggle';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(el => {
      if (window.bootstrap && window.bootstrap.Tooltip) {
        new window.bootstrap.Tooltip(el);
      }
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg mb-4" style={{
      backgroundColor: '#fafbff',
      borderTop: '3px solid #3b82f6',
      borderBottom: '1px solid rgba(59, 130, 246, 0.15)',
      boxShadow: '0 4px 25px rgba(59, 130, 246, 0.08)'
    }}>
      <div className="container-fluid px-5 py-3">
        <div className="w-100 d-flex justify-content-between align-items-center">
          {/* Brand Section */}
          <NavBrand />
          {/* Navigation Links */}
          <NavLinks />
          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-3">
            <LanguageDropdown />
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}