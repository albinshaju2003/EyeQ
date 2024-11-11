// src/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'Eyequser@gmail.com' && password === 'Eyeqpassword') {
      navigate('/dashboard', { state: { email } }); // Pass email to Dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleLogin}>
          <h2>Sign in</h2>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" // Enable autofill for email
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password" // Enable autofill for password
          />
          <a href="#" className="forgot-password">Forgot your password?</a>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
      <div className="signup-container">
        <h2>Hello, Friend!</h2>
        <p>Enter your personal details and start your journey with us</p>
      </div>
    </div>
  );
};

export default LoginPage;
