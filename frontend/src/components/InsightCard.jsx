// InsightCard — small card for the Insights page
export default function InsightCard({ icon, title, value, color, textColor }) {
  return (
    <div
      className="card"
      style={{
        ...styles.card,
        background: color,
        border: "none",
        boxShadow: "none",
      }}
    >
      <div style={styles.icon}>{icon}</div>
      <div>
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
    gap: "16px",
    padding: "20px 24px",
  },
  icon: {
    fontSize: "32px",
    flexShrink: 0,
  },
  title: {
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "4px",
    opacity: 0.8,
  },
  value: {
    fontSize: "18px",
    fontWeight: "700",
  },
};
