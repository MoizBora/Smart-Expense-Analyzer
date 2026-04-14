export default function StatCard({ title, value, icon, trend, trendLabel, color, textColor }) {
  return (
    <div style={styles.card}>
      {/* Icon container */}
      <div style={{ ...styles.iconBox, background: color }}>
        <span style={{ fontSize: "28px" }}>{icon}</span>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <p style={styles.title}>{title}</p>
        <p style={{ ...styles.value, color: textColor }}>{value}</p>

        {/* Optional trend indicator */}
        {trendLabel && (
          <div style={styles.trendContainer}>
            <span style={styles.trendDot} />
            <span style={styles.trendLabel}>{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fdfdf9",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    display: "flex",
    alignItems: "flex-start",
    gap: "18px",
    minWidth: "260px",
    flex: 1,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "'Inter', sans-serif",
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "1px solid rgba(15, 75, 50, 0.08)",
  },
  content: {
    flex: 1,
    paddingTop: "2px",
  },
  title: {
    fontSize: "13px",
    color: "#737373",
    fontWeight: "600",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  value: {
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  trendContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "10px",
  },
  trendDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#166534",
    boxShadow: "0 0 8px rgba(22, 101, 52, 0.3)",
  },
  trendLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#525252",
  },
};
