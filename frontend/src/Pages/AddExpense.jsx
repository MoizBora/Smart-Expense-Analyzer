import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { addExpense } from "../Services/api";
import { categories } from "../data/placeholder";

const AddExpense = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("isLoggedIn");
    if (!auth) {
      navigate("/login", { state: { message: "Please log in to access the demo." } }); 
    }
  }, [navigate]);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    category: "", 
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addExpense(form);
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
      }, 2500);
    } catch (error) {
      setLoading(false);
      console.error("Error adding expense:", error);
      alert("Failed to add expense. Check backend connection.");
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Decorative background elements */}
      <div style={styles.bgDecoration1} />
      <div style={styles.bgDecoration2} />

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Add New Expense</h1>
          <p style={styles.subtitle}>
            Track your spending with AI-powered categorization
          </p>
        </div>
        <div style={styles.dateTag}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M2 6h12M5 1v2M11 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Success notification with animation */}
      {submitted && (
        <div style={styles.successBanner}>
          <div style={styles.successContent}>
            <div style={styles.successIconContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p style={styles.successTitle}>Transaction Recorded Successfully</p>
              <p style={styles.successDesc}>AI has analyzed and categorized your expense</p>
            </div>
          </div>
          <div style={styles.successProgress} />
        </div>
      )}

      {/* Main form card */}
      <div style={styles.formCard}>
        <div style={styles.formHeader}>
          <div style={styles.formIconContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h2 style={styles.formTitle}>Transaction Details</h2>
            <p style={styles.formSubtitle}>Enter the information below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Amount Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelText}>Amount</span>
              <span style={styles.labelRequired}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.currencySymbol}>₹</span>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
                style={styles.input}
              />
            </div>
            <p style={styles.helpText}>Enter the transaction amount in rupees</p>
          </div>

          {/* Description Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelText}>Description</span>
              <span style={styles.labelRequired}>*</span>
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g., Coffee at Starbucks, Uber ride to airport"
              required
              style={styles.input}
            />
            <p style={styles.helpText}>Provide a brief description of the expense</p>
          </div>

          {/* Date Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelText}>Date</span>
              <span style={styles.labelRequired}>*</span>
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <p style={styles.helpText}>When did this transaction occur?</p>
          </div>

          {/* AI Info Badge */}
          <div style={styles.aiInfoBadge}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="10" cy="10" r="8" stroke="#166534" strokeWidth="1.5" fill="none"/>
              <path d="M10 14v-4M10 6h.01" stroke="#166534" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={styles.aiInfoTitle}>AI-Powered Categorization</p>
              <p style={styles.aiInfoText}>
                Our intelligent system will automatically categorize this expense based on the description
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <div style={styles.buttonSpinner} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Add Expense</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Quick tips section */}
      <div style={styles.tipsCard}>
        <h3 style={styles.tipsTitle}>💡 Quick Tips</h3>
        <ul style={styles.tipsList}>
          <li style={styles.tipItem}>Be specific in descriptions for accurate AI categorization</li>
          <li style={styles.tipItem}>Record expenses as soon as possible to maintain accuracy</li>
          <li style={styles.tipItem}>Review your dashboard regularly to track spending patterns</li>
        </ul>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes progressBar {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { 
    padding: "40px", 
    maxWidth: "800px", 
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
  },
  bgDecoration1: {
    position: "fixed",
    top: "10%",
    right: "-10%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(22, 101, 52, 0.06) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgDecoration2: {
    position: "fixed",
    bottom: "20%",
    left: "-10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(132, 204, 22, 0.05) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
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
  dateTag: { 
    display: "flex",
    alignItems: "center",
    background: "rgba(22, 101, 52, 0.08)", 
    color: "#0f4b32", 
    padding: "10px 18px", 
    borderRadius: "10px", 
    fontSize: "13px", 
    fontWeight: "600",
    border: "1px solid rgba(15, 75, 50, 0.1)",
  },
  successBanner: { 
    position: "relative",
    display: "flex", 
    flexDirection: "column",
    padding: "24px", 
    background: "linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)", 
    border: "1px solid rgba(22, 101, 52, 0.2)", 
    borderRadius: "16px", 
    marginBottom: "32px",
    overflow: "hidden",
    animation: "fadeInUp 0.3s ease",
    zIndex: 1,
  },
  successContent: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
  },
  successIconContainer: { 
    background: "linear-gradient(135deg, #166534 0%, #0f4b32 100%)", 
    color: "white", 
    borderRadius: "12px", 
    width: "44px", 
    height: "44px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(22, 101, 52, 0.2)",
  },
  successTitle: { 
    fontWeight: "600", 
    color: "#0f4b32",
    fontSize: "16px",
    marginBottom: "4px",
  },
  successDesc: { 
    fontSize: "14px", 
    color: "#166534",
  },
  successProgress: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "3px",
    background: "linear-gradient(90deg, #166534 0%, #0f4b32 100%)",
    animation: "progressBar 2.5s linear",
  },
  formCard: {
    background: "#fdfdf9",
    padding: "40px",
    borderRadius: "20px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
    marginBottom: "24px",
    position: "relative",
    zIndex: 1,
  },
  formHeader: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid rgba(15, 75, 50, 0.08)",
  },
  formIconContainer: {
    width: "48px",
    height: "48px",
    background: "rgba(22, 101, 52, 0.08)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  formTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "4px",
    letterSpacing: "-0.01em",
  },
  formSubtitle: {
    fontSize: "14px",
    color: "#737373",
  },
  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "28px" 
  },
  inputGroup: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "10px" 
  },
  label: { 
    fontSize: "14px", 
    fontWeight: "600",
    color: "#171717",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  labelText: {
    letterSpacing: "-0.01em",
  },
  labelRequired: {
    color: "#166534",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  currencySymbol: {
    position: "absolute",
    left: "16px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#525252",
  },
  input: { 
    padding: "14px 16px", 
    border: "1.5px solid rgba(15, 75, 50, 0.15)", 
    borderRadius: "12px", 
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    transition: "all 0.2s ease",
    background: "#fdfdf9",
    color: "#171717",
    width: "100%",
    outline: "none",
  },
  helpText: {
    fontSize: "13px",
    color: "#737373",
    marginTop: "-4px",
  },
  aiInfoBadge: {
    display: "flex",
    gap: "14px",
    padding: "18px",
    background: "rgba(132, 204, 22, 0.06)",
    borderRadius: "12px",
    border: "1px solid rgba(132, 204, 22, 0.15)",
  },
  aiInfoTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#14532d",
    marginBottom: "4px",
  },
  aiInfoText: {
    fontSize: "13px",
    color: "#166534",
    lineHeight: 1.5,
  },
  submitBtn: { 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "16px 32px", 
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white", 
    border: "none", 
    borderRadius: "12px", 
    fontSize: "16px", 
    fontWeight: "600", 
    cursor: "pointer", 
    marginTop: "12px",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 16px rgba(15, 75, 50, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  buttonSpinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  tipsCard: {
    background: "rgba(22, 101, 52, 0.04)",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    position: "relative",
    zIndex: 1,
  },
  tipsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "16px",
    letterSpacing: "-0.01em",
  },
  tipsList: {
    margin: 0,
    paddingLeft: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  tipItem: {
    fontSize: "14px",
    color: "#525252",
    lineHeight: 1.6,
  },
};

export default AddExpense;
