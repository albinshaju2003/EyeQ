// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <div className="dashboard-fullscreen">
            <Dashboard />
          </div>
        } />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown paths to login */}
      </Routes>
    </Router>
  );
}

export default App;
