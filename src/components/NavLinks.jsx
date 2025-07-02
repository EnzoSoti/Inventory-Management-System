import { Link } from 'react-router-dom';

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/inventory", label: "Inventory", icon: "📦" },
  { to: "/categories", label: "Categories", icon: "🏷️" },
  { to: "/transactions", label: "Transactions", icon: "💰" },
  { to: "/reports", label: "Reports", icon: "📊" },
  { to: "/suppliers", label: "Suppliers", icon: "🏭" }
];

export default function NavLinks() {
  return (
    <div className="navbar-nav d-flex flex-row">
      {navItems.map((item, index) => (
        <div key={index} className="position-relative mx-1">
          <Link 
            className="nav-link text-decoration-none px-4 py-3 d-flex flex-column align-items-center position-relative" 
            to={item.to}
            style={{
              color: '#475569',
              fontSize: '0.75rem',
              fontWeight: '600',
              borderRadius: '14px',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              minWidth: '70px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#1e40af';
              e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.08)';
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#475569';
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span className="mb-1" style={{ fontSize: '1.1rem' }}>{item.icon}</span>
            <span className="d-none d-xl-inline" style={{ lineHeight: '1' }}>
              {item.label}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
} 