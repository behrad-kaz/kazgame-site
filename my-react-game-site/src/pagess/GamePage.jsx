// src/pages/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // برای خواندن ID از URL
import styles from './GamePage.module.css'; // برای استایل‌ها

// URL پایه API محصولات (همان API که محصولات را سرو می‌کند)
const PRODUCTS_API_BASE_URL = 'https://localhost:7055'; // یا هر پورتی که API محصولات شما روی آن است

const GamePage = () => {
  const { id } = useParams(); // خواندن 'id' از URL (مثلاً /games/1 -> id = 1)
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`${PRODUCTS_API_BASE_URL}/api/Products/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setGame(data);
        // اگر ویدیو در دیتابیس به صورت نسبی ذخیره شده، آدرس کامل آن را بسازید
        if (data.videoUrl && !data.videoUrl.startsWith('http')) {
            data.videoUrl = `${PRODUCTS_API_BASE_URL}${data.videoUrl}`;
        }
        // اگر تصاویر کوچک در دیتابیس ذخیره نشده‌اند و می‌خواهید از تصاویر پیش‌فرض استفاده کنید
        // این بخش نیاز به تعریف در مدل Product در API یا fetch جداگانه دارد.
        // فعلاً به صورت Dummy Data برای thumbnails عمل می‌کنیم یا از ImageUrl استفاده می‌کنیم.
      } catch (err) {
        console.error("خطا در دریافت جزئیات بازی:", err);
        setError("جزئیات بازی یافت نشد یا مشکلی در اتصال به سرور وجود دارد.");
      } finally {
        setLoading(false);
      }
    };

    if (id) { // فقط اگر id موجود بود، فچ کن
      fetchGameDetails();
    }
  }, [id]); // هر بار که id در URL تغییر کند، دوباره فچ کن

  if (loading) {
    return <div className={styles.loading}>در حال بارگذاری جزئیات بازی...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!game) {
    return <div className={styles.notFound}>بازی مورد نظر یافت نشد.</div>;
  }

  return (
    <div className={styles.gamePageContainer}>
      <h1 className={styles.gameTitle}>{game.title}</h1>
      
      <div className={styles.gameContentWrapper}>
        <div className={styles.mainMedia}>
          {/* ویدئو یا تصویر اصلی بازی */}
          {game.videoUrl ? (
            <video controls className={styles.gameVideoPlayer} src={game.videoUrl}></video>
          ) : (
            <img src={game.imageUrl} alt={game.title} className={styles.gameImagePlayer} />
          )}
        </div>

        <div className={styles.gameDetails}>
          <p className={styles.gameDescription}>{game.description}</p>
          <div className={styles.gamePrice}>قیمت: ${game.price}</div>
          <button className={styles.buyGameButton}>خرید بازی</button>

          {/* گالری تصاویر کوچک (Thumbnails) */}
          <div className={styles.gameThumbnails}>
            {/* فرض می‌کنیم game.thumbnails یک آرایه از URLهاست.
                اگر API شما thumbnails را برنمی‌گرداند، باید این را در API اضافه کنید
                یا از ImageUrl خود بازی استفاده کنید.
                برای تست، می‌توانید از یک Dummy Array استفاده کنید.
            */}
            {game.imageUrl && ( // اگر فقط imageUrl دارید
                <img src={game.imageUrl} alt={game.title} className={styles.thumbnailItem} />
            )}
            {/* اگر بازی ویدیو دارد، می‌توانید فریم‌های ویدیو را به عنوان thumbnail استفاده کنید (پیچیده‌تر)
                یا صرفا چند تصویر ثابت را در نظر بگیرید.
            */}
            {/* مثال با Dummy Thumbnails */}
            {game.thumbnails && game.thumbnails.map((thumbUrl, index) => (
                <img key={index} src={thumbUrl} alt={`Thumb ${index}`} className={styles.thumbnailItem} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;