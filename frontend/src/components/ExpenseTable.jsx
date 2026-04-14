export default function ExpenseTable({ expenses }) {
  const getBadgeStyle = (category) => {
    const styleMap = {
      Food: { bg: "rgba(22, 101, 52, 0.08)", color: "#0f4b32", border: "rgba(22, 101, 52, 0.2)" },
      Transport: { bg: "rgba(132, 204, 22, 0.08)", color: "#14532d", border: "rgba(132, 204, 22, 0.2)" },
      Rent: { bg: "rgba(22, 101, 52, 0.1)", color: "#166534", border: "rgba(22, 101, 52, 0.25)" },
      Health: { bg: "rgba(101, 163, 13, 0.08)", color: "#0f4b32", border: "rgba(101, 163, 13, 0.2)" },
      Entertainment: { bg: "rgba(132, 204, 22, 0.1)", color: "#14532d", border: "rgba(132, 204, 22, 0.25)" },
      Utilities: { bg: "rgba(22, 101, 52, 0.08)", color: "#166534", border: "rgba(22, 101, 52, 0.2)" },
      Shopping: { bg: "rgba(101, 163, 13, 0.1)", color: "#0f4b32", border: "rgba(101, 163, 13, 0.25)" },
      Bills: { bg: "rgba(132, 204, 22, 0.08)", color: "#14532d", border: "rgba(132, 204, 22, 0.2)" },
      Other: { bg: "rgba(22, 101, 52, 0.06)", color: "#525252", border: "rgba(22, 101, 52, 0.15)" },
    };
    return styleMap[category] || styleMap.Other;
  };

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Category</th>
            <th style={{ ...styles.th, textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, idx) => {
            const badgeStyle = getBadgeStyle(expense.category);
            return (
              <tr 
                key={expense._id} 
                style={{
                  ...styles.row,
                  animation: `fadeIn 0.4s ease ${idx * 0.05}s both`
                }}
              >
                <td style={styles.td}>
                  <div style={styles.dateCell}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '8px', opacity: 0.5 }}>
                      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="#737373" strokeWidth="1.2" fill="none"/>
                      <path d="M2 5h10M4 1v2M10 1v2" stroke="#737373" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    {new Date(expense.date).toLocaleDateString("en-IN", { 
                      day: "numeric", 
                      month: "short", 
                      year: "numeric" 
                    })}
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={styles.description}>{expense.description}</span>
                </td>
                <td style={styles.td}>
                  <span 
                    style={{
                      ...styles.badge,
                      background: badgeStyle.bg,
                      color: badgeStyle.color,
                      border: `1px solid ${badgeStyle.border}`,
                    }}
                  >
                    {expense.category}
                  </span>
                </td>
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <span style={styles.amount}>
                    ₹{expense.amount.toLocaleString("en-IN")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
  },
  headerRow: {
    background: "rgba(22, 101, 52, 0.03)",
    borderBottom: "2px solid rgba(15, 75, 50, 0.08)",
  },
  th: {
    padding: "16px 20px",
    textAlign: "left",
    fontWeight: "600",
    color: "#525252",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    background: "rgba(22, 101, 52, 0.03)",
  },
  row: {
    borderBottom: "1px solid rgba(15, 75, 50, 0.06)",
    transition: "all 0.2s ease",
    cursor: "default",
  },
  td: {
    padding: "18px 20px",
    color: "#171717",
    verticalAlign: "middle",
  },
  dateCell: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#525252",
    fontWeight: "500",
  },
  description: {
    fontSize: "14px",
    color: "#171717",
    fontWeight: "500",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.01em",
  },
  amount: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#0f4b32",
    letterSpacing: "-0.01em",
  },
};
