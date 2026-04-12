import { useState, useEffect } from "react";
import { getExpenses, getInsights } from "../Services/api";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import StatCard from "../components/StatCard";
import ExpenseTable from "../components/ExpenseTable";

const styles = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px", flexWrap: "wrap", gap: "12px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "4px" },
  dateTag: { background: "#ede9fe", color: "#5b21b6", padding: "6px 16px", borderRadius: "50px", fontSize: "13px", fontWeight: "600" },
  statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "24px" },
  chartsRow: { display: "flex", gap: "24px", flexWrap: "wrap" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  viewAll: { color: "#7c3aed", fontSize: "14px", fontWeight: "600", textDecoration: "none" },
};

const COLORS = ["#7c3aed", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

    fetchData();
  }, []);

  if (loading) {
    return <div className="page-wrapper"><h2>Loading dashboard...</h2></div>;
  }

  // Prepare category data for charts
  const categoryData = insights?.category_breakdown 
    ? Object.entries(insights.category_breakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  // Calculate stats
  const totalExpenses = expenses.length;
  const avgPerDay = insights?.total_spending 
    ? (insights.total_spending / 30).toFixed(0) 
    : 0;
  const highestCategory = categoryData.length > 0 
    ? categoryData.reduce((max, cat) => cat.value > max.value ? cat : max, categoryData[0]).name
    : "N/A";

  return (
    <div className="page-wrapper">

      {/* Page header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
          <p className="text-muted">Welcome back! Here's your financial overview.</p>
        </div>
        <span style={styles.dateTag}>📅 {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={styles.statGrid}>
        <StatCard 
          title="Total This Month" 
          value={`₹${insights?.total_spending?.toLocaleString("en-IN") || 0}`} 
          icon="💳" 
          trend="up" 
          trendLabel="Live data" 
          color="#ede9fe" 
          textColor="#5b21b6" 
        />
        <StatCard 
          title="Total Transactions" 
          value={totalExpenses} 
          icon="📋" 
          color="#dbeafe" 
          textColor="#1e40af" 
        />
        <StatCard 
          title="Highest Category" 
          value={highestCategory} 
          icon="🏠" 
          color="#d1fae5" 
          textColor="#065f46" 
        />
        <StatCard 
          title="Avg. Daily Spend" 
          value={`₹${avgPerDay}`} 
          icon="📊" 
          color="#fef3c7" 
          textColor="#92400e" 
        />
      </div>

      {/* ── CHARTS ROW ── */}
      <div style={styles.chartsRow}>

        {/* Pie Chart — category breakdown */}
        <div className="card" style={{ flex: 1 }}>
          <h2 className="section-title">Spending by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={55}
                  paddingAngle={3}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Spent"]} />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "40px" }}>
              No data yet. Add some expenses!
            </p>
          )}
        </div>

        {/* Bar Chart — category spending */}
        <div className="card" style={{ flex: 1.4 }}>
          <h2 className="section-title">Category Breakdown</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 13 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Total Spent"]} cursor={{ fill: "#f5f3ff" }} />
                <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "40px" }}>
              No data yet. Add some expenses!
            </p>
          )}
        </div>
      </div>

      {/* ── RECENT EXPENSES TABLE ── */}
      <div className="card" style={{ marginTop: "24px" }}>
        <div style={styles.tableHeader}>
          <h2 className="section-title" style={{ margin: 0 }}>Recent Expenses</h2>
          <a href="/history" style={styles.viewAll}>View all →</a>
        </div>
        {expenses.length > 0 ? (
          <ExpenseTable expenses={expenses.slice(0, 5)} />
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
            No expenses yet. Start adding!
          </p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;