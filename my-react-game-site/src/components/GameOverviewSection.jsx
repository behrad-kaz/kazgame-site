// src/components/GameOverviewSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameOverviewSection.module.css';

const PRODUCTS_API_BASE_URL = 'https://localhost:7055'; // URL پایه API

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
      } else if (game.imageUrl) { // Fallback به imageUrl اگر ویدیو نبود (برای GameOverviewSection)
        setCurrentMainMediaUrl(game.imageUrl);
        setIsMainMediaVideo(false);
      }
      // اگر گالری تصاویر دارد و هیچ ویدیوی اصلی/تریلری وجود ندارد، از اولین تصویر گالری به عنوان رسانه اصلی استفاده کن
      if (game.galleryImages && game.galleryImages.length > 0 && !game.mainPageVideoUrl && !game.videoUrl) {
          setCurrentMainMediaUrl(game.galleryImages[0]);
          setIsMainMediaVideo(false);
      }

      // **LOG برای دیباگ: بررسی داده‌های Genre**
      console.log(`Game ID: ${game.id}, Title: ${game.title}`);
      console.log(`  game.Genre from API: "${game.Genre}"`); // <--- **این LOG را بررسی کنید**
      console.log(`  game.Developer from API: "${game.Developer}"`);
      console.log(`  game.ReleaseDate from API: "${game.ReleaseDate}"`);
    }
  }, [game]); // وقتی Prop 'game' تغییر می‌کند، این useEffect دوباره اجرا می‌شود

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

  // **Genres اینجا تعریف می‌شود (داخل کامپوننت)**
  const genres = game.genre ? game.genre.split(',').map(g => g.trim()) : [];

  // **DEBUG: بررسی آرایه genres بعد از پردازش**
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
              game.imageUrl && <img src={`${PRODUCTS_API_BASE_URL}${game.imageUrl}`} alt={game.title} className={styles.galleryThumbnailItem} onClick={() => handleThumbnailClick(`${PRODUCTS_API_BASE_URL}${game.imageUrl}`)} onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-image-error.png'; console.error(`Default thumbnail load error for ${game.title} from: ${PRODUCTS_API_BASE_URL}${game.imageUrl}`, e); }} />
            )}
          </div>
        </div>

        <div className={styles.gameInfoPanel}>
          <h2 className={styles.gamePanelTitle}>{game.title}</h2>
          <p className={styles.gamePanelSubtitle}>دانلود بازی - P2P - UPDATE v23939 برای کامپیوتر</p>

          <div className={styles.gameTags}>
            {/* **استفاده از آرایه genres پردازش شده** */}
            {genres.map((genre, index) => (
              <span key={index} className={styles.gameTag}>{genre}</span>
            ))}
            {game.developer && <span className={styles.gameTag}>{game.developer}</span>}
            {game.publisher && <span className={styles.gameTag}> {game.publisher}</span>}
            {game.releaseDate && <span className={styles.gameTag + ' ' + styles.releaseYearTag}>سال انتشار: {game.releaseDate}</span>}
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
              <i className="fas fa-star"></i> {game.rating && <span>{game.rating}</span>}
            </div>
            <div className={styles.ageRating}>
              <img src={`${PRODUCTS_API_BASE_URL}${game.pegi}`} alt="PEGI 16" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameOverviewSection;