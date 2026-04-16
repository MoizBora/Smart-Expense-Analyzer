import { Link, useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { monthlyData, categoryData } from "../data/placeholder";

export default function Landing() {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      
      
      <div style={styles.bgPattern} />

      
      <div style={styles.bgBlur1} />
      <div style={styles.bgBlur2} />

      
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.eyebrowContainer}>
            <div style={styles.eyebrowDot} />
            <p style={styles.eyebrow}>Intelligent Financial Companion</p>
          </div>

          <h1 style={styles.headline}>
            Master Your
            <br />
            <span style={styles.highlightText}>Money Flow</span>
            <br />
            Effortlessly
          </h1>

          <p style={styles.subtext}>
            Experience the art of mindful spending with AI-powered insights. 
            Track every transaction, understand patterns, and achieve your financial goals with elegance.
          </p>

          <div style={styles.ctaRow}>
            <button onClick={handleDemoClick} style={styles.primaryBtn}>
              Explore Demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '6px' }}>
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div style={styles.trustRow}>
            {[
              { icon: "🔒", text: "Bank-grade Security" },
              { icon: "🤖", text: "Smart AI Engine" },
              { icon: "⚡", text: "Real-time Sync" }
            ].map((item) => (
              <div key={item.text} style={styles.trustItem}>
                <span style={styles.trustIcon}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div style={styles.heroRight}>
          <div style={styles.heroCard}>
            <div style={styles.cardHeader}>
              <div>
                <p style={styles.cardLabel}>Monthly Overview</p>
                <p style={styles.cardSub}>Last 6 months trajectory</p>
              </div>
              <div style={styles.trendBadge}>
                <span style={styles.trendArrow}>↗</span>
                <span>+12%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={monthlyData} barSize={28}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#166534" stopOpacity={1} />
                    <stop offset="100%" stopColor="#0f4b32" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 11, fill: "#737373", fontFamily: "'Inter', sans-serif" }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ 
                    borderRadius: "12px", 
                    border: "1px solid rgba(15, 75, 50, 0.1)", 
                    fontSize: "13px", 
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    fontFamily: "'Inter', sans-serif",
                    background: "#fdfdf9",
                  }}
                  formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Spent"]}
                />
                <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div style={styles.cardFooter}>
              <div style={styles.footerDot} />
              <span>Average ₹16,060 per month</span>
            </div>
          </div>

          <div style={styles.spendCard}>
            <p style={styles.spendLabel}>Category Distribution</p>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ position: 'relative' }}>
                <PieChart width={80} height={80}>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <Pie 
                    data={categoryData} 
                    dataKey="value" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={38} 
                    innerRadius={22} 
                    strokeWidth={0}
                    filter="url(#shadow)"
                  >
                    {categoryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div style={styles.pieCenter}>
                  <span style={styles.pieCenterText}>30d</span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                {categoryData.slice(0, 4).map((c, idx) => (
                  <div key={c.name} style={{
                    ...styles.spendRow,
                    animation: `fadeInUp 0.5s ease ${idx * 0.1}s both`
                  }}>
                    <span style={{ ...styles.spendDot, background: c.color }} />
                    <span style={styles.spendCat}>{c.name}</span>
                    <span style={styles.spendAmt}>₹{c.value.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section style={styles.features}>
        <div style={styles.featuresContainer}>
          <div style={styles.featuresHeader}>
            <span style={styles.featuresEyebrow}>Powerful Features</span>
            <h2 style={styles.featuresTitle}>Everything You Need to Succeed</h2>
            <p style={styles.featuresDesc}>
              Built with modern technology and designed for humans who care about their financial future
            </p>
          </div>

          <div style={styles.featureGrid}>
            {featureItems.map((f, idx) => (
              <div 
                key={f.title} 
                style={{
                  ...styles.featureCard,
                  animation: `fadeInUp 0.6s ease ${idx * 0.1}s both`
                }}
              >
                <div style={{ ...styles.featureIcon, background: f.bg }}>
                  <span style={{ fontSize: "24px" }}>{f.icon}</span>
                </div>
                <h3 style={styles.featureHeading}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
                <div style={styles.featureLearnMore}>
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section style={styles.cta}>
        <div style={styles.ctaInner}>
          <div style={styles.ctaIcon}>✨</div>
          <h2 style={styles.ctaTitle}>Ready to Transform Your Financial Life?</h2>
          <p style={styles.ctaSubtext}>
            Join thousands who've taken control of their spending habits
          </p>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={styles.ctaButton}>
              Get Started — It's Free
            </button>
          </Link>
          <p style={styles.ctaNote}>No credit card required • Set up in under 2 minutes</p>
        </div>
      </section>

      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column !important;
            gap: 40px !important;
            padding: 60px 20px 60px !important;
          }
        }
      `}</style>

    </div>
  );
}

const featureItems = [
  { 
    icon: "🧠", 
    title: "Intelligent Categorization", 
    desc: "Advanced ML algorithms automatically organize your expenses into meaningful categories, learning from your patterns over time.",
    bg: "linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)" 
  },
  { 
    icon: "📊", 
    title: "Visual Intelligence", 
    desc: "Beautiful charts and graphs that transform raw numbers into actionable insights you can understand at a glance.",
    bg: "linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(101, 163, 13, 0.05) 100%)" 
  },
  { 
    icon: "🔍", 
    title: "Smart History Search", 
    desc: "Powerful search and filtering capabilities make finding any transaction instant, with advanced sorting options.",
    bg: "linear-gradient(135deg, rgba(22, 101, 52, 0.08) 0%, rgba(15, 75, 50, 0.05) 100%)" 
  },
  { 
    icon: "💡", 
    title: "Personalized Insights", 
    desc: "Receive tailored financial advice and spending recommendations based on your unique habits and goals.",
    bg: "linear-gradient(135deg, rgba(132, 204, 22, 0.08) 0%, rgba(101, 163, 13, 0.05) 100%)" 
  },
];

const styles = {
  container: {
    background: "linear-gradient(to bottom, #fdfdf9 0%, #f8f8f4 50%, #fafaf6 100%)",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
  },
  bgPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(15, 75, 50, 0.03) 1px, transparent 0)`,
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  bgBlur1: {
    position: "absolute",
    top: "-10%",
    right: "5%",
    width: "min(500px, 80vw)",
    height: "min(500px, 80vw)",
    background: "radial-gradient(circle, rgba(22, 101, 52, 0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    pointerEvents: "none",
  },
  bgBlur2: {
    position: "absolute",
    bottom: "10%",
    left: "-5%",
    width: "min(600px, 90vw)",
    height: "min(600px, 90vw)",
    background: "radial-gradient(circle, rgba(132, 204, 22, 0.06) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    pointerEvents: "none",
  },
  hero: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "80px",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "120px 40px 100px",
    position: "relative",
    zIndex: 1,
  },
  heroLeft: { 
    flex: "1",
    minWidth: "280px",
  },
  heroRight: { 
    flex: "1", 
    display: "flex", 
    flexDirection: "column", 
    gap: "20px",
    minWidth: "280px",
  },
  eyebrowContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  eyebrowDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#166534",
    boxShadow: "0 0 8px rgba(22, 101, 52, 0.4)",
  },
  eyebrow: {
    fontSize: "13px",
    color: "#525252",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontFamily: "'Inter', sans-serif",
  },
  headline: {
    fontSize: "clamp(36px, 8vw, 68px)",
    fontWeight: "400",
    lineHeight: 1.1,
    color: "#171717",
    letterSpacing: "-0.03em",
    marginBottom: "28px",
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  highlightText: {
    background: "linear-gradient(135deg, #166534 0%, #0f4b32 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: "600",
    position: "relative",
    display: "inline-block",
  },
  subtext: {
    fontSize: "clamp(15px, 3vw, 18px)",
    color: "#525252",
    lineHeight: 1.7,
    marginBottom: "40px",
    fontWeight: "400",
    fontFamily: "'Inter', sans-serif",
  },
  ctaRow: { 
    display: "flex", 
    gap: "14px", 
    marginBottom: "36px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    padding: "clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)",
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "clamp(14px, 3vw, 16px)",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 16px rgba(15, 75, 50, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  secondaryBtn: {
    padding: "clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)",
    background: "transparent",
    color: "#0f4b32",
    border: "2px solid rgba(15, 75, 50, 0.2)",
    borderRadius: "12px",
    fontSize: "clamp(14px, 3vw, 16px)",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
    transition: "all 0.3s ease",
  },
  trustRow: { 
    display: "flex", 
    gap: "28px", 
    flexWrap: "wrap" 
  },
  trustItem: { 
    fontSize: "clamp(13px, 2.5vw, 14px)", 
    color: "#737373", 
    display: "flex", 
    alignItems: "center", 
    gap: "8px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
  },
  trustIcon: {
    fontSize: "16px",
  },
  heroCard: {
    background: "#fdfdf9",
    borderRadius: "20px",
    padding: "clamp(20px, 5vw, 32px)",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(15, 75, 50, 0.04)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
  },
  cardHeader: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "12px",
  },
  cardLabel: { 
    fontSize: "15px", 
    fontWeight: "600", 
    color: "#171717",
    fontFamily: "'Inter', sans-serif",
    marginBottom: "4px",
  },
  cardSub: { 
    fontSize: "12px", 
    color: "#737373",
    fontFamily: "'Inter', sans-serif",
  },
  trendBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    background: "rgba(22, 101, 52, 0.08)",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#166534",
    fontFamily: "'Inter', sans-serif",
  },
  trendArrow: {
    fontSize: "14px",
  },
  cardFooter: { 
    fontSize: "13px", 
    color: "#737373", 
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'Inter', sans-serif",
  },
  footerDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#166534",
    opacity: 0.5,
  },
  spendCard: {
    background: "#fdfdf9",
    borderRadius: "20px",
    padding: "clamp(20px, 5vw, 28px)",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(15, 75, 50, 0.04)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  spendLabel: { 
    fontSize: "12px", 
    fontWeight: "600", 
    color: "#737373", 
    textTransform: "uppercase", 
    letterSpacing: "0.08em", 
    marginBottom: "18px",
    fontFamily: "'Inter', sans-serif",
  },
  spendRow: { 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    marginBottom: "10px" 
  },
  spendDot: { 
    width: "8px", 
    height: "8px", 
    borderRadius: "50%", 
    flexShrink: 0,
    boxShadow: "0 0 8px currentColor",
  },
  spendCat: { 
    fontSize: "14px", 
    color: "#525252", 
    flex: 1,
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
  },
  spendAmt: { 
    fontSize: "14px", 
    fontWeight: "700", 
    color: "#171717",
    fontFamily: "'Inter', sans-serif",
  },
  pieCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  pieCenterText: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#737373",
    fontFamily: "'Inter', sans-serif",
  },
  features: { 
    padding: "clamp(60px, 15vw, 120px) 0", 
    background: "#fdfdf9",
    position: "relative",
    zIndex: 1,
  },
  featuresContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 clamp(20px, 5vw, 40px)',
  },
  featuresHeader: {
    textAlign: "center",
    marginBottom: "clamp(40px, 10vw, 80px)",
  },
  featuresEyebrow: { 
    fontSize: "13px", 
    color: "#737373", 
    fontWeight: "600", 
    textTransform: "uppercase", 
    letterSpacing: "0.1em",
    fontFamily: "'Inter', sans-serif",
    display: "inline-block",
    marginBottom: "16px",
  },
  featuresTitle: { 
    fontSize: "clamp(28px, 6vw, 48px)", 
    fontWeight: "400", 
    letterSpacing: "-0.02em", 
    color: "#171717", 
    marginBottom: "20px", 
    fontFamily: "'Playfair Display', serif",
  },
  featuresDesc: {
    fontSize: "clamp(15px, 3vw, 18px)",
    color: "#525252",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
    fontFamily: "'Inter', sans-serif",
  },
  featureGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", 
    gap: "clamp(20px, 4vw, 28px)" 
  },
  featureCard: { 
    padding: "clamp(28px, 6vw, 40px) clamp(24px, 5vw, 32px)", 
    background: "#fdfdf9",
    borderRadius: "16px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  },
  featureIcon: { 
    width: "56px", 
    height: "56px", 
    borderRadius: "14px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: "24px",
    boxShadow: "0 4px 12px rgba(15, 75, 50, 0.08)",
  },
  featureHeading: { 
    fontSize: "clamp(16px, 3.5vw, 18px)", 
    fontWeight: "600", 
    marginBottom: "12px", 
    color: "#171717",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
  },
  featureDesc: { 
    fontSize: "clamp(14px, 3vw, 15px)", 
    color: "#525252", 
    lineHeight: 1.65, 
    fontWeight: "400",
    fontFamily: "'Inter', sans-serif",
    marginBottom: "16px",
  },
  featureLearnMore: {
    fontSize: "14px",
    color: "#166534",
    fontWeight: "600",
    fontFamily: "'Inter', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  cta: { 
    padding: "clamp(60px, 15vw, 120px) clamp(20px, 5vw, 40px)", 
    background: "linear-gradient(135deg, #0f4b32 0%, #166534 50%, #14532d 100%)",
    position: "relative",
    zIndex: 1,
  },
  ctaInner: { 
    maxWidth: "640px", 
    margin: "0 auto", 
    textAlign: "center" 
  },
  ctaIcon: {
    fontSize: "clamp(36px, 8vw, 48px)",
    marginBottom: "24px",
  },
  ctaTitle: { 
    fontSize: "clamp(28px, 6vw, 48px)", 
    fontWeight: "400", 
    letterSpacing: "-0.025em", 
    color: "#fdfdf9", 
    marginBottom: "20px", 
    fontFamily: "'Playfair Display', serif", 
    lineHeight: 1.2,
  },
  ctaSubtext: {
    fontSize: "clamp(15px, 3vw, 18px)",
    color: "rgba(253, 253, 249, 0.8)",
    marginBottom: "40px",
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.6,
  },
  ctaButton: {
    padding: "clamp(14px, 3.5vw, 18px) clamp(28px, 7vw, 40px)",
    background: "#fdfdf9",
    color: "#0f4b32",
    border: "none",
    borderRadius: "12px",
    fontSize: "clamp(15px, 3vw, 17px)",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
  },
  ctaNote: {
    fontSize: "clamp(12px, 2.5vw, 14px)",
    color: "rgba(253, 253, 249, 0.6)",
    marginTop: "20px",
    fontFamily: "'Inter', sans-serif",
  },
};

// Add responsive CSS
const responsiveStyles = document.createElement("style");
responsiveStyles.textContent = `
  @media (max-width: 768px) {
    section[style*="hero"] > div:first-child {
      flex-direction: column !important;
      gap: 40px !important;
      padding: 60px 20px 60px !important;
    }
  }
`;
document.head.appendChild(responsiveStyles);
