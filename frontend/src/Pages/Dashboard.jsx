import { useState, useEffect } from "react";
import { getExpenses, getInsights } from "../Services/api";
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import StatCard from "../components/StatCard";
import ExpenseTable from "../components/ExpenseTable";

const COLORS = ["#166534", "#84cc16", "#0f4b32", "#65a30d", "#14532d", "#4d7c0f"];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMonthlyView, setIsMonthlyView] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesRes, insightsRes] = await Promise.all([
        getExpenses(),
        getInsights()
      ]);
      setExpenses(expensesRes.data || []);
      setInsights(insightsRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Loading your financial overview...</p>
      </div>
    );
  }

  const displayExpenses = isMonthlyView 
    ? expenses.filter(exp => {
        const expDate = new Date(exp.date).setHours(0,0,0,0);
        const today = new Date().setHours(0,0,0,0);
        return expDate === today;
      })
    : expenses;

  const filteredCategoryBreakdown = displayExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const categoryData = Object.entries(filteredCategoryBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const totalMonthlySpend = displayExpenses.reduce((sum, item) => sum + item.amount, 0);
  const totalTransactions = displayExpenses.length;
  const avgPerDay = (totalMonthlySpend / (new Date().getDate())).toFixed(0);

  return (
    <div style={styles.pageWrapper}>
      
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Financial Dashboard</h1>
          <p style={styles.subtitle}>
            {isMonthlyView ? "Today's Activity" : "Complete Transaction History"}
          </p>
        </div>
        
        <div style={styles.controls}>
          <button 
            onClick={() => setIsMonthlyView(!isMonthlyView)} 
            style={styles.toggleBtn}
          >
            {isMonthlyView ? "📊 View All Time" : "📅 View Today"}
          </button>
          <button onClick={fetchData} style={styles.refreshBtn}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '6px' }}>
              <path d="M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C9.0902 1 10.9492 2.03407 12 3.625M12 1V3.625M12 3.625H9.5" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          <div style={styles.dateTag}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      
      <div style={styles.statGrid}>
        <StatCard 
          title="Total Spending" 
          value={`₹${totalMonthlySpend.toLocaleString("en-IN")}`} 
          icon="💰" 
          trend={isMonthlyView ? "today" : "all-time"} 
          trendLabel={isMonthlyView ? "Today" : "All Time"} 
          color="linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)" 
          textColor="#0f4b32" 
        />
        <StatCard 
          title="Transactions" 
          value={totalTransactions} 
          icon="📝" 
          color="linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(101, 163, 13, 0.05) 100%)" 
          textColor="#14532d" 
        />
        <StatCard 
          title="Daily Average" 
          value={`₹${avgPerDay}`} 
          icon="📈" 
          color="linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)" 
          textColor="#166534" 
        />
      </div>

      
      <div style={styles.chartsRow}>
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h2 style={styles.chartTitle}>Category Distribution</h2>
              <p style={styles.chartSubtitle}>Breakdown by spending category</p>
            </div>
            <div style={styles.chartBadge}>
              {categoryData.length} Categories
            </div>
          </div>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  <filter id="pieShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15"/>
                  </filter>
                </defs>
                <Pie 
                  data={categoryData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={110} 
                  innerRadius={65} 
                  paddingAngle={2}
                  filter="url(#pieShadow)"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: '#fdfdf9',
                    border: '1px solid rgba(15, 75, 50, 0.1)',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  }}
                  formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Amount"]} 
                />
                <Legend 
                  iconType="circle" 
                  iconSize={8} 
                  wrapperStyle={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={styles.emptyState}>
              <span style={styles.emptyIcon}>📊</span>
              <p style={styles.emptyText}>No data available for this view</p>
            </div>
          )}
        </div>

        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h2 style={styles.chartTitle}>Spending Analysis</h2>
              <p style={styles.chartSubtitle}>Visual comparison across categories</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <defs>
                <linearGradient id="barGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#166534" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0f4b32" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#737373', fontFamily: "'Inter', sans-serif" }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              />
              <YAxis 
                tickFormatter={(v) => `₹${v}`} 
                tick={{ fontSize: 12, fill: '#737373', fontFamily: "'Inter', sans-serif" }}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  background: '#fdfdf9',
                  border: '1px solid rgba(15, 75, 50, 0.1)',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                }}
                formatter={(v) => [`₹${v.toLocaleString("en-IN")}`]} 
              />
              <Bar dataKey="value" fill="url(#barGradient2)" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <div>
            <h2 style={styles.tableTitle}>Recent Activity</h2>
            <p style={styles.tableSubtitle}>Latest transactions and entries</p>
          </div>
          <a href="/history" style={styles.viewAllLink}>
            View Complete History →
          </a>
        </div>
        <ExpenseTable expenses={displayExpenses.slice(0, 5)} />
      </div>

     
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: {
    padding: "clamp(20px, 5vw, 40px)",
    maxWidth: "1400px",
    margin: "0 auto",
    fontFamily: "'Inter', sans-serif",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "20px",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(15, 75, 50, 0.1)",
    borderTop: "4px solid #166534",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "16px",
    color: "#737373",
    fontWeight: "500",
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: "36px", 
    flexWrap: "wrap", 
    gap: "20px" 
  },
  title: { 
    fontSize: "clamp(24px, 6vw, 36px)", 
    fontWeight: "600", 
    color: "#171717", 
    marginBottom: "6px",
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "15px",
    color: "#737373",
    fontWeight: "400",
  },
  controls: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  toggleBtn: {
    background: "transparent",
    border: "1.5px solid rgba(15, 75, 50, 0.2)",
    color: "#0f4b32",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Inter', sans-serif",
  },
  refreshBtn: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    boxShadow: "0 2px 8px rgba(15, 75, 50, 0.15)",
    transition: "all 0.2s ease",
  },
  dateTag: { 
    background: "rgba(22, 101, 52, 0.08)", 
    color: "#0f4b32", 
    padding: "10px 20px", 
    borderRadius: "10px", 
    fontSize: "13px", 
    fontWeight: "600",
    border: "1px solid rgba(15, 75, 50, 0.1)",
  },
  statGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "24px", 
    marginBottom: "32px" 
  },
  chartsRow: { 
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
    gap: "28px",
    marginBottom: "32px",
  },
  chartCard: {
    background: "#fdfdf9",
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
  },
  chartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  chartTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "4px",
    letterSpacing: "-0.01em",
  },
  chartSubtitle: {
    fontSize: "13px",
    color: "#737373",
  },
  chartBadge: {
    background: "rgba(22, 101, 52, 0.08)",
    color: "#0f4b32",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid rgba(15, 75, 50, 0.1)",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    gap: "12px",
  },
  emptyIcon: {
    fontSize: "48px",
  },
  emptyText: {
    fontSize: "15px",
    color: "#737373",
  },
  tableCard: {
    background: "#fdfdf9",
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  tableTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "4px",
    letterSpacing: "-0.01em",
  },
  tableSubtitle: {
    fontSize: "13px",
    color: "#737373",
  },
  viewAllLink: {
    color: "#166534",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
};

export default Dashboard;
