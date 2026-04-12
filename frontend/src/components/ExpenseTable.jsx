// ExpenseTable — reusable table to display expense rows
export default function ExpenseTable({ expenses }) {
  // Maps category name to CSS class for colored badges
  const getBadgeClass = (category) => {
    const map = {
      Food: "badge-food",
      Transport: "badge-transport",
      Rent: "badge-rent",
      Health: "badge-health",
      Entertainment: "badge-entertainment",
      Utilities: "badge-utilities",
      Shopping: "badge-shopping",
    };
    return map[category] || "badge-food";
  };

  return (
    <div style={{ overflowX: "auto" }}>
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
          {expenses.map((expense) => (
            <tr key={expense._id} style={styles.row}>
              <td style={styles.td}>{new Date(expense.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
              <td style={styles.td}>{expense.description}</td>
              <td style={styles.td}>
                <span className={`badge ${getBadgeClass(expense.category)}`}>
                  {expense.category}
                </span>
              </td>
              <td style={{ ...styles.td, textAlign: "right", fontWeight: "700", color: "#5b21b6" }}>
                ₹{expense.amount.toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  headerRow: {
    borderBottom: "2px solid #e5e7eb",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    color: "#6b7280",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  row: {
    borderBottom: "1px solid #f3f4f6",
    transition: "background 0.15s",
  },
  td: {
    padding: "14px 16px",
    color: "#1a1a2e",
  },
};
