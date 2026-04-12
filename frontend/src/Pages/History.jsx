// History — full expense table with search and category filter
import { useState, useEffect } from "react";
import ExpenseTable from "../components/ExpenseTable";
import { getExpenses } from "../Services/api";
// Spinner animation keyframes
const spinnerKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const styles = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "4px" },
  totalBadge: { background: "#5b21b6", color: "white", padding: "10px 20px", borderRadius: "12px", fontWeight: "700", fontSize: "16px" },
  filterBar: { display: "flex", flexDirection: "column", gap: "16px" },
  searchWrapper: { position: "relative" },
  searchIcon: { position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" },
  searchInput: {
    width: "100%", padding: "12px 16px 12px 44px", border: "1.5px solid #e5e7eb",
    borderRadius: "10px", fontSize: "15px", outline: "none",
    background: "#fafafa", fontFamily: "Inter, sans-serif",
    boxSizing: "border-box",
  },
  filterRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  filterBtn: {
    padding: "6px 16px", borderRadius: "50px", border: "1.5px solid #e5e7eb",
    background: "white", color: "#6b7280", fontSize: "13px",
    fontWeight: "500", cursor: "pointer", transition: "all 0.2s",
  },
  filterBtnActive: { background: "#5b21b6", color: "white", borderColor: "#5b21b6", fontWeight: "600" },
  emptyState: { textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" },
  emptyText: { fontSize: "16px", color: "#6b7280", fontWeight: "500" },
  
  // Loading state styles
  loadingState: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #5b21b6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: { fontSize: "16px", color: "#6b7280", fontWeight: "500" },
  
  // Error state styles
  errorState: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" },
  errorText: { fontSize: "16px", color: "#ef4444", fontWeight: "500" },
};

// Define categories (you may want to move this to a constants file)
const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];

export default function History() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch expenses from API on component mount
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

  // Filter logic — runs on every render
  // Filter logic — safe from undefined/null fields
const filtered = expenses.filter((exp) => {
  // Use ?. and || "" to provide a fallback string
  const description = exp.description?.toLowerCase() || "";
  const category = exp.category?.toLowerCase() || "";
  const searchTerm = search.toLowerCase();

  const matchSearch = description.includes(searchTerm) || category.includes(searchTerm);
  const matchCategory = filterCategory === "All" || exp.category === filterCategory;
  
  return matchSearch && matchCategory;
});

  // Total of filtered results
  const filteredTotal = filtered.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="page-wrapper">
      <style>{spinnerKeyframes}</style>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Expense History</h1>
          <p className="text-muted">Browse and search all your recorded expenses.</p>
        </div>
        <div style={styles.totalBadge}>
          Total: ₹{filteredTotal.toLocaleString("en-IN")}
        </div>
      </div>

      {/* ── SEARCH & FILTER BAR ── */}
      <div className="card" style={styles.filterBar}>
        {/* Search input */}
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by description or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Category filter buttons */}
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
            </button>
          ))}
        </div>
      </div>

      {/* ── LOADING STATE ── */}
      {loading && (
        <div className="card" style={{ marginTop: "20px", padding: "60px 20px" }}>
          <div style={styles.loadingState}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading expenses...</p>
          </div>
        </div>
      )}

      {/* ── ERROR STATE ── */}
      {error && !loading && (
        <div className="card" style={{ marginTop: "20px", padding: "40px 20px" }}>
          <div style={styles.errorState}>
            <span style={{ fontSize: "48px" }}>⚠️</span>
            <p style={styles.errorText}>{error}</p>
            <button className="btn-primary" onClick={fetchExpenses}>
              Retry
            </button>
          </div>
        </div>
      )}

      {/* ── TABLE ── */}
      {!loading && !error && (
        <div className="card" style={{ marginTop: "20px" }}>
          {filtered.length > 0 ? (
            <>
              <p className="text-muted" style={{ marginBottom: "12px" }}>
                Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
              <ExpenseTable expenses={filtered} />
            </>
          ) : (
            <div style={styles.emptyState}>
              <span style={{ fontSize: "48px" }}>
                {expenses.length === 0 ? "📋" : "🔍"}
              </span>
              <p style={styles.emptyText}>
                {expenses.length === 0 
                  ? "No expenses yet. Start adding some!" 
                  : "No expenses match your search."}
              </p>
              {expenses.length > 0 && (
                <button className="btn-outline" onClick={() => { setSearch(""); setFilterCategory("All"); }}>
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}


