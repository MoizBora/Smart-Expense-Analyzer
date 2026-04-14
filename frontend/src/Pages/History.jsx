import { useState, useEffect } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { getExpenses } from "../Services/api";

const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];

export default function History() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getExpenses();
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      setError("Failed to load expenses. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = expenses.filter((exp) => {
    const description = exp.description?.toLowerCase() || "";
    const category = exp.category?.toLowerCase() || "";
    const searchTerm = search.toLowerCase();

    const matchSearch = description.includes(searchTerm) || category.includes(searchTerm);
    const matchCategory = filterCategory === "All" || exp.category === filterCategory;
    
    return matchSearch && matchCategory;
  });

  const filteredTotal = filtered.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={styles.pageWrapper}>
      {/* Decorative elements */}
      <div style={styles.bgDecoration1} />
      <div style={styles.bgDecoration2} />

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Transaction History</h1>
          <p style={styles.subtitle}>
            Browse, search, and analyze all your recorded expenses
          </p>
        </div>
        <div style={styles.totalBadge}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: '8px' }}>
            <path d="M4 7h12M4 12h8M6 16h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" 
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <div>
            <div style={styles.totalLabel}>Total</div>
            <div style={styles.totalAmount}>₹{filteredTotal.toLocaleString("en-IN")}</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Card */}
      <div style={styles.filterCard}>
        <div style={styles.searchSection}>
          <div style={styles.searchWrapper}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={styles.searchIcon}>
              <circle cx="8" cy="8" r="5.5" stroke="#737373" strokeWidth="1.5" fill="none"/>
              <path d="M12 12l4 4" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search by description or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={styles.clearBtn}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div style={styles.filterSection}>
          <div style={styles.filterLabel}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
              <path d="M2 4h12M4 8h8M6 12h4" stroke="#737373" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Filter by Category
          </div>
          <div style={styles.filterRow}>
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  ...(filterCategory === cat ? styles.filterBtnActive : {}),
                }}
              >
                {cat}
                {filterCategory === cat && (
                  <div style={styles.activeDot} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={styles.stateCard}>
          <div style={styles.loadingState}>
            <div style={styles.spinner} />
            <p style={styles.stateText}>Loading your transaction history...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div style={styles.stateCard}>
          <div style={styles.errorState}>
            <div style={styles.errorIcon}>⚠️</div>
            <p style={styles.errorText}>{error}</p>
            <button onClick={fetchExpenses} style={styles.retryBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
                <path d="M14 8c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6c1.657 0 3.157.672 4.243 1.757M13 3v3h-3" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && !error && (
        <div style={styles.tableCard}>
          {filtered.length > 0 ? (
            <>
              <div style={styles.tableHeader}>
                <p style={styles.resultCount}>
                  Showing <span style={styles.resultNumber}>{filtered.length}</span> {filtered.length === 1 ? 'transaction' : 'transactions'}
                </p>
                {(search || filterCategory !== "All") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setFilterCategory("All");
                    }}
                    style={styles.clearFiltersBtn}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
              <ExpenseTable expenses={filtered} />
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                {expenses.length === 0 ? "📋" : "🔍"}
              </div>
              <p style={styles.emptyTitle}>
                {expenses.length === 0 
                  ? "No transactions yet" 
                  : "No matching transactions"}
              </p>
              <p style={styles.emptyText}>
                {expenses.length === 0 
                  ? "Start adding expenses to see them here" 
                  : "Try adjusting your search or filters"}
              </p>
              {expenses.length > 0 && (
                <button 
                  onClick={() => { 
                    setSearch(""); 
                    setFilterCategory("All"); 
                  }}
                  style={styles.clearBtn2}
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Loading animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  pageWrapper: {
    padding: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
  },
  bgDecoration1: {
    position: "fixed",
    top: "15%",
    right: "-5%",
    width: "450px",
    height: "450px",
    background: "radial-gradient(circle, rgba(22, 101, 52, 0.05) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(70px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgDecoration2: {
    position: "fixed",
    bottom: "15%",
    left: "-8%",
    width: "550px",
    height: "550px",
    background: "radial-gradient(circle, rgba(132, 204, 22, 0.04) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(90px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },
  title: { 
    fontSize: "36px", 
    fontWeight: "600", 
    color: "#171717",
    marginBottom: "6px",
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "15px",
    color: "#737373",
  },
  totalBadge: { 
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white", 
    padding: "16px 24px", 
    borderRadius: "14px", 
    fontWeight: "600",
    boxShadow: "0 4px 16px rgba(15, 75, 50, 0.2)",
  },
  totalLabel: {
    fontSize: "11px",
    opacity: 0.8,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  totalAmount: {
    fontSize: "20px",
    fontWeight: "700",
  },
  filterCard: {
    background: "#fdfdf9",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
    zIndex: 1,
  },
  searchSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "16px",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "1.5px solid rgba(15, 75, 50, 0.15)",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    background: "#fdfdf9",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease",
    color: "#171717",
  },
  clearBtn: {
    position: "absolute",
    right: "12px",
    background: "rgba(15, 75, 50, 0.08)",
    border: "none",
    borderRadius: "8px",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#525252",
    transition: "all 0.2s ease",
  },
  filterSection: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  filterLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#525252",
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  filterRow: { 
    display: "flex", 
    gap: "10px", 
    flexWrap: "wrap" 
  },
  filterBtn: {
    position: "relative",
    padding: "9px 18px",
    borderRadius: "10px",
    border: "1.5px solid rgba(15, 75, 50, 0.15)",
    background: "#fdfdf9",
    color: "#525252",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  filterBtnActive: { 
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white", 
    borderColor: "transparent",
    fontWeight: "600",
    boxShadow: "0 2px 8px rgba(15, 75, 50, 0.15)",
  },
  activeDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "white",
    boxShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
  },
  stateCard: {
    background: "#fdfdf9",
    borderRadius: "16px",
    padding: "60px 20px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    position: "relative",
    zIndex: 1,
  },
  loadingState: { 
    textAlign: "center", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "20px" 
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(15, 75, 50, 0.1)",
    borderTop: "4px solid #166534",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  stateText: { 
    fontSize: "16px", 
    color: "#737373", 
    fontWeight: "500" 
  },
  errorState: { 
    textAlign: "center", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "16px" 
  },
  errorIcon: {
    fontSize: "64px",
  },
  errorText: { 
    fontSize: "16px", 
    color: "#dc2626", 
    fontWeight: "500",
    maxWidth: "400px",
  },
  retryBtn: {
    display: "flex",
    alignItems: "center",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 2px 8px rgba(15, 75, 50, 0.2)",
    transition: "all 0.2s ease",
  },
  tableCard: {
    background: "#fdfdf9",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    position: "relative",
    zIndex: 1,
    animation: "fadeIn 0.3s ease",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  resultCount: {
    fontSize: "14px",
    color: "#737373",
  },
  resultNumber: {
    fontWeight: "700",
    color: "#0f4b32",
  },
  clearFiltersBtn: {
    background: "transparent",
    border: "1.5px solid rgba(15, 75, 50, 0.2)",
    color: "#0f4b32",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease",
  },
  emptyState: { 
    textAlign: "center", 
    padding: "80px 20px", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    gap: "16px" 
  },
  emptyIcon: {
    fontSize: "72px",
    marginBottom: "8px",
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#171717",
  },
  emptyText: { 
    fontSize: "15px", 
    color: "#737373",
    maxWidth: "400px",
  },
  clearBtn2: {
    marginTop: "8px",
    padding: "12px 24px",
    background: "transparent",
    border: "1.5px solid rgba(15, 75, 50, 0.2)",
    color: "#0f4b32",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease",
  }
  
};
