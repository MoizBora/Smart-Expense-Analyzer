// Insights — spending patterns and AI-generated tips (placeholder data)
import InsightCard from "../components/InsightCard";
import { insights, categoryData, monthlyData } from "../data/placeholder";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export default function Insights() {
  return (
    <div className="page-wrapper">

      {/* Header */}
      <h1 style={styles.title}>Spending Insights</h1>
      <p className="text-muted" style={{ marginBottom: "28px" }}>
        AI-powered analysis of your spending patterns and habits.
      </p>

      {/* ── INSIGHT CARDS GRID ── */}
      <div style={styles.insightGrid}>
        {insights.map((insight) => (
          <InsightCard
            key={insight.id}
            icon={insight.icon}
            title={insight.title}
            value={insight.value}
            color={insight.color}
            textColor={insight.textColor}
          />
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      <div style={styles.chartsRow}>

        {/* Line chart — spending over months */}
        <div className="card" style={{ flex: 1.5 }}>
          <h2 className="section-title">Spending Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Spent"]} />
              <Line type="monotone" dataKey="amount" stroke="#7c3aed" strokeWidth={3} dot={{ fill: "#7c3aed", r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart — category balance */}
        <div className="card" style={{ flex: 1 }}>
          <h2 className="section-title">Category Balance</h2>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={categoryData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
              <Radar name="Spending" dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── TIPS SECTION ── */}
      <div className="card" style={{ marginTop: "24px" }}>
        <h2 className="section-title">💡 Smart Tips</h2>
        <div style={styles.tipsGrid}>
          {tips.map((tip) => (
            <div key={tip.title} style={styles.tipCard}>
              <div style={styles.tipIcon}>{tip.icon}</div>
              <div>
                <p style={styles.tipTitle}>{tip.title}</p>
                <p className="text-muted">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

const tips = [
  { icon: "🍔", title: "Reduce Food Delivery", desc: "You spent ₹2,410 on food this month. Cooking at home 3x/week could save ~₹800." },
  { icon: "🚗", title: "Optimize Commute", desc: "Consider a monthly transport pass — your daily rides cost more than a subscription." },
  { icon: "🎬", title: "Bundle Subscriptions", desc: "You have multiple entertainment subscriptions. Auditing could save ₹300+/month." },
  { icon: "💰", title: "Set a Monthly Budget", desc: "Based on your history, a budget of ₹17,000/month would cut spending by 8%." },
];

const styles = {
  title: { fontSize: "28px", fontWeight: "800", color: "#1a1a2e", marginBottom: "4px" },
  insightGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" },
  chartsRow: { display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" },
  tipsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" },
  tipCard: { display: "flex", gap: "14px", padding: "16px", background: "#fafafa", borderRadius: "12px", border: "1px solid #f3f4f6" },
  tipIcon: { fontSize: "28px", flexShrink: 0 },
  tipTitle: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginBottom: "4px" },
};
