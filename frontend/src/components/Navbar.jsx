import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/add", label: "Add Expense" },
  { path: "/history", label: "History" },
  { path: "/insights", label: "Insights" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Brand Text Only - Logo Removed */}
        <Link to="/" style={styles.brand}>
          <div style={styles.brandTextContainer}>
            <span style={styles.brandText}>Flōw</span>
            <span style={styles.brandTagline}>Finance</span>
          </div>
        </Link>

        {/* Navigation links */}
        <ul style={styles.linkList}>
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

        {/* CTA Button */}
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <button style={styles.ctaButton}>
            <span style={styles.plusIcon}>+</span>
            <span>New Entry</span>
          </button>
        </Link>
      </div>
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
    padding: "0 40px",
    height: "72px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    transition: "transform 0.2s ease",
  },
  brandTextContainer: {
    display: "flex",
    flexDirection: "column",
  },
  brandText: {
    fontSize: "24px", // Slightly increased size now that logo is gone
    fontWeight: "600",
    color: "#0f4b32",
    letterSpacing: "-0.02em",
    fontFamily: "'Playfair Display', Georgia, serif",
    lineHeight: "1",
  },
  brandTagline: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#166534",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontFamily: "'Inter', sans-serif",
    marginTop: "2px",
    opacity: 0.8,
  },
  linkList: {
    display: "flex",
    gap: "4px",
    margin: 0,
    padding: 0,
  },
  link: {
    position: "relative",
    textDecoration: "none",
    color: "#525252",
    fontWeight: "500",
    fontSize: "14.5px",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
  },
  activeLink: {
    color: "#0f4b32",
    background: "rgba(15, 75, 50, 0.06)",
    fontWeight: "600",
  },
  activeDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "#166534",
    boxShadow: "0 0 6px rgba(22, 101, 52, 0.4)",
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
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(15, 75, 50, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
  },
  plusIcon: {
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "1",
  },
};