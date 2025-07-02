import { forwardRef, useEffect, useRef } from 'react';

const WelcomeModal = forwardRef(({ show, onClose, getStartedRef }, modalRef) => {
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus();
    }
  }, [show, modalRef]);

  if (!show) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ background: 'rgba(0,0,0,0.5)' }} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="welcomeTitle" 
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg rounded-3">
          <div className="modal-header border-0 bg-light">
            <h5 className="modal-title fw-bold" id="welcomeTitle">Welcome to Inventory Management System!</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <ul className="list-unstyled mb-4">
              <li className="mb-2">🌟 <b>Add Items</b> to your inventory with the green button.</li>
              <li className="mb-2">🔍 <b>Search & Filter</b> inventory instantly.</li>
              <li className="mb-2">⚠️ <b>Stock Alerts</b> highlight low/out-of-stock items.</li>
              <li className="mb-2">⬆️ <b>Import/Export CSV</b> for bulk management.</li>
              <li className="mb-2">📦 <b>Suppliers</b> management and linking.</li>
              <li className="mb-2">📊 <b>Reports</b> and analytics for insights.</li>
              <li className="mb-2">🌙 <b>Theme Switcher</b> for dark/light mode.</li>
            </ul>
            <p className="mb-0 text-muted">Explore the navigation bar to access all features. Enjoy!</p>
          </div>
          <div className="modal-footer border-0">
            <button 
              className="btn btn-primary rounded-pill px-4" 
              ref={getStartedRef} 
              onClick={onClose}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WelcomeModal; 