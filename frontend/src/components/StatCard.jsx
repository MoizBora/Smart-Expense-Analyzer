// StatCard — reusable summary card for dashboard stats
export default function StatCard({ title, value, icon, trend, trendLabel, color = "#ede9fe", textColor = "#5b21b6" }) {
  return (
    <div className="card" style={styles.card}>
      {/* Icon circle */}
      <div style={{ ...styles.iconBox, background: color }}>
        <span style={{ fontSize: "22px" }}>{icon}</span>
      </div>

      {/* Text content */}
      <div style={styles.content}>
        <p style={styles.title}>{title}</p>
        <p style={{ ...styles.value, color: textColor }}>{value}</p>

        {/* Optional trend indicator */}
        {trend && (
          <p style={{ ...styles.trend, color: trend === "up" ? "#10b981" : "#ef4444" }}>
            {trend === "up" ? "▲" : "▼"} {trendLabel}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    minWidth: "220px",
    flex: 1,
  },
  iconBox: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: "13px",
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: "4px",
  },
  value: {
    fontSize: "24px",
    fontWeight: "800",
    lineHeight: 1.2,
  },
  trend: {
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "4px",
  },
};
