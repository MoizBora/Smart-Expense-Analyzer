import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

const Landing = lazy(() => import("./Pages/Landing"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const AddExpense = lazy(() => import("./Pages/AddExpense"));
const History = lazy(() => import("./Pages/History"));
const Insights = lazy(() => import("./Pages/Insights"));
const Login = lazy(() => import("./Pages/login"));


const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("isLoggedIn");
  if (auth !== "true") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Landing />} />
        
       
        <Route path="/login" element={<Login />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}