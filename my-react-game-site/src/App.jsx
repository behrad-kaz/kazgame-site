// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pagess/Home';
import AuthPage from './pagess/AuthPage'; // <--- ایمپورت AuthPage
import GamePage from './pagess/GamePage';
import GamesList from './pagess/GamesList';

import './style.css'; // استایل‌های گلوبال شما

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage />} />
        {/* <--- مسیر جدید برای صفحات بازی (دینامیک) */}
        <Route path="/games/:id" element={<GamePage />} /> 
        {/* می‌توانید یک مسیر کلی /games هم برای لیست بازی‌ها اضافه کنید */}
        <Route path="/games" element={<GamesList />} />
      </Routes>
    </Router>
  );
}

export default App;