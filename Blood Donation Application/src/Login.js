import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const foundUser = users.find(user => user.email === email && user.password === password);
      
      if (foundUser) {
        alert("Login successful!");
        navigate('/home'); // Redirect to home page on successful login
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("There was an error logging in. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="signup-prompt">
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
}

export default Login;
