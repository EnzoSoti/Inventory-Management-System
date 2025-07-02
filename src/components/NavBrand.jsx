import { Link } from 'react-router-dom';

export default function NavBrand() {
  return (
    <div className="d-flex align-items-center">
      <Link 
        className="navbar-brand d-flex align-items-center text-decoration-none" 
        to="/"
        style={{
          color: '#1e3a8a',
          fontSize: '1.6rem',
          fontWeight: '800',
          letterSpacing: '-0.8px'
        }}
      >
        <div 
          className="me-3 d-flex align-items-center justify-content-center position-relative"
          style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '16px',
            color: 'white',
            fontSize: '1.3rem',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
          }}
        >
          <div 
            className="position-absolute"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '50%',
              top: '12px',
              right: '12px'
            }}
          ></div>
          📋
        </div>
        <div>
          <div style={{ lineHeight: '1.1' }}>Inventory</div>
          <div style={{ 
            fontSize: '0.7rem', 
            color: '#64748b', 
            fontWeight: '500',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}>System</div>
        </div>
      </Link>
    </div>
  );
} 