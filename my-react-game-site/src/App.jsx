// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Header از اینجا حذف شد و به Home منتقل شد
import Home from './pagess/Home';
import AuthPage from './pagess/AuthPage'; // <--- ایمپورت AuthPage

import './style.css'; // استایل‌های گلوبال شما

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<AuthPage />} /> {/* <--- مسیر جدید */}
        {/* اینجا مسیرهای دیگه‌ای مثل /about, /services, /contact و صفحات بازی رو اضافه می‌کنیم */}
      </Routes>
    </Router>
  );
}

export default App;