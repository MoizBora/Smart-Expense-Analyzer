import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === "Freedemo") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/add"); 
    } else {
      alert("Wrong password! Try: Freedemo");
    }
  };

  return (
    <div style={styles.container}>
      {message && <div style={styles.alertBanner}>{message}</div>}
      <div className="card" style={styles.card}>
        <h2 style={styles.heading}>Demo Access Login</h2>
        <p style={{color: '#666', marginBottom: '24px', fontSize: '15px'}}>Please enter the demo password to access the expense demo.</p>
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
  container: { 
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    background: 'linear-gradient(135deg, #fdfdf9 0%, #f3f4f6 100%)',
    padding: '20px',
  },
  alertBanner: {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(220, 38, 38, 0.1)',
    border: '1px solid rgba(220, 38, 38, 0.3)',
    color: '#991b1b',
    padding: '14px 24px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15)',
    zIndex: 1000,
  },
  card: { 
    padding: '48px 40px', 
    textAlign: 'center', 
    maxWidth: '450px',
    width: '100%',
    background: '#fdfdf9',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    border: '1px solid rgba(15, 75, 50, 0.08)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#171717',
    marginBottom: '12px',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  input: { 
    width: '100%', 
    padding: '14px 16px', 
    margin: '0 0 20px 0', 
    borderRadius: '12px', 
    border: '1.5px solid rgba(15, 75, 50, 0.15)',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  },
  btn: { 
    width: '100%', 
    padding: '14px', 
    background: 'linear-gradient(135deg, #0f4b32 0%, #166534 100%)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '12px', 
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: "'Inter', sans-serif",
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(15, 75, 50, 0.2)',
  }
};

export default Login;