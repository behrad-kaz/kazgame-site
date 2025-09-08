// src/components/GameOverviewSection.jsx (نسخه اصلاح شده با دکمه لایک)
import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameOverviewSection.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055'; // URL پایه API

const GameOverviewSection = ({ game, scrollToDownload, scrollToComments }) => {
  const [currentMainMediaUrl, setCurrentMainMediaUrl] = useState('');
  const [isMainMediaVideo, setIsMainMediaVideo] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // <--- تغییر جدید: وضعیت لایک

  useEffect(() => {
    if (game) {
      if (game.mainPageVideoUrl) {
        setCurrentMainMediaUrl(game.mainPageVideoUrl);
        setIsMainMediaVideo(true);
      } else if (game.videoUrl) {
        setCurrentMainMediaUrl(game.videoUrl);
        setIsMainMediaVideo(true);
      } else if (game.imageUrl) {
        setCurrentMainMediaUrl(game.imageUrl);
        setIsMainMediaVideo(false);
      }
      if (game.galleryImages && game.galleryImages.length > 0 && !game.mainPageVideoUrl && !game.videoUrl) {
        setCurrentMainMediaUrl(game.galleryImages[0]);
        setIsMainMediaVideo(false);
      }

      console.log(`Game ID: ${game.id}, Title: ${game.title}`);
      console.log(`  game.Genre from API: "${game.Genre}"`);
      console.log(`  game.Developer from API: "${game.Developer}"`);
      console.log(`  game.ReleaseDate from API: "${game.ReleaseDate}"`);

      // <--- تغییر جدید: در اینجا باید وضعیت لایک را از API دریافت کنید (در حال حاضر ثابت است)
      // فرض می‌کنیم در آینده API به ما بگوید آیا این بازی توسط کاربر فعلی لایک شده است یا خیر
      // فعلاً برای تست، می‌توانید آن را true یا false کنید.
      setIsLiked(game.isLiked || false);
    }
  }, [game]);

  const handleThumbnailClick = (imgUrl) => {
    setCurrentMainMediaUrl(imgUrl);
    setIsMainMediaVideo(false);
  };

  const handleVideoThumbnailClick = () => {
    if (game.mainPageVideoUrl) {
      setCurrentMainMediaUrl(game.mainPageVideoUrl);
      setIsMainMediaVideo(true);
    } else if (game.videoUrl) {
      setCurrentMainMediaUrl(game.videoUrl);
      setIsMainMediaVideo(true);
    }
  };

  const handleLikeToggle = async () => {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
        alert("برای لایک کردن، ابتدا وارد شوید.");
        return;
    }
    if (!game || !game.id) return;

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    // **** تغییر ۲: این تابع اکنون به API_BASE_URL دسترسی دارد ****
    const url = `${PRODUCTS_API_BASE_URL}/api/user/${userId}/favorites/${game.id}`;
    const method = newIsLiked ? 'POST' : 'DELETE';
    
    try {
        const response = await fetch(url, { method: method });
        if (!response.ok) {
            // اگر عملیات ناموفق بود، وضعیت لایک را به حالت قبل برگردان
            setIsLiked(!newIsLiked);
            alert("خطا در ثبت لایک.");
        }
    } catch (error) {
        setIsLiked(!newIsLiked);
        alert("خطا در ارتباط با سرور.");
        console.error("Like toggle error:", error);
    }
  };

  const genres = game.genre ? game.genre.split(',').map(g => g.trim()) : [];
  console.log('Processed Genres array:', genres);

  return (
    <section
      className={styles.gameOverviewSection}
      style={{ backgroundImage: `url(${game.backgroundImageUrl || '/images/default-background.jpg'})` }}
    >
      <div className={styles.backgroundBlurOverlay}></div>

      <div className={styles.overviewContentWrapper}>
        <div className={styles.videoPlayerContainer}>
          {isMainMediaVideo && currentMainMediaUrl ? (
            <video controls className={styles.mainGameVideo} src={currentMainMediaUrl}
              onError={(e) => { e.target.onerror = null; e.target.src = '/videos/default-video-error.mp4'; console.error(`Video load error for ${game.title} from: ${currentMainMediaUrl}`, e); }}
            ></video>
          ) : (
            <img controls className={styles.mainGameVideoPlaceholder} src={currentMainMediaUrl || '/images/default-image-error.png'} alt={game.title}
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Image load error for ${game.title} from: ${currentMainMediaUrl}`, e); }}
            />
          )}

          <div className={styles.galleryThumbnails}>
            {(game.mainPageVideoUrl || game.videoUrl) && (
              <div className={styles.videoThumbnailItem} onClick={handleVideoThumbnailClick}>
                <img src={game.imageUrl || '/images/default-video-thumbnail.jpg'} alt="Play Video" />
                <i className={`fas fa-play ${styles.playIcon}`}></i>
              </div>
            )}
            {game.galleryImages && game.galleryImages.length > 0 ? (
              game.galleryImages.map((imgUrl, index) => (
                imgUrl ? (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`تصویر ${index + 1}`}
                    className={styles.galleryThumbnailItem}
                    onClick={() => handleThumbnailClick(imgUrl)}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Gallery thumbnail load error for ${game.title} from: ${imgUrl}`, e); }}
                  />
                ) : null
              ))
            ) : (
              game.imageUrl && <img src={game.imageUrl} alt={game.title} className={styles.galleryThumbnailItem} onClick={() => handleThumbnailClick(game.imageUrl)} onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Default thumbnail load error for ${game.title} from: ${game.imageUrl}`, e); }} />
            )}
          </div>
        </div>

        <div className={styles.gameInfoPanel}>
          <h2 className={styles.gamePanelTitle}>{game.title}</h2>

          <div className={styles.gameTags}>
            {genres.map((genre, index) => (
              <span key={index} className={styles.gameTag}>{genre}</span>
            ))}
            {game.developer && <span className={styles.gameTag}>{game.developer}</span>}
            {game.publisher && <span className={styles.gameTag}> {game.publisher}</span>}
            {game.releaseDate && <span className={styles.gameTag + ' ' + styles.releaseYearTag}>سال انتشار: {game.releaseDate}</span>}
          </div>

          <p className={styles.gamePanelDescription}>{game.description}</p>

          <div className={styles.actionButtons}>
            <button type="button" className={styles.downloadLinkButton} onClick={scrollToDownload}>
              لینک‌های دانلود <i className="fas fa-download"></i>
            </button>
            <button type="button" className={styles.commentsLinkButton} onClick={scrollToComments}>
              نظرات <i className="fas fa-comments"></i>
            </button>
          </div>

          <div className={styles.ratingInfo}>
            <div className={styles.ratingBox}>
              <i className="fas fa-star"></i> {game.rating && <span>{game.rating}</span>}
            </div>
            <button
              className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
              onClick={handleLikeToggle}
              title={isLiked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
            >
              <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
            </button>

            <div className={styles.ageRating}>
              <img src={`${PRODUCTS_API_BASE_URL}${game.pegi}`} alt="PEGI" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameOverviewSection;