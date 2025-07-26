// src/components/GameCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameCard.module.css'; // برای استایل‌های این کارت

// URL پایه API (برای آواتارها و ویدیوهای بازی)
const API_BASE_URL = 'https://localhost:7055'; // یا هر پورت دیگری که API شما روی آن است

const GameCard = ({ game }) => {
    const [isHovered, setIsHovered] = useState(false);

    // ساخت آدرس کامل برای ویدیو و تصویر (اگر از API به صورت نسبی می‌آیند)
    const fullImageUrl = game.imageUrl
        ? `${game.imageUrl}`
        : '/images/default-game.png'; // تصویر پیش‌فرض اگر URL نباشد

    const fullVideoUrl = game.videoUrl
        ? `${game.videoUrl}`
        : null; // ویدیو پیش‌فرض اگر URL نباشد

    console.log(`GameCard for ID: ${game.id}, Title: ${game.title}`); // <--- **LOG جدید ۲**
    console.log(`  ImageUrl from API: ${game.imageUrl}, Final Image URL: ${fullImageUrl}`); // <--- **LOG جدید ۳**
    console.log(`  VideoUrl from API: ${game.videoUrl}, Final Video URL: ${fullVideoUrl}`); // <--- **LOG جدید ۴**

    return (
        <div
            className={styles.gameCard}
            onMouseEnter={() => game.videoUrl && setIsHovered(true)} // اگر ویدیو دارد، روی هاور true کن
            onMouseLeave={() => setIsHovered(false)} // روی ترک هاور، false کن
        >
            <div className={styles.gameCardMedia}>
                {isHovered && fullVideoUrl ? (
                    <video
                        src={fullVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.gameCardVideo}
                    />
                ) : (
                    <img src={fullImageUrl} alt={game.title} className={styles.gameCardImage} />
                )}
            </div>

            <h2 className={styles.gameCardTitle}>{game.title}</h2>
            {game.price && <p className={styles.gameCardPrice}>${game.price}</p>}
            {game.description && <p className={styles.gameCardDescription}>{game.description}</p>} {/* توضیحات (اختیاری) */}

            <Link to={`/games/${game.slug}`} className={styles.viewDetailsButton}>
                توضیحات بیشتر
            </Link>
        </div>
    );
};

export default GameCard;