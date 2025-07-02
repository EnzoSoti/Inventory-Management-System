import { Link } from 'react-router-dom';

export default function DashboardCard({ to, bg, title, description }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
      <Link 
        to={to} 
        className="dashboard-card-modern text-decoration-none d-block position-relative overflow-hidden"
        style={{
          borderRadius: '24px',
          background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: 'perspective(1000px) rotateX(0deg)',
          transformStyle: 'preserve-3d',
          minHeight: '280px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg) translateY(-12px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0px) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.05)';
        }}
      >
        {/* Animated Background Orb */}
        <div className="position-absolute" 
             style={{
               width: '200px',
               height: '200px',
               borderRadius: '50%',
               top: '-50px',
               right: '-50px',
               background: `conic-gradient(from 0deg, var(--bs-${bg.replace('bg-', '')}) 0%, transparent 180deg)`,
               opacity: 0.1,
               animation: 'rotate 20s linear infinite',
               filter: 'blur(1px)'
             }}>
        </div>

        {/* Glass Effect Overlay */}
        <div className="position-absolute w-100 h-100"
             style={{
               background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
               backdropFilter: 'blur(10px)'
             }}>
        </div>

        {/* Color Accent Strip */}
        <div className={`position-absolute ${bg}`}
             style={{
               width: '4px',
               height: '100%',
               left: '0',
               top: '0',
               background: `linear-gradient(180deg, var(--bs-${bg.replace('bg-', '')}) 0%, rgba(var(--bs-${bg.replace('bg-', '')}-rgb), 0.3) 100%)`
             }}>
        </div>

        {/* Main Content */}
        <div className="position-relative p-4 h-100 d-flex flex-column">
          {/* Icon Container */}
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <div className={`rounded-circle d-flex align-items-center justify-content-center ${bg}`}
                 style={{
                   width: '56px',
                   height: '56px',
                   background: `linear-gradient(135deg, var(--bs-${bg.replace('bg-', '')}) 0%, rgba(var(--bs-${bg.replace('bg-', '')}-rgb), 0.8) 100%)`,
                   boxShadow: `0 8px 24px rgba(var(--bs-${bg.replace('bg-', '')}-rgb), 0.3)`
                 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="icon-animation">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Status Indicator */}
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-success"
                   style={{
                     width: '8px',
                     height: '8px',
                     animation: 'pulse 2s infinite',
                     boxShadow: '0 0 10px rgba(40, 167, 69, 0.5)'
                   }}>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-grow-1 d-flex flex-column">
            <h4 className="fw-bold mb-3 text-dark"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  lineHeight: '1.3',
                  background: `linear-gradient(135deg, #2c3e50 0%, var(--bs-${bg.replace('bg-', '')}) 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: '700'
                }}>
              {title}
            </h4>
            
            <p className="text-muted mb-4 flex-grow-1"
               style={{
                 fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                 lineHeight: '1.5',
                 opacity: 0.8
               }}>
              {description}
            </p>

            {/* Action Button */}
            <div className="mt-auto">
              <div className={`btn btn-outline-${bg.replace('bg-', '')} btn-sm rounded-pill px-4 py-2 border-2 fw-semibold action-btn`}
                   style={{
                     fontSize: '0.85rem',
                     transition: 'all 0.3s ease',
                     background: 'transparent',
                     position: 'relative',
                     overflow: 'hidden'
                   }}>
                <span className="position-relative z-2 d-flex align-items-center">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="ms-2 arrow-slide">
                    <path d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8.5H4.5a.5.5 0 0 1 0-1h6.293L8.146 5.146a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </span>
                
                {/* Button hover effect */}
                <div
                  className="position-absolute w-100 h-100 top-0 start-0 rounded-pill btn-fill"
                  style={{
                    background: `linear-gradient(135deg, var(--bs-${bg.replace('bg-', '')}) 0%, rgba(var(--bs-${bg.replace('bg-', '')}-rgb), 0.8) 100%)`,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                    zIndex: 1
                  }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="position-absolute"
             style={{
               bottom: '20px',
               right: '20px',
               width: '60px',
               height: '60px',
               borderRadius: '50%',
               background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
               animation: 'float 6s ease-in-out infinite'
             }}>
        </div>

        <style>{`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .dashboard-card-modern:hover .icon-animation {
            animation: rotate 0.5s ease-in-out;
          }
          
          .dashboard-card-modern:hover .arrow-slide {
            transform: translateX(4px);
            transition: transform 0.3s ease;
          }
          
          .dashboard-card-modern:hover .action-btn {
            color: white !important;
            border-color: transparent !important;
          }
          
          .dashboard-card-modern:hover .btn-fill {
            transform: translateX(0%) !important;
          }
          
          /* Responsive adjustments */
          @media (max-width: 576px) {
            .dashboard-card-modern {
              min-height: 240px !important;
            }
          }
          
          @media (max-width: 768px) {
            .dashboard-card-modern {
              min-height: 260px !important;
            }
          }
          
          /* Accessibility improvements */
          @media (prefers-reduced-motion: reduce) {
            .dashboard-card-modern,
            .dashboard-card-modern * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* High contrast mode support */
          @media (prefers-contrast: high) {
            .dashboard-card-modern {
              border: 2px solid currentColor !important;
              background: white !important;
            }
          }
        `}</style>
      </Link>
    </div>
  );
}