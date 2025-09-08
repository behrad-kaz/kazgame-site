// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/gamelist components/GameCard'; // استفاده مجدد از GameCard
import styles from './ProfilePage.module.css';

const API_BASE_URL = 'https://localhost:7055';

const ProfilePage = () => {
    const { userId } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);

    // تابع برای آپلود آواتار (مشابه دراپ‌داون)
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        // ... (منطق کامل اعتبارسنجی و آپلود فایل را اینجا کپی کنید)
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/api/User/upload-avatar/${userId}`, {
            method: 'POST', body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            // بروزرسانی صفحه برای نمایش آواتار جدید
            window.dispatchEvent(new CustomEvent('avatarUpdated', { detail: data.avatarUrl }));
            setProfileData(prev => ({...prev, avatarUrl: data.avatarUrl}));
        } else {
            alert("خطا در آپلود عکس.");
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/user/${userId}/profile`);
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId]);

    if (loading) return <div>در حال بارگذاری پروفایل...</div>;
    if (!profileData) return <div>پروفایل یافت نشد.</div>;

    const fullAvatarUrl = profileData.avatarUrl 
        ? `${API_BASE_URL}${profileData.avatarUrl}?t=${new Date().getTime()}`
        : '/images/default-user.png';

    return (
        <div className={styles.pageContainer}>
            <Header />
            <main className={styles.profileMain}>
                <div className={styles.profileHeader}>
                    <div className={styles.banner}></div>
                    <div className={styles.avatarSection}>
                        <img 
                            src={fullAvatarUrl} 
                            alt="User Avatar" 
                            className={styles.avatar} 
                            onClick={() => fileInputRef.current.click()}
                        />
                         <input
                            type="file" accept="image/*" ref={fileInputRef}
                            onChange={handleFileChange} style={{ display: 'none' }}
                        />
                        <h2 className={styles.username}>{profileData.fullName}</h2>
                    </div>
                    <div className={styles.statsBar}>
                        <div className={styles.statItem}>
                            <i className="fas fa-gamepad"></i>
                            <span>{profileData.favoriteGamesCount}</span>
                            <p>بازی مورد علاقه</p>
                        </div>
                    </div>
                </div>

                <div className={styles.profileContent}>
                    <div className={styles.favoritesSection}>
                        <h3>بازی‌های مورد علاقه</h3>
                        <div className={styles.gamesGrid}>
                            {profileData.favoriteGames.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>
                    <aside className={styles.sidebar}>
                        <div className={styles.aboutUser}>
                            <h3>درباره کاربر</h3>
                            <p>
                                <i className="fas fa-calendar-alt"></i>
                                تاریخ عضویت: {new Date(profileData.joinDate).toLocaleDateString('fa-IR')}
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;