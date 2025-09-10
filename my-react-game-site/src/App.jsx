// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pagess/Home';
import AuthPage from './pagess/AuthPage'; // <--- ایمپورت AuthPage
import GamePage from './pagess/GamePage';
import GamesList from './pagess/GamesList';
import ResetPasswordPage from './pagess/ResetPasswordPage';
import ContactPage from './pagess/ContactPage';
import AdvertisingPage from './pagess/AdvertisingPage';
import NewsArticlePage from './pagess/NewsArticlePage';
import NewsListPage from './pagess/NewsListPage';
import ProfilePage from './pagess/ProfilePage';

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
          <Route path="/contact" element={<AdvertisingPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:slug" element={<NewsArticlePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;