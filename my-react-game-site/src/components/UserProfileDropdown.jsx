// src/components/UserProfileDropdown.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfileDropdown.module.css';


const API_BASE_URL = 'https://localhost:5001';

// **تابع کمکی در بیرون کامپوننت تعریف شود تا هر بار رندر نشود**
const updateAvatarInLocalStorageAndHeader = (newRelativeAvatarUrl) => {
  localStorage.setItem('userAvatar', newRelativeAvatarUrl); // ذخیره مسیر نسبی
  // dispatch custom event to notify Header
  window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: newRelativeAvatarUrl }));
};

const UserProfileDropdown = ({ username, userAvatarSrc, onClose }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUsername');
    localStorage.removeItem('loggedInUserId'); // حذف userId
    localStorage.removeItem('userAvatar'); // حذف آواتار
    onClose();
    navigate('/signup');
  };

  const handleAvatarUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("لطفاً یک فایل تصویری انتخاب کنید.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // محدودیت 2 مگابایت
        alert("حجم فایل نباید بیشتر از 2 مگابایت باشد.");
        return;
      }

      const userId = localStorage.getItem('loggedInUserId');

      if (!userId) {
          alert("برای آپلود عکس، ابتدا باید وارد شوید. (User ID یافت نشد)");
          onClose();
          navigate('/signup');
          return;
      }

      const formData = new FormData();
      formData.append('file', file); // 'file' نامی است که API انتظار دارد (IFormFile file)

    try {
        const response = await fetch(`${API_BASE_URL}/api/User/upload-avatar/${userId}`, { // <--- استفاده از API_BASE_URL
          method: 'POST',
          body: formData,
        });;

        const responseData = await response.json();

        if (!response.ok) {
          alert(responseData.message || "خطا در آپلود عکس پروفایل.");
        } else {
          alert("عکس پروفایل با موفقیت آپلود شد.");
          updateAvatarInLocalStorageAndHeader(responseData.avatarUrl); 
        }
      } catch (error) {
        alert("خطا در ارتباط با سرور هنگام آپلود عکس.");
        console.error("Upload Avatar Error:", error);
      } finally {
        onClose();
      }
    }
  };

  const handleProfileEditClick = () => {
    alert("صفحه شخصی‌سازی پروفایل (بعداً طراحی می‌شود).");
    onClose();
  };

  const handlePurchaseHistoryClick = () => {
    alert("صفحه صندوق خریدها (بعداً طراحی می‌شود).");
    onClose();
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.userInfoHeader}>
        <img src={userAvatarSrc} alt="User Avatar" className={styles.userAvatarLarge} />
        <span className={styles.usernameDisplayLarge}>{username}</span>
      </div>

      <div className={styles.dropdownOption}>
        <button onClick={handleAvatarUploadClick}>
          <i className="fas fa-camera"></i> ارسال عکس پروفایل
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className={styles.dropdownOption}>
        <button onClick={handleProfileEditClick}>
          <i className="fas fa-user-edit"></i> شخصی‌سازی پروفایل
        </button>
      </div>

      <div className={styles.dropdownOption}>
        <button onClick={handlePurchaseHistoryClick}>
          <i className="fas fa-shopping-basket"></i> صندوق خریدها
        </button>
      </div>

      <div className={styles.dropdownOption + ' ' + styles.logoutOption}>
        <button onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> خروج از حساب
        </button>
      </div>
    </div>
  );
};

export default UserProfileDropdown;