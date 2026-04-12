import { useState } from "react";
import { categories } from "../data/placeholder";
import { addExpense } from "../Services/api";

const AddExpense = () => {

  // Form state
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });

  const [predictedCategory, setPredictedCategory] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mock ML prediction
    if (name === "description" && value.length > 5) {
      const mockPredictions = {
        uber: "Transport",
        zomato: "Food",
        rent: "Rent",
        netflix: "Entertainment",
        gym: "Health",
        electricity: "Utilities",
      };

      const key = Object.keys(mockPredictions).find((k) =>
        value.toLowerCase().includes(k)
      );

      setPredictedCategory(key ? mockPredictions[key] : "Other");
    }
  };

  // Apply predicted category
  const applyPrediction = () => {
    setForm((prev) => ({
      ...prev,
      category: predictedCategory,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await addExpense(form);

    setLoading(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setForm({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
      });
      setPredictedCategory(null);
    }, 2000);
  };

  return (
    <div className="page-wrapper">

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Add Expense</h1>
          <p className="text-muted">Track your spending with AI-powered category prediction</p>
        </div>
        <span style={styles.dateTag}>
          📅 {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Success notification */}
      {submitted && (
        <div style={styles.successBanner}>
          <span style={styles.successIcon}>✓</span>
          <div>
            <p style={styles.successTitle}>Expense added successfully!</p>
            <p style={styles.successDesc}>Your transaction has been recorded and analyzed.</p>
          </div>
        </div>
      )}

      {/* Main form card */}
      <div className="card" style={{ maxWidth: "720px", margin: "0 auto" }}>
        <h2 className="section-title" style={{ marginBottom: "24px" }}>Transaction Details</h2>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Amount input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount</label>
            <div style={styles.inputWrapper}>
              <span style={styles.currencySymbol}>₹</span>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
                style={styles.amountInput}
              />
            </div>
            <p style={styles.hint}>Enter the transaction amount</p>
          </div>

          {/* Description input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g., Uber to office, Zomato lunch, Netflix subscription"
              required
              style={styles.input}
            />
            <p style={styles.hint}>What did you spend on?</p>
          </div>

          {/* AI Prediction banner */}
          {predictedCategory && (
            <div style={styles.predictionBanner}>
              <div style={styles.predictionLeft}>
                <span style={styles.aiIcon}>🤖</span>
                <div>
                  <p style={styles.predictionTitle}>AI Suggestion</p>
                  <p style={styles.predictionCategory}>Category: <strong>{predictedCategory}</strong></p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={applyPrediction}
                style={styles.applyBtn}
              >
                Apply
              </button>
            </div>
          )}

          {/* Date and Category row */}
          <div style={styles.rowGroup}>
            
            {/* Date input */}
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {/* Category select */}
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span style={styles.buttonContent}>
                <span style={styles.spinner} />
                Processing...
              </span>
            ) : (
              <span style={styles.buttonContent}>
                <span style={{ fontSize: '18px' }}>+</span>
                Add Expense
              </span>
            )}
          </button>

        </form>
      </div>

      {/* Tips card */}
      <div className="card" style={{ maxWidth: "720px", margin: "24px auto 0", background: "#fafaf9", border: "1px solid #f3f4f6" }}>
        <div style={styles.tipsHeader}>
          <span style={{ fontSize: "20px" }}>💡</span>
          <h3 style={styles.tipsTitle}>Quick Tips</h3>
        </div>
        <div style={styles.tipsList}>
          <div style={styles.tipItem}>
            <span style={styles.tipBullet}>•</span>
            <p style={styles.tipText}>Be specific in descriptions for better AI predictions</p>
          </div>
          <div style={styles.tipItem}>
            <span style={styles.tipBullet}>•</span>
            <p style={styles.tipText}>Add expenses regularly to track spending patterns</p>
          </div>
          <div style={styles.tipItem}>
            <span style={styles.tipBullet}>•</span>
            <p style={styles.tipText}>Review your insights page for personalized recommendations</p>
          </div>
        </div>
      </div>

    </div>
  );
};

const styles = {
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: "32px", 
    flexWrap: "wrap", 
    gap: "12px" 
  },
  title: { 
    fontSize: "28px", 
    fontWeight: "800", 
    color: "#1a1a2e", 
    marginBottom: "4px" 
  },
  dateTag: { 
    background: "#ede9fe", 
    color: "#5b21b6", 
    padding: "6px 16px", 
    borderRadius: "50px", 
    fontSize: "13px", 
    fontWeight: "600" 
  },

  successBanner: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    padding: "18px 20px",
    background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    border: "1px solid #6ee7b7",
    borderRadius: "12px",
    marginBottom: "28px",
    maxWidth: "720px",
    margin: "0 auto 28px",
  },
  successIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#10b981",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "700",
    flexShrink: 0,
  },
  successTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#065f46",
    marginBottom: "2px",
  },
  successDesc: {
    fontSize: "13px",
    color: "#047857",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a2e",
    letterSpacing: "0.01em",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  currencySymbol: {
    position: "absolute",
    left: "16px",
    fontSize: "20px",
    fontWeight: "600",
    color: "#6b7280",
    pointerEvents: "none",
  },

  amountInput: {
    width: "100%",
    padding: "14px 16px 14px 40px",
    fontSize: "18px",
    fontWeight: "500",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a2e",
    background: "#fff",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a2e",
    background: "#fff",
  },

  select: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.2s ease",
    fontFamily: "'DM Sans', sans-serif",
    color: "#1a1a2e",
    background: "#fff",
    cursor: "pointer",
  },

  hint: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: "400",
  },

  predictionBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    border: "1px solid #93c5fd",
    borderRadius: "12px",
    gap: "16px",
  },

  predictionLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  aiIcon: {
    fontSize: "28px",
    flexShrink: 0,
  },

  predictionTitle: {
    fontSize: "13px",
    color: "#1e40af",
    fontWeight: "500",
    marginBottom: "2px",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
  },

  predictionCategory: {
    fontSize: "15px",
    color: "#1e3a8a",
    fontWeight: "400",
  },

  applyBtn: {
    padding: "8px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },

  rowGroup: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  submitBtn: {
    width: "100%",
    padding: "16px 24px",
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease",
    marginTop: "8px",
  },

  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  tipsHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },

  tipsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a2e",
  },

  tipsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  tipItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },

  tipBullet: {
    color: "#7c3aed",
    fontSize: "18px",
    fontWeight: "700",
    lineHeight: "1.4",
  },

  tipText: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
};

export default AddExpense;
