import { useEffect, useState } from "react";
import { getInsights } from "../Services/api";
import InsightCard from "../components/InsightCard";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";

export default function Insights() {
  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInsights();
        setInsightsData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p style={styles.loadingText}>Analyzing your spending patterns...</p>
      </div>
    );
  }

  const categoryData = insightsData?.category_breakdown
    ? Object.entries(insightsData.category_breakdown).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  return (
    <div style={styles.pageWrapper}>
      
      <div style={styles.bgDecoration1} />
      <div style={styles.bgDecoration2} />

      
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Financial Insights</h1>
          <p style={styles.subtitle}>
            AI-powered analysis of your spending patterns and behaviors
          </p>
        </div>
        <div style={styles.aibadge}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: '8px' }}>
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          AI Analysis
        </div>
      </div>

      
      <div style={styles.insightGrid}>
        <InsightCard 
          title="Total Spending" 
          value={`₹${insightsData?.total_spending?.toLocaleString("en-IN") || 0}`}
          icon="💰"
          color="linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)"
          textColor="#0f4b32"
        />
        <InsightCard 
          title="Transactions" 
          value={insightsData?.total_transactions || 0}
          icon="📝"
          color="linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(101, 163, 13, 0.05) 100%)"
          textColor="#14532d"
        />
        <InsightCard 
          title="Top Category" 
          value={insightsData?.highest_spending_category || "N/A"}
          icon="⭐"
          color="linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)"
          textColor="#166534"
        />
        <InsightCard 
          title="Average Spend" 
          value={`₹${insightsData?.average_spending?.toFixed(0) || 0}`}
          icon="📊"
          color="linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(101, 163, 13, 0.05) 100%)"
          textColor="#0f4b32"
        />
      </div>

    
      <div style={styles.radarCard}>
        <div style={styles.cardHeader}>
          <div>
            <h2 style={styles.cardTitle}>Category Distribution</h2>
            <p style={styles.cardSubtitle}>Visual breakdown of your spending across categories</p>
          </div>
        </div>

        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={categoryData}>
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#166534" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#0f4b32" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="rgba(15, 75, 50, 0.12)" strokeWidth={1.5} />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ 
                  fontSize: 13, 
                  fill: "#525252",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }} 
              />
              <Radar
                name="Spending"
                dataKey="value"
                stroke="#166534"
                fill="url(#radarGradient)"
                strokeWidth={2.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        ) : (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>📊</span>
            <p style={styles.emptyText}>No data available yet. Start adding expenses to see insights!</p>
          </div>
        )}
      </div>

      
      <div style={styles.tipsCard}>
        <div style={styles.tipsHeader}>
          <h2 style={styles.tipsTitle}>💡 Personalized Recommendations</h2>
          <p style={styles.tipsSubtitle}>AI-generated insights to help you optimize your spending</p>
        </div>

        <div style={styles.tipsGrid}>
          <div style={styles.tipCard}>
            <div style={styles.tipIconContainer}>
              <span style={styles.tipIcon}>💰</span>
            </div>
            <div style={styles.tipContent}>
              <p style={styles.tipTitle}>Control Your Spending</p>
              <p style={styles.tipText}>
                Your average expense is ₹{insightsData?.average_spending?.toFixed(0) || 0}. 
                Consider setting a monthly budget to track progress and reduce unnecessary purchases.
              </p>
            </div>
          </div>

          <div style={styles.tipCard}>
            <div style={styles.tipIconContainer}>
              <span style={styles.tipIcon}>🎯</span>
            </div>
            <div style={styles.tipContent}>
              <p style={styles.tipTitle}>Focus on {insightsData?.highest_spending_category || "High-Spend Areas"}</p>
              <p style={styles.tipText}>
                Most of your spending goes to this category. Optimizing expenses here 
                can lead to significant savings over time.
              </p>
            </div>
          </div>

          <div style={styles.tipCard}>
            <div style={styles.tipIconContainer}>
              <span style={styles.tipIcon}>📉</span>
            </div>
            <div style={styles.tipContent}>
              <p style={styles.tipTitle}>Streamline Transactions</p>
              <p style={styles.tipText}>
                You've made {insightsData?.total_transactions || 0} transactions. 
                Planning larger, less frequent purchases can help improve financial discipline.
              </p>
            </div>
          </div>

          <div style={styles.tipCard}>
            <div style={styles.tipIconContainer}>
              <span style={styles.tipIcon}>🎯</span>
            </div>
            <div style={styles.tipContent}>
              <p style={styles.tipTitle}>Set Budget Goals</p>
              <p style={styles.tipText}>
                Based on your spending patterns, establishing monthly limits 
                can significantly improve your financial health and savings rate.
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
    top: "10%",
    right: "-8%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(22, 101, 52, 0.06) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  bgDecoration2: {
    position: "fixed",
    bottom: "10%",
    left: "-10%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(132, 204, 22, 0.05) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    pointerEvents: "none",
    zIndex: 0,
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
  aibage: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(135deg, rgba(132, 204, 22, 0.1) 0%, rgba(101, 163, 13, 0.08) 100%)",
    color: "#14532d",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "600",
    border: "1px solid rgba(132, 204, 22, 0.15)",
  },
  insightGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },
  radarCard: {
    background: "#fdfdf9",
    borderRadius: "16px",
    padding: "36px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    marginBottom: "32px",
    position: "relative",
    zIndex: 1,
  },
  cardHeader: {
    marginBottom: "28px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "6px",
    letterSpacing: "-0.01em",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#737373",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
    gap: "12px",
  },
  emptyIcon: {
    fontSize: "64px",
  },
  emptyText: {
    fontSize: "15px",
    color: "#737373",
    textAlign: "center",
    maxWidth: "400px",
  },
  tipsCard: {
    background: "#fdfdf9",
    borderRadius: "16px",
    padding: "36px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    position: "relative",
    zIndex: 1,
  },
  tipsHeader: {
    marginBottom: "32px",
  },
  tipsTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "6px",
    letterSpacing: "-0.01em",
  },
  tipsSubtitle: {
    fontSize: "14px",
    color: "#737373",
  },
  tipsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
  },
  tipCard: {
    display: "flex",
    gap: "16px",
    padding: "24px",
    background: "rgba(22, 101, 52, 0.03)",
    borderRadius: "14px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    transition: "all 0.3s ease",
  },
  tipIconContainer: {
    width: "48px",
    height: "48px",
    background: "linear-gradient(135deg, rgba(22, 101, 52, 0.1) 0%, rgba(15, 75, 50, 0.08) 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  tipIcon: {
    fontSize: "24px",
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#171717",
    marginBottom: "8px",
    letterSpacing: "-0.01em",
  },
  tipText: {
    fontSize: "14px",
    color: "#525252",
    lineHeight: 1.6,
  },
};
