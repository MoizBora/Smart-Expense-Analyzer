// App.jsx — sets up routing between all pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import AddExpense from "./Pages/AddExpense";
import History from "./Pages/History";
import Insights from "./Pages/Insights";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar />

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}
