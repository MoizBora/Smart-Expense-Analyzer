export default function InsightCard({ icon, title, value, color, textColor }) {
  return (
    <div style={{ ...styles.card, background: color }}>
      <div style={styles.iconContainer}>
        <span style={styles.icon}>{icon}</span>
      </div>
      <div style={styles.content}>
        <p style={{ ...styles.title, color: textColor }}>{title}</p>
        <p style={{ ...styles.value, color: textColor }}>{value}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "28px",
    borderRadius: "16px",
    border: "1px solid rgba(15, 75, 50, 0.08)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "'Inter', sans-serif",
  },
  iconContainer: {
    width: "56px",
    height: "56px",
    background: "rgba(255, 255, 255, 0.5)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "1px solid rgba(15, 75, 50, 0.08)",
  },
  icon: {
    fontSize: "28px",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "6px",
    opacity: 0.85,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  value: {
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "-0.02em",
  },
};
