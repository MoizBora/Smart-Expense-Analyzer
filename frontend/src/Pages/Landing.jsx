import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { monthlyData, categoryData } from "../data/placeholder";

export default function Landing() {
  return (
    <div style={{ background: "#fafaf9", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div style={s.heroLeft}>
          <p style={s.eyebrow}>Personal finance, simplified</p>

          <h1 style={s.headline}>
            Your money.<br />
            <em style={s.italic}>Your</em> goals.<br />
            Your way.
          </h1>

          <p style={s.subtext}>
            Track every rupee, understand your habits, and plan with confidence.
            Powered by AI category prediction.
          </p>

          <div style={s.ctaRow}>
            <Link to="/dashboard">
              <button className="btn-primary" style={{ fontSize: "15px", padding: "13px 28px" }}>
                Get started free
              </button>
            </Link>
            <Link to="/history">
              <button className="btn-outline" style={{ fontSize: "15px", padding: "12px 24px" }}>
                View demo
              </button>
            </Link>
          </div>

          <div style={s.trustRow}>
            {["No credit card needed", "Private & secure", "AI-powered"].map((item) => (
              <span key={item} style={s.trustItem}>
                <span style={s.dot} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero right — chart preview */}
        <div style={s.heroRight}>
          <div style={s.heroCard}>
            <div style={s.cardHeader}>
              <p style={s.cardLabel}>Monthly Spending</p>
              <p style={s.cardSub}>Last 6 months</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={monthlyData} barSize={24}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9a9a9a" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "13px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Spent"]}
                />
                <Bar dataKey="amount" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p style={s.cardFooter}>Avg ₹16,060 / month</p>
          </div>

          <div style={s.spendCard}>
            <p style={s.spendLabel}>Top categories · 30 days</p>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <PieChart width={72} height={72}>
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={34} innerRadius={18} strokeWidth={0}>
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div style={{ flex: 1 }}>
                {categoryData.slice(0, 4).map((c) => (
                  <div key={c.name} style={s.spendRow}>
                    <span style={{ ...s.spendDot, background: c.color }} />
                    <span style={s.spendCat}>{c.name}</span>
                    <span style={s.spendAmt}>₹{c.value.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={s.features}>
        <div className="container">
          <p style={s.featuresEyebrow}>Built for clarity</p>
          <h2 style={s.featuresTitle}>Smart tools for smarter spending</h2>

          <div style={s.featureGrid}>
            {featureItems.map((f) => (
              <div key={f.title} style={s.featureCard}>
                <div style={{ ...s.featureIcon, background: f.bg }}>
                  <span style={{ fontSize: "18px" }}>{f.icon}</span>
                </div>
                <h3 style={s.featureHeading}>{f.title}</h3>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={s.cta}>
        <div style={s.ctaInner}>
          <p style={s.ctaEyebrow}>Ready to begin?</p>
          <h2 style={s.ctaTitle}>Take control of your finances today</h2>
          <Link to="/dashboard">
            <button style={{ 
              background: "white",
              color: "#2563eb",
              border: "none",
              padding: "13px 32px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.01em",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}>
              Start tracking now
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

const featureItems = [
  { icon: "✦", title: "AI Category Prediction", desc: "Our ML model automatically predicts the category of every expense you add.", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
  { icon: "◈", title: "Visual Analytics", desc: "Pie charts, bar graphs, and trend lines so you always know where your money goes.", bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" },
  { icon: "◎", title: "Smart History", desc: "Search, filter, and browse all past expenses with a clean, sortable table.", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
  { icon: "◉", title: "Actionable Insights", desc: "Personalized tips and summaries to make better financial decisions every day.", bg: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" },
];

const s = {
  hero: {
    display: "flex",
    alignItems: "center",
    gap: "80px",
    maxWidth: "1160px",
    margin: "0 auto",
    padding: "96px 32px 80px",
  },
  heroLeft: { flex: "0 0 480px" },
  heroRight: { flex: 1, display: "flex", flexDirection: "column", gap: "16px" },

  eyebrow: {
    fontSize: "13px",
    color: "#6b6b6b",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "20px",
  },
  headline: {
    fontSize: "clamp(44px,4.5vw,62px)",
    fontWeight: "300",
    lineHeight: 1.08,
    color: "#0f0f0f",
    letterSpacing: "-0.03em",
    marginBottom: "24px",
    fontFamily: "'DM Serif Display', Georgia, serif",
  },
  italic: {
    fontStyle: "italic",
    fontWeight: "300",
    color: "#4a4a4a",
  },
  subtext: {
    fontSize: "17px",
    color: "#6b6b6b",
    lineHeight: 1.65,
    marginBottom: "36px",
    fontWeight: "300",
  },
  ctaRow: { display: "flex", gap: "12px", marginBottom: "28px" },
  trustRow: { display: "flex", gap: "24px", flexWrap: "wrap" },
  trustItem: { fontSize: "13px", color: "#8a8a8a", display: "flex", alignItems: "center", gap: "6px" },
  dot: { width: "4px", height: "4px", borderRadius: "50%", background: "#ccc", display: "inline-block" },

  heroCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" },
  cardLabel: { fontSize: "14px", fontWeight: "500", color: "#0f0f0f" },
  cardSub: { fontSize: "12px", color: "#9a9a9a" },
  cardFooter: { fontSize: "12px", color: "#9a9a9a", marginTop: "8px" },

  spendCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
  },
  spendLabel: { fontSize: "11px", fontWeight: "500", color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "14px" },
  spendRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" },
  spendDot: { width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0 },
  spendCat: { fontSize: "13px", color: "#4a4a4a", flex: 1 },
  spendAmt: { fontSize: "13px", fontWeight: "500", color: "#0f0f0f" },

  features: { padding: "96px 0", background: "#fff" },
  featuresEyebrow: { fontSize: "12px", color: "#8a8a8a", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "center", marginBottom: "10px" },
  featuresTitle: { fontSize: "clamp(28px,3vw,38px)", fontWeight: "300", letterSpacing: "-0.02em", textAlign: "center", color: "#0f0f0f", marginBottom: "60px", fontFamily: "'DM Serif Display', serif" },
  featureGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" },
  featureCard: { 
    padding: "32px 24px", 
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
  },
  featureIcon: { 
    width: "48px", 
    height: "48px", 
    borderRadius: "10px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(37, 99, 235, 0.1)",
  },
  featureHeading: { fontSize: "15px", fontWeight: "500", marginBottom: "10px", color: "#0f0f0f" },
  featureDesc: { fontSize: "14px", color: "#6b6b6b", lineHeight: 1.6, fontWeight: "300" },

  cta: { padding: "96px 32px", background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)" },
  ctaInner: { maxWidth: "540px", margin: "0 auto", textAlign: "center" },
  ctaEyebrow: { fontSize: "12px", color: "#6b6b6b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px", fontWeight: "500" },
  ctaTitle: { fontSize: "clamp(28px,3vw,40px)", fontWeight: "300", letterSpacing: "-0.025em", color: "#fff", marginBottom: "36px", fontFamily: "'DM Serif Display', serif", lineHeight: 1.15 },
};
