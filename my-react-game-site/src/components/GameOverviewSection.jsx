// src/components/GameOverviewSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameOverviewSection.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055';

const GameOverviewSection = ({ game }) => {
  const [currentMainMediaUrl, setCurrentMainMediaUrl] = useState('');
  const [isMainMediaVideo, setIsMainMediaVideo] = useState(false);

  useEffect(() => {
    if (game) {
      if (game.mainPageVideoUrl) {
        setCurrentMainMediaUrl(game.mainPageVideoUrl);
        setIsMainMediaVideo(true);
      } else if (game.videoUrl) { // Fallback به videoUrl قدیمی (تریلر)
        setCurrentMainMediaUrl(game.videoUrl);
        setIsMainMediaVideo(true);
      } else if (game.imageUrl) { // Fallback به imageUrl اگر ویدیو نبود
        setCurrentMainMediaUrl(game.imageUrl);
        setIsMainMediaVideo(false);
      }
      if (game.galleryImages && game.galleryImages.length > 0 && !game.mainPageVideoUrl && !game.videoUrl) {
          setCurrentMainMediaUrl(game.galleryImages[0]);
          setIsMainMediaVideo(false);
      }
    }
  }, [game]);

  const handleThumbnailClick = (imgUrl) => {
    setCurrentMainMediaUrl(imgUrl);
    setIsMainMediaVideo(false);
  };

  const handleVideoThumbnailClick = () => { // <--- **تابع جدید برای کلیک روی Thumbnail ویدیو**
    if (game.mainPageVideoUrl) {
      setCurrentMainMediaUrl(game.mainPageVideoUrl);
      setIsMainMediaVideo(true);
    } else if (game.videoUrl) {
      setCurrentMainMediaUrl(game.videoUrl);
      setIsMainMediaVideo(true);
    }
  };

  const dummyTags = ['اکشن', 'نقش آفرینی (RPG)', 'ماجراجویی', 'تک نفره', 'آنلاین', 'جهان باز'];
  const releaseYear = '2022';
  const minAge = '+16';

  return (
    <section
      className={styles.gameOverviewSection}
      style={{ backgroundImage: `url(${game.backgroundImageUrl || '/images/default-background.jpg'})` }}
    >
      <div className={styles.backgroundBlurOverlay}></div>
      
      <div className={styles.overviewContentWrapper}>
        <div className={styles.videoPlayerContainer}>
          {isMainMediaVideo ? (
            <video controls className={styles.mainGameVideo} src={currentMainMediaUrl}
                onError={(e) => { e.target.onerror = null; e.target.src = '/videos/default-video-error.mp4'; console.error(`Video load error for ${game.title} from: ${currentMainMediaUrl}`, e); }}
            ></video>
          ) : (
            <img controls className={styles.mainGameVideoPlaceholder} src={currentMainMediaUrl} alt={game.title}
                onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Image load error for ${game.title} from: ${currentMainMediaUrl}`, e); }}
            />
          )}

          <div className={styles.galleryThumbnails}>
            {/* **Thumbnail اختصاصی برای ویدیو** */}
            {(game.mainPageVideoUrl || game.videoUrl) && ( // اگر بازی ویدیو دارد
                <div className={styles.videoThumbnailItem} onClick={handleVideoThumbnailClick}>
                    {/* می‌توانید یک تصویر کوچک از ویدیو یا آیکون Play را اینجا قرار دهید */}
                    <img src={game.imageUrl || '/images/default-video-thumbnail.jpg'} alt="Play Video" /> {/* تصویر از بازی یا پیش‌فرض */}
                    <i className={`fas fa-play ${styles.playIcon}`}></i> {/* آیکون Play */}
                </div>
            )}

            {/* تصاویر گالری */}
            {game.galleryImages && game.galleryImages.length > 0 ? (
                game.galleryImages.map((imgUrl, index) => (
                    <img
                        key={index}
                        src={imgUrl}
                        alt={`تصویر ${index + 1}`}
                        className={styles.galleryThumbnailItem}
                        onClick={() => handleThumbnailClick(imgUrl)}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Gallery thumbnail load error for ${game.title} from: ${imgUrl}`, e); }}
                    />
                ))
            ) : (
                game.imageUrl && <img src={`${PRODUCTS_API_BASE_URL}${game.imageUrl}`} alt={game.title} className={styles.galleryThumbnailItem} onClick={() => handleThumbnailClick(`${PRODUCTS_API_BASE_URL}${game.imageUrl}`)} onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Default thumbnail load error for ${game.title} from: ${PRODUCTS_API_BASE_URL}${game.imageUrl}`, e); }} />
            )}
          </div>
        </div>

        <div className={styles.gameInfoPanel}>
          <h2 className={styles.gamePanelTitle}>{game.title}</h2>
          <p className={styles.gamePanelSubtitle}>دانلود بازی - P2P - UPDATE v23939 برای کامپیوتر</p>

          <div className={styles.gameTags}>
            {dummyTags.map((tag, index) => (
                <span key={index} className={styles.gameTag}>{tag}</span>
            ))}
            <span className={styles.gameTag + ' ' + styles.releaseYearTag}>سال تولید: {releaseYear}</span>
            <span className={styles.gameTag + ' ' + styles.minAgeTag}>{minAge}</span>
          </div>

          <p className={styles.gamePanelDescription}>{game.description}</p>

          <div className={styles.actionButtons}>
            <Link to={game.moreInfoLink || `/games/${game.id}`} className={styles.downloadLinkButton}>
              لینک‌های دانلود <i className="fas fa-download"></i>
            </Link>
            <Link to={`/comments/${game.id || ''}`} className={styles.commentsLinkButton}>
              نظرات <i className="fas fa-comments"></i>
            </Link>
          </div>

          <div className={styles.ratingInfo}>
            <div className={styles.ratingBox}>
              <i className="fas fa-star"></i> ۴.۵/۵
            </div>
            <div className={styles.ageRating}>
              <img src="/images/peg-16.png" alt="PEGI 16" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameOverviewSection;