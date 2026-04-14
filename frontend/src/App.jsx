import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import AddExpense from "./Pages/AddExpense";
import History from "./Pages/History";
import Insights from "./Pages/Insights";
import Login from "./Pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* The Landing Page is now the root */}
        <Route path="/" element={<Landing />} />
        
        {/* The Login Page has its own path */}
        <Route path="/login" element={<Login />} />

        {/* These pages are protected by the logic inside the components */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}