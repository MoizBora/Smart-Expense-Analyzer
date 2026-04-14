import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div>
      {message && <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>}
      {/* ... rest of your login form */}
    </div>
  );

  const handleLogin = (e) => {
    e.preventDefault();
    // Use a simple password for recruiters
    if (password === "Freedemo") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/add"); // Redirect to your add expense page
    } else {
      alert("Wrong password! Try: Freedemo");
    }
  };

  return (
    <div style={styles.container}>
      <div className="card" style={styles.card}>
        <h2>Adding Expense Demo Access</h2>
        <p style={{color: '#666'}}>Please enter the demo password to test the AI.</p>
        <form onSubmit={handleLogin}>
          <input 
            type="password" 
            placeholder="Enter password (Freedemo)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>Unlock Demo</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6' },
  card: { padding: '40px', textAlign: 'center', maxWidth: '400px' },
  input: { width: '100%', padding: '12px', margin: '20px 0', borderRadius: '8px', border: '1px solid #ccc' },
  btn: { width: '100%', padding: '12px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default Login;