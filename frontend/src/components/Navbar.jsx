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
        <Link to="/" style={styles.brand}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="5" fill="#2563eb"/>
            <path d="M6 11h10M11 6v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={styles.brandText}>SpendSmart</span>
        </Link>

        <ul style={styles.linkList}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link to={link.path} style={{ ...styles.link, ...(isActive ? styles.activeLink : {}) }}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link to="/add">
          <button className="btn-primary" style={{ padding: "9px 20px", fontSize: "13px" }}>
            + New Expense
          </button>
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#ffffff",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  inner: {
    maxWidth: "1160px",
    margin: "0 auto",
    padding: "0 32px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  brandText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#0f0f0f",
    letterSpacing: "-0.01em",
  },
  linkList: {
    display: "flex",
    listStyle: "none",
    gap: "4px",
  },
  link: {
    textDecoration: "none",
    color: "#6b6b6b",
    fontWeight: "400",
    fontSize: "14px",
    padding: "5px 12px",
    borderRadius: "6px",
    transition: "color 0.15s, background 0.15s",
  },
  activeLink: {
    color: "#2563eb",
    background: "#eff6ff",
    fontWeight: "500",
  },
};
