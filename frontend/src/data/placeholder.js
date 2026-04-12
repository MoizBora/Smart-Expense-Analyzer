// All static/placeholder data lives here.
// When backend is ready, these will be replaced by API responses.
export const placeholderExpenses = [
  { id: 1, date: "2025-06-01", description: "Uber to Office", category: "Transport", amount: 180 },
  { id: 2, date: "2025-06-02", description: "Zomato Order", category: "Food", amount: 340 },
  { id: 3, date: "2025-06-03", description: "Monthly Rent", category: "Rent", amount: 12000 },
  { id: 4, date: "2025-06-05", description: "Netflix Subscription", category: "Entertainment", amount: 499 },
  { id: 5, date: "2025-06-07", description: "Pharmacy", category: "Health", amount: 620 },
  { id: 6, date: "2025-06-09", description: "Electricity Bill", category: "Utilities", amount: 1100 },
  { id: 7, date: "2025-06-11", description: "Grocery Store", category: "Food", amount: 870 },
  { id: 8, date: "2025-06-13", description: "Amazon Purchase", category: "Shopping", amount: 1450 },
  { id: 9, date: "2025-06-15", description: "Metro Card Recharge", category: "Transport", amount: 200 },
  { id: 10, date: "2025-06-18", description: "Dinner with Friends", category: "Food", amount: 1200 },
];

// Pie chart data — category-wise breakdown
export const categoryData = [
  { name: "Food", value: 2410, color: "#7c3aed" },
  { name: "Rent", value: 12000, color: "#5b21b6" },
  { name: "Transport", value: 380, color: "#a78bfa" },
  { name: "Entertainment", value: 499, color: "#c4b5fd" },
  { name: "Health", value: 620, color: "#10b981" },
  { name: "Utilities", value: 1100, color: "#6d28d9" },
  { name: "Shopping", value: 1450, color: "#f59e0b" },
];

// Bar chart data — monthly spending trend
export const monthlyData = [
  { month: "Jan", amount: 14200 },
  { month: "Feb", amount: 16800 },
  { month: "Mar", amount: 13400 },
  { month: "Apr", amount: 17900 },
  { month: "May", amount: 15600 },
  { month: "Jun", amount: 18459 },
];

// Summary stats for dashboard cards
export const summaryStats = {
  totalThisMonth: 18459,
  totalExpenses: 10,
  highestCategory: "Rent",
  avgPerDay: 1025,
};

// Placeholder insights
export const insights = [
  {
    id: 1,
    title: "Highest Spending Category",
    value: "Rent — ₹12,000",
    icon: "🏠",
    color: "#ede9fe",
    textColor: "#5b21b6",
  },
  {
    id: 2,
    title: "Most Spent This Month",
    value: "₹18,459",
    icon: "📈",
    color: "#dbeafe",
    textColor: "#1e40af",
  },
  {
    id: 3,
    title: "Daily Average Spend",
    value: "₹1,025 / day",
    icon: "📊",
    color: "#d1fae5",
    textColor: "#065f46",
  },
  {
    id: 4,
    title: "Frequent Category",
    value: "Food (3 transactions)",
    icon: "🍔",
    color: "#fef3c7",
    textColor: "#92400e",
  },
  {
    id: 5,
    title: "Biggest Single Expense",
    value: "Monthly Rent — ₹12,000",
    icon: "💸",
    color: "#fce7f3",
    textColor: "#9d174d",
  },
  {
    id: 6,
    title: "Savings Tip",
    value: "Food spend ↑ 18% vs last month",
    icon: "💡",
    color: "#ffedd5",
    textColor: "#9a3412",
  },
];

// Categories for the Add Expense form dropdown
export const categories = [
  "Food", "Transport", "Rent", "Health",
  "Entertainment", "Utilities", "Shopping", "Other",
];