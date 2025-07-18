// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react'; // useRef را اضافه کنید
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import UserProfileDropdown from './UserProfileDropdown'; // ایمپورت کامپوننت دراپ‌داون

const API_BASE_URL = 'https://localhost:7055';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userAvatarSrc, setUserAvatarSrc] = useState('/images/default-user.png'); // آواتار پیش‌فرض
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userInfoRef = useRef(null);

  useEffect(() => {
    const loadUserInfo = () => {
      const storedUsername = localStorage.getItem('loggedInUsername');
      const storedUserId = localStorage.getItem('loggedInUserId');
      const storedUserAvatarRelativePath = localStorage.getItem('userAvatar');

      if (storedUsername && storedUserId) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
        const fullAvatarUrl = storedUserAvatarRelativePath
          ? `${API_BASE_URL}${storedUserAvatarRelativePath}?t=${new Date().getTime()}`
          : `/images/default-user.png`; // اگر آدرس نبود، پیش‌فرض
        setUserAvatarSrc(fullAvatarUrl);
      } else {
        setIsLoggedIn(false);
        setUsername('');
        setUserAvatarSrc('/images/default-user.png');
      }
    };

    loadUserInfo(); // بارگذاری اولیه

    const handleStorageChange = () => { // <--- این تابع باید فعال باشد
      loadUserInfo();
    };

    const handleAvatarUpdated = (event) => {
      const newAvatarUrl = event.detail;
      console.log("AvatarUpdated event received in Header. New URL:", newAvatarUrl); // <--- LOG 2
      const fullNewAvatarUrl = `${API_BASE_URL}${newRelativeAvatarUrl}?t=${new Date().getTime()}`;
      setUserAvatarSrc(fullNewAvatarUrl);
      localStorage.setItem('userAvatar', newRelativeAvatarUrl);
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('avatarUpdated', handleAvatarUpdated); // گوش دادن به این Event

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('avatarUpdated', handleAvatarUpdated);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => { // <--- تابع برای باز/بستن دراپ‌داون
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoCircle}>
          <img src="/images/kazgame-logo.png" alt="KazGame" />
        </div>
        <nav id="nav" className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <Link to="/">خانه</Link>
          <Link to="/games">بازی ها </Link> 
          <Link to="/services">تماس با ما </Link>
          <Link to="/contact">تبلیغات </Link>
        </nav>

        {!isLoggedIn ? (
          <Link to="/signup" className={styles.ctaButton}>
            Sign up
          </Link>
        ) : (
          <div
            id="user-info"
            className={styles.userInfo}
            onClick={toggleDropdown} // <--- کلیک برای باز/بستن دراپ‌داون
            ref={userInfoRef} // <--- ref برای تشخیص کلیک
          >
            <img src={userAvatarSrc} alt="User Avatar" className={styles.userAvatar} />
            <span id="username-display">{username}</span>
            {isDropdownOpen && ( // <--- رندر مشروط دراپ‌داون
              <div ref={dropdownRef}> {/* <--- ref برای تشخیص کلیک بیرون */}
                <UserProfileDropdown
                  username={username}
                  userAvatarSrc={userAvatarSrc}
                  onClose={() => setIsDropdownOpen(false)} // تابع بستن برای دراپ‌داون
                />
              </div>
            )}
          </div>
        )}

        <div
          className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;