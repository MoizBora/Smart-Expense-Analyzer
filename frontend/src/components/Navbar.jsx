import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/add", label: "Add Expense" },
  { path: "/history", label: "History" },
  { path: "/insights", label: "Insights" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
       
        <Link to="/" style={styles.brand} onClick={() => setMobileMenuOpen(false)}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(15, 75, 50, 0.1))' }}>
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f4b32" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
            </defs>
            <circle cx="14" cy="14" r="13" fill="url(#logoGrad)" opacity="0.95"/>
            <path d="M9 14 L13 18 L19 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <div style={styles.brandTextContainer}>
            <span style={styles.brandText}>Flōw</span>
            <span style={styles.brandTagline}>Finance</span>
          </div>
        </Link>

        
        <ul className="desktop-nav" style={styles.linkList}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path} style={{ listStyle: 'none' }}>
                <Link 
                  to={link.path} 
                  style={{ 
                    ...styles.link, 
                    ...(isActive ? styles.activeLink : {}) 
                  }}
                >
                  {link.label}
                  {isActive && <div style={styles.activeDot} />}
                </Link>
              </li>
            );
          })}
        </ul>

        
        <Link to="/add" className="desktop-cta" style={styles.ctaButtonLink}>
          <button style={styles.ctaButton}>
            <span style={styles.plusIcon}>+</span>
            <span>New Entry</span>
          </button>
        </Link>

        
        <button 
          className="hamburger-btn"
          style={styles.hamburger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileMenuOpen ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="#0f4b32" strokeWidth="2" strokeLinecap="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#0f4b32" strokeWidth="2" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <ul style={styles.mobileMenuList}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} style={{ listStyle: 'none' }}>
                  <Link 
                    to={link.path} 
                    style={{ 
                      ...styles.mobileLink, 
                      ...(isActive ? styles.mobileLinkActive : {}) 
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                    {isActive && <div style={styles.activeDotMobile} />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link to="/add" style={{ textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
            <button style={styles.mobileCtaButton}>
              <span style={styles.plusIcon}>+</span>
              <span>New Entry</span>
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: "linear-gradient(to bottom, #fdfdf9 0%, #fafaf6 100%)",
    borderBottom: "1px solid rgba(15, 75, 50, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(10px)",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
  },
  inner: {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 20px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
  },
  brandTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  brandText: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#0f4b32",
    fontFamily: "'Playfair Display', Georgia, serif",
    lineHeight: "1",
  },
  brandTagline: {
    fontSize: "9px",
    fontWeight: "500",
    color: "#166534",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'Inter', sans-serif",
    marginTop: "-2px",
    opacity: 0.7,
  },
  linkList: {
    display: "none", // Controlled by injected CSS below
    gap: "4px",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#525252",
    fontWeight: "500",
    fontSize: "14.5px",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'Inter', sans-serif",
  },
  activeLink: {
    color: "#0f4b32",
    background: "rgba(15, 75, 50, 0.06)",
    fontWeight: "600",
  },
  activeDot: {
    width: "4px", height: "4px", borderRadius: "50%", background: "#166534",
  },
  ctaButtonLink: {
    textDecoration: 'none',
    display: "none", // Controlled by injected CSS below
  },
  ctaButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 18px",
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  plusIcon: { fontSize: "18px", lineHeight: "1" },
  hamburger: {
    display: "none", // Controlled by injected CSS below
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
  },
  mobileMenu: {
    background: "#fdfdf9",
    borderTop: "1px solid rgba(15, 75, 50, 0.08)",
    padding: "20px",
    animation: "slideDown 0.3s ease",
  },
  mobileMenuList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    margin: "0 0 16px 0",
    padding: 0,
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    textDecoration: "none",
    color: "#525252",
    fontWeight: "500",
    borderRadius: "10px",
    fontFamily: "'Inter', sans-serif",
    background: "rgba(15, 75, 50, 0.02)",
  },
  mobileLinkActive: {
    color: "#0f4b32",
    background: "rgba(15, 75, 50, 0.08)",
  },
  activeDotMobile: {
    width: "6px", height: "6px", borderRadius: "50%", background: "#166534",
  },
  mobileCtaButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px 18px",
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
  },
};

// Global CSS injection for media queries
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @media (min-width: 768px) {
      .desktop-nav { display: flex !important; }
      .desktop-cta { display: block !important; }
      .hamburger-btn { display: none !important; }
    }
    
    @media (max-width: 767px) {
      .desktop-nav { display: none !important; }
      .desktop-cta { display: none !important; }
      .hamburger-btn { display: block !important; }
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);
}