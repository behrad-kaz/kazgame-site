// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pagess/Home';
import AuthPage from './pagess/AuthPage'; // <--- ایمپورت AuthPage
import GamePage from './pagess/GamePage';
import GamesList from './pagess/GamesList';
import ResetPasswordPage from './pagess/ResetPasswordPage';
import ContactPage from './pagess/ContactPage';

import './style.css'; // استایل‌های گلوبال شما

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/games/:slug" element={<GamePage />} /> 
        <Route path="/games" element={<GamesList />} />
         <Route path="/reset-password" element={<ResetPasswordPage />} /> 
         <Route path="/services" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;